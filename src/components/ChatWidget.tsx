import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, Rocket, Mail, Instagram } from 'lucide-react';

interface ChatWidgetProps {
  onOpenApply?: (role?: 'startup' | 'mentor' | 'student') => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ onOpenApply }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    {
      sender: 'bot',
      text: "Namaskaram! I'm your W-Hub Assistant. How can I help you explore Warangal's startup ecosystem, programs, or application details?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "How do I apply for Incubation?",
    "What is the contact email?",
    "Tell me about Summit 2026",
    "Where is W-Hub located?"
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMessage = { sender: 'user' as const, text };
    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    const lower = text.toLowerCase();

    // Smart local response engine
    setTimeout(() => {
      let reply = '';

      if (lower.includes('email') || lower.includes('contact') || lower.includes('reach')) {
        reply = "You can reach the official team directly at contact.w.hub@gmail.com. We respond within 24-48 hours to all inquiries and partnership proposals!";
      } else if (lower.includes('insta') || lower.includes('handle') || lower.includes('social') || lower.includes('reel')) {
        reply = "Follow @Whubwgl on Instagram (https://instagram.com/whubwgl) to watch our community reels, Open Mic pitches, and event highlights!";
      } else if (lower.includes('apply') || lower.includes('incub') || lower.includes('join') || lower.includes('pitch')) {
        reply = "Click the 'Join W-Hub' button on top to submit your venture! We welcome startups at idea, MVP, and scaling stages, as well as student teams from NIT Warangal, KU, and SR University.";
      } else if (lower.includes('summit') || lower.includes('2026') || lower.includes('photos') || lower.includes('event')) {
        reply = "The Warangal Start-ups & Innovation Summit 2026 took place on 16-08-2026 under the theme 'From Ideas to Impact', gathering 250+ delegates and launching the Warangal Open Mic!";
      } else if (lower.includes('locat') || lower.includes('where') || lower.includes('address') || lower.includes('office')) {
        reply = "W-Hub is based in Warangal, Telangana, in close proximity to NIT Warangal, Hanamkonda, and the Madikonda IT Corridor.";
      } else {
        reply = "W-Hub is Warangal's startup catalyst inspired by T-Hub. We provide incubation (W-Edge), student innovation programs (W-Campus), and capital syndicates (W-Angel). You can write to us at contact.w.hub@gmail.com or apply directly!";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
      setLoading(false);
    }, 400);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-orange-400/30"
        aria-label="Toggle assistant"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[480px] w-96 max-w-[calc(100vw-3rem)] flex-col rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm">
                  <span>W-Hub Assistant</span>
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-orange-100">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>Online • Warangal Ecosystem</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {messages.map((m, index) => (
              <div
                key={index}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-950 text-orange-600 text-xs font-bold">
                    W
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-2.5 text-xs leading-relaxed max-w-[80%] ${
                    m.sender === 'user'
                      ? 'bg-orange-600 text-white rounded-br-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 items-center text-xs text-slate-400">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-950 text-orange-600 font-bold">
                  W
                </div>
                <span className="animate-pulse">Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-2 overflow-x-auto flex gap-1.5 scrollbar-none">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-900"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about W-Hub..."
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-600 text-white disabled:opacity-40 hover:bg-orange-700 transition shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
