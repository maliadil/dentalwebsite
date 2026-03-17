'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { FiMessageCircle, FiX, FiSend, FiLoader } from 'react-icons/fi';
import { FaTooth } from 'react-icons/fa';
import clsx from 'clsx';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME: Message = {
  role: 'assistant',
  content:
    "Hi! 👋 I'm **Denty**, your BrightSmile dental assistant.\n\nI can help you with:\n• Services & pricing info\n• Appointment booking\n• Clinic hours & location\n• General dental questions\n\nHow can I help you today?",
};

const QUICK_PROMPTS = [
  'What services do you offer?',
  'How do I book an appointment?',
  'What are your opening hours?',
  'How much does teeth whitening cost?',
];

function MarkdownText({ text }: { text: string }) {
  // Very light markdown: bold and newlines
  const parts = text.split(/(\*\*[^*]+\*\*|\n)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**'))
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (part === '\n') return <br key={i} />;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default function ChatBot() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef             = useRef<HTMLDivElement>(null);
  const inputRef              = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    const newHistory       = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ messages: newHistory }),
      });

      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      setMessages([...newHistory, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages([
        ...newHistory,
        {
          role:    'assistant',
          content: "I'm sorry, I'm having trouble connecting right now. Please call us at **(555) 123-4567** or email **info@brightsmileclinic.com**.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close chat' : 'Open chat assistant'}
        className={clsx(
          'fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg',
          'bg-primary-600 text-white hover:bg-primary-700 transition-all duration-300',
          open ? 'scale-95' : 'scale-100 hover:scale-105',
        )}
      >
        {open ? <FiX size={22} /> : <FiMessageCircle size={22} />}
        {!open && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold">
            1
          </span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-gray-100 chat-bubble-enter"
          role="dialog"
          aria-modal="true"
          aria-label="Chat with Denty"
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-primary-600 px-4 py-3.5 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <FaTooth size={16} />
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">Denty – AI Assistant</p>
              <p className="text-[11px] text-primary-100 flex items-center gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400"></span>
                Online · BrightSmile Clinic
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Close chat"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4 space-y-3 max-h-80">
            {messages.map((m, i) => (
              <div
                key={i}
                className={clsx(
                  'flex gap-2',
                  m.role === 'user' ? 'justify-end' : 'justify-start',
                )}
              >
                {m.role === 'assistant' && (
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 mt-1">
                    <FaTooth size={12} className="text-primary-600" />
                  </span>
                )}
                <div
                  className={clsx(
                    'max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                    m.role === 'user'
                      ? 'bg-primary-600 text-white rounded-tr-sm'
                      : 'bg-white text-gray-700 shadow-sm rounded-tl-sm',
                  )}
                >
                  <MarkdownText text={m.content} />
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 justify-start">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100">
                  <FaTooth size={12} className="text-primary-600" />
                </span>
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center">
                    {[0, 1, 2].map((n) => (
                      <span
                        key={n}
                        className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: `${n * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          {messages.length <= 1 && (
            <div className="bg-gray-50 px-4 pb-2 flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-primary-400 hover:text-primary-600 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-white border-t border-gray-100 px-3 py-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-200 transition"
              disabled={loading}
              maxLength={500}
              aria-label="Chat message"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              {loading ? (
                <FiLoader size={14} className="animate-spin" />
              ) : (
                <FiSend size={14} />
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
