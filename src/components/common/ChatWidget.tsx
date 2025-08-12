import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, X, Send, Users, Settings, DollarSign, Clock, HelpCircle } from 'lucide-react';
import { useChat } from '@/hooks/useChat';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [showCategories, setShowCategories] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { currentSession, messages, isLoading, startChatSession, sendMessage, endChatSession } = useChat();

  const categories = [
    {
      id: 'services',
      title: 'AI Services & Solutions',
      icon: Settings,
      color: 'bg-accent text-accent-foreground',
      questions: [
        'What AI services do you offer?',
        'How can AI automation help my business?',
        'What industries do you work with?',
        'Can you create custom AI solutions?'
      ]
    },
    {
      id: 'pricing',
      title: 'Pricing & Packages',
      icon: DollarSign,
      color: 'bg-secondary text-secondary-foreground',
      questions: [
        'How much do your services cost?',
        'Do you offer free consultations?',
        'What\'s included in your packages?',
        'Are there any ongoing costs?'
      ]
    },
    {
      id: 'process',
      title: 'Process & Timeline',
      icon: Clock,
      color: 'bg-primary text-primary-foreground',
      questions: [
        'How long does implementation take?',
        'What\'s your development process?',
        'Do you provide training and support?',
        'How do you handle project updates?'
      ]
    },
    {
      id: 'general',
      title: 'General Questions',
      icon: HelpCircle,
      color: 'bg-muted text-muted-foreground',
      questions: [
        'Tell me about PromptlyCoach',
        'How do I get started?',
        'What makes you different?',
        'Can I see examples of your work?'
      ]
    }
  ];

  const handleStartChat = async () => {
    const result = await startChatSession();
    if (result.success) {
      setIsOpen(true);
      setShowCategories(true);
      setSelectedCategory(null);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowCategories(false);
  };

  const handleQuestionSelect = async (question: string) => {
    if (!currentSession) return;
    
    const result = await sendMessage(question);
    if (result.success) {
      setSelectedCategory(null);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !currentSession) return;
    
    const result = await sendMessage(messageInput);
    if (result.success) {
      setMessageInput('');
      setShowCategories(false);
      setSelectedCategory(null);
    }
  };

  const handleEndChat = async () => {
    await endChatSession();
    setIsOpen(false);
    setShowCategories(true);
    setSelectedCategory(null);
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
            {/* Category Selection */}
            {currentSession && showCategories && messages.length > 0 && (
              <div className="p-4 border-b border-border">
                <h3 className="text-sm font-medium mb-3">What can I help you with?</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <Button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        variant="outline"
                        size="sm"
                        className="h-auto p-2 flex flex-col items-center gap-1 text-xs"
                      >
                        <IconComponent className="h-4 w-4" />
                        <span className="text-center leading-tight">{category.title}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Preset Questions */}
            {currentSession && selectedCategory && (
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">Quick Questions</h3>
                  <Button
                    onClick={() => setSelectedCategory(null)}
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                  >
                    Back
                  </Button>
                </div>
                <div className="space-y-2">
                  {categories.find(cat => cat.id === selectedCategory)?.questions.map((question, index) => (
                    <Button
                      key={index}
                      onClick={() => handleQuestionSelect(question)}
                      variant="outline"
                      size="sm"
                      className="w-full h-auto p-2 text-xs text-left whitespace-normal"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

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
                  <Button
                    onClick={() => setShowCategories(!showCategories)}
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                  >
                    Quick Questions
                  </Button>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      <Users className="h-3 w-3 mr-1" />
                      AI Agent
                    </Badge>
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
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatWidget;