import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatButtonProps {
  onClick: () => void;
}

export default function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <Button
      data-testid="button-chat-open"
      onClick={onClick}
      size="icon"
      className="fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full shadow-lg hover:scale-105 transition-all duration-200"
      style={{
        background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--chart-2)) 100%)",
      }}
    >
      <MessageCircle className="h-6 w-6" />
      <span className="sr-only">Open AI Safety Assistant</span>
    </Button>
  );
}