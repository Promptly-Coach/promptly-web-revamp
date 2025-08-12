import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface ChatMessage {
  id: string;
  message: string;
  sender_type: string;
  sender_name?: string;
  created_at: string;
  session_id: string;
}

export interface ChatSession {
  id: string;
  session_id: string;
  status: string;
  started_at: string;
  contact_id?: string;
  ended_at?: string;
  user_agent?: string;
  visitor_ip?: string;
}

export const useChat = () => {
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const startChatSession = async () => {
    setIsLoading(true);
    
    try {
      const sessionId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert({
          session_id: sessionId,
          visitor_ip: 'unknown', // Could be enhanced with actual IP detection
          user_agent: navigator.userAgent,
          status: 'active',
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentSession(data);
      
      // Send welcome message
      await sendMessage(
        'Hello! Welcome to PromptlyCoach. How can we help you today?',
        'bot',
        'AI Assistant'
      );

      toast({
        title: "Chat Started",
        description: "You're now connected to our support team.",
      });

      return { success: true, session: data };
    } catch (error) {
      console.error('Error starting chat session:', error);
      toast({
        title: "Error",
        description: "Could not start chat session. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (
    message: string,
    senderType: 'visitor' | 'agent' | 'bot' = 'visitor',
    senderName?: string
  ) => {
    if (!currentSession) {
      throw new Error('No active chat session');
    }

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          session_id: currentSession.id,
          message,
          sender_type: senderType,
          sender_name: senderName,
        })
        .select()
        .single();

      if (error) throw error;

      setMessages(prev => [...prev, data]);
      return { success: true, message: data };
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Could not send message. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const endChatSession = async () => {
    if (!currentSession) return;

    try {
      const { error } = await supabase
        .from('chat_sessions')
        .update({
          status: 'ended',
          ended_at: new Date().toISOString(),
        })
        .eq('id', currentSession.id);

      if (error) throw error;

      setCurrentSession(null);
      setMessages([]);
      
      toast({
        title: "Chat Ended",
        description: "Thank you for contacting us. Have a great day!",
      });

      return { success: true };
    } catch (error) {
      console.error('Error ending chat session:', error);
      return { success: false, error };
    }
  };

  // Load messages for current session
  useEffect(() => {
    if (!currentSession) return;

    const loadMessages = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', currentSession.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading messages:', error);
        return;
      }

      setMessages(data || []);
    };

    loadMessages();

    // Subscribe to new messages
    const subscription = supabase
      .channel(`chat_messages_${currentSession.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `session_id=eq.${currentSession.id}`,
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as ChatMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [currentSession]);

  return {
    currentSession,
    messages,
    isLoading,
    startChatSession,
    sendMessage,
    endChatSession,
  };
};