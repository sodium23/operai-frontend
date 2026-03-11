import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { X, Send, MessageCircle, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "ai" | "user";
  content: string;
  timestamp: string;
}

interface IdeaChatProps {
  ideaId: string;
}

const CLARIFYING_QUESTIONS = [
  "What's the primary pain point you're solving for users?",
  "Who is your ideal first customer? Can you describe them specifically?",
  "What's your unfair advantage or unique insight that makes this work?",
  "How will users discover this product initially?",
  "What's the simplest version you could ship in 2 weeks?",
  "What's the biggest risk that could kill this idea?",
  "How do you plan to monetize from day one?",
  "What existing alternatives do users currently use?",
];

export function IdeaChat({ ideaId }: IdeaChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`chat_${ideaId}`);
    if (stored) {
      setMessages(JSON.parse(stored));
    } else {
      // Initialize with welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: "ai",
        content: "Hi! I'm here to help refine your idea. I'll ask some clarifying questions to strengthen your execution blueprint. Feel free to answer any or all of them.",
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
      localStorage.setItem(`chat_${ideaId}`, JSON.stringify([welcomeMessage]));
    }
  }, [ideaId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveMessages = (newMessages: Message[]) => {
    localStorage.setItem(`chat_${ideaId}`, JSON.stringify(newMessages));
    setMessages(newMessages);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    saveMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(updatedMessages);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: aiResponse,
        timestamp: new Date().toISOString(),
      };
      saveMessages([...updatedMessages, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (messageHistory: Message[]): string => {
    const userMessageCount = messageHistory.filter((m) => m.role === "user").length;

    // Ask clarifying questions based on conversation progress
    if (userMessageCount <= CLARIFYING_QUESTIONS.length) {
      const questionIndex = userMessageCount - 1;
      if (questionIndex < CLARIFYING_QUESTIONS.length - 1) {
        return `Great insight! ${CLARIFYING_QUESTIONS[questionIndex + 1]}`;
      } else {
        return "Thanks for all the details! These answers will help create a more robust execution plan. Feel free to ask me anything else about your idea.";
      }
    }

    // Default responses
    const responses = [
      "That's a valuable perspective. Can you elaborate on how this impacts your go-to-market strategy?",
      "Interesting point. Have you validated this assumption with potential users?",
      "This adds important context to your execution plan. What's the timeline you're envisioning?",
      "Good thinking. How does this align with your resource constraints?",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  };

  const hasUnread = messages.length > 1 && !isOpen;

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all z-50 ${
          isOpen ? "scale-0" : "scale-100"
        } bg-indigo-600 hover:bg-indigo-700 text-white`}
      >
        <MessageCircle className="w-6 h-6" />
        {hasUnread && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
            {messages.filter((m) => m.role === "ai").length}
          </div>
        )}
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-6 right-6 w-[420px] h-[600px] bg-white border border-gray-200 rounded-lg shadow-2xl flex flex-col transition-all z-50 ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">AI Assistant</h3>
              <p className="text-xs text-gray-500">
                {isTyping ? "Typing..." : "Online"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2.5 ${
                  message.role === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-white border border-gray-200 text-gray-900"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.role === "user" ? "text-indigo-200" : "text-gray-500"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Type your response..."
              className="min-h-[44px] max-h-[120px] resize-none text-sm"
              rows={1}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              className="h-11 px-4 bg-indigo-600 hover:bg-indigo-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </>
  );
}
