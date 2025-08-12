import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send } from 'lucide-react';
import { useChat } from '@/hooks/useChat';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const { currentSession, messages, isLoading, startChatSession, sendMessage, endChatSession } = useChat();

  const handleStartChat = async () => {
    const result = await startChatSession();
    if (result.success) {
      setIsOpen(true);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !currentSession) return;
    
    const result = await sendMessage(messageInput);
    if (result.success) {
      setMessageInput('');
    }
  };

  const handleEndChat = async () => {
    await endChatSession();
    setIsOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={currentSession ? () => setIsOpen(true) : handleStartChat}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-glow z-50"
          variant="hero"
          size="icon"
          disabled={isLoading}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-elegant z-50 bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-heading">Live Chat</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-0 h-full flex flex-col">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_type === 'visitor' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.sender_type === 'visitor'
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {message.sender_name && message.sender_type !== 'visitor' && (
                        <div className="text-xs opacity-70 mb-1">{message.sender_name}</div>
                      )}
                      <div>{message.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            {currentSession && (
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    size="icon"
                    variant="outline"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">Online now</span>
                  <Button
                    onClick={handleEndChat}
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                  >
                    End Chat
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatWidget;