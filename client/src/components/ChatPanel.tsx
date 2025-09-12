import { useState, useRef, useEffect } from "react";
import { X, Send, Trash2, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { ChatMessage } from "@shared/schema";

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch chat history
  const { data: chatHistory = [], isLoading: historyLoading } = useQuery<ChatMessage[]>({
    queryKey: ['/api/chat/history'],
    enabled: isAuthenticated && isOpen,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send message');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chat/history'] });
      setInputMessage("");
      setTimeout(scrollToBottom, 100);
    },
    onError: (error: any) => {
      toast({
        title: "Chat Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Clear history mutation
  const clearHistoryMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/chat/history', { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to clear chat history');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chat/history'] });
      toast({
        title: "Chat Cleared",
        description: "Your chat history has been cleared.",
      });
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || sendMessageMutation.isPending) return;
    
    sendMessageMutation.mutate(inputMessage.trim());
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your chat history? This cannot be undone.")) {
      clearHistoryMutation.mutate();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen, chatHistory]);

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        data-testid="dialog-chat"
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">AI Safety Assistant</CardTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Bot className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <h3 className="font-semibold">Sign In Required</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Please sign in to chat with the AI Safety Assistant and get personalized safety guidance.
              </p>
            </div>
            <Button onClick={() => window.location.href = '/api/login'} className="w-full">
              Sign In to Chat
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4"
      data-testid="dialog-chat"
    >
      <Card className="w-full max-w-md h-[500px] md:h-[600px] flex flex-col">
        {/* Header */}
        <CardHeader className="flex-shrink-0 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">AI Safety Assistant</CardTitle>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleClearHistory}
                disabled={clearHistoryMutation.isPending || chatHistory.length === 0}
                title="Clear chat history"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Get safety advice and emergency guidance for RGIPT area
          </p>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {historyLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : chatHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
              <Bot className="h-12 w-12 text-muted-foreground" />
              <div>
                <h3 className="font-semibold">Welcome to AI Safety Assistant!</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Ask me about safety tips, emergency contacts, or how to use the app features.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline" className="text-xs">
                  "Nearest emergency contact?"
                </Badge>
                <Badge variant="outline" className="text-xs">
                  "How to use SOS?"
                </Badge>
                <Badge variant="outline" className="text-xs">
                  "Safety tips for RGIPT?"
                </Badge>
              </div>
            </div>
          ) : (
            <div className="space-y-4" data-testid="list-chat-messages">
              {chatHistory.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div className={`flex-1 space-y-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}>
                      {message.content}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(message.createdAt || Date.now()).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input */}
        <div className="flex-shrink-0 border-t p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              data-testid="input-chat"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about safety tips, emergency contacts..."
              disabled={sendMessageMutation.isPending}
              maxLength={1000}
              className="flex-1"
            />
            <Button 
              data-testid="button-chat-send"
              type="submit" 
              size="icon" 
              disabled={!inputMessage.trim() || sendMessageMutation.isPending}
            >
              {sendMessageMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2">
            For real emergencies, call 112 immediately. This AI assistant provides guidance only.
          </p>
        </div>
      </Card>
    </div>
  );
}