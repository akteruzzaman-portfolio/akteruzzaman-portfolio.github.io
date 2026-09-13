import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  ChevronRight,
  MessageSquare,
  Calendar,
  Copy,
  Check,
  Phone,
  ArrowUpRight
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionLinks?: Array<{ label: string; sectionId: string; isExternal?: boolean; url?: string }>;
}

interface AIChatbotProps {
  onNavigate?: (sectionId: string) => void;
  onSelectServiceOrPlan?: (title: string) => void;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  text: `আসসালামু আলাইকুম! 👋 Hi there! I'm **AKTERUZZAMAN's AI Consultation Assistant**.\n\nI am fully trained on his **5+ years experience**, **6 core services**, **pricing plans ($99, $199, $299)**, **5 featured case studies**, **Creative Studio tools**, and **appointment booking**.\n\nFeel free to ask in English or **বাংলা**! How can I assist you today?`,
  timestamp: 'Just now',
  actionLinks: [
    { label: '📅 Book 1-on-1 Call', sectionId: 'book-appointment' },
    { label: '⚡ Explore Services', sectionId: 'services' },
    { label: '💰 Check Pricing ($99+)', sectionId: 'pricing' },
    { label: '💬 WhatsApp Direct', sectionId: 'whatsapp', isExternal: true, url: `https://wa.me/8801736683282?text=${encodeURIComponent('Hi Akteruzzaman, I am contacting you from your portfolio website.')}` },
  ],
};

const SUGGESTIONS = [
  'কী কী সার্ভিস দেন ও খরচ কত?',
  'How do I book an appointment?',
  'Tell me about Akteruzzaman',
  'What are your pricing packages?',
  'Show me your featured projects',
  'WhatsApp-এ কথা বলতে চাই',
];

export default function AIChatbot({ onNavigate }: AIChatbotProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages]);

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome')
        .slice(-6)
        .map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          text: m.text,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const replyText = data.reply || "I'm here to help! Could you please repeat that?";

      // Determine smart contextual navigation buttons based on response content
      const lowerReply = replyText.toLowerCase();
      const actionLinks: Array<{ label: string; sectionId: string; isExternal?: boolean; url?: string }> = [];

      if (lowerReply.includes('pricing') || lowerReply.includes('$99') || lowerReply.includes('$199') || lowerReply.includes('$299') || lowerReply.includes('খরচ') || lowerReply.includes('প্যাকেজ')) {
        actionLinks.push({ label: 'View Pricing Table', sectionId: 'pricing' });
      }
      if (lowerReply.includes('book') || lowerReply.includes('appointment') || lowerReply.includes('অ্যাপয়েন্টমেন্ট') || lowerReply.includes('শিডিউল')) {
        actionLinks.push({ label: 'Book Appointment', sectionId: 'book-appointment' });
      }
      if (lowerReply.includes('project') || lowerReply.includes('case study') || lowerReply.includes('aura') || lowerReply.includes('প্রজেক্ট')) {
        actionLinks.push({ label: 'View Case Studies', sectionId: 'projects' });
      }
      if (lowerReply.includes('service') || lowerReply.includes('সার্ভিস') || lowerReply.includes('marketing') || lowerReply.includes('seo')) {
        actionLinks.push({ label: 'Explore Services', sectionId: 'services' });
      }
      if (lowerReply.includes('studio') || lowerReply.includes('tool') || lowerReply.includes('generator')) {
        actionLinks.push({ label: 'Creative Studio Tools', sectionId: 'studio' });
      }
      if (lowerReply.includes('whatsapp') || lowerReply.includes('হোয়াটসঅ্যাপ') || lowerReply.includes('+880 1736683282')) {
        actionLinks.push({
          label: 'Chat on WhatsApp',
          sectionId: 'whatsapp',
          isExternal: true,
          url: 'https://wa.me/8801736683282?text=Hi%20Akteruzzaman,%20I%20contacted%20you%20via%20AI%20Chatbot.'
        });
      }
      if (lowerReply.includes('contact') || lowerReply.includes('যোগাযোগ') || lowerReply.includes('ইমেইল')) {
        actionLinks.push({ label: 'Contact Form', sectionId: 'contact' });
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionLinks: actionLinks.length > 0 ? actionLinks : undefined,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: `আক্তারুজ্জামান (AKTERUZZAMAN)-এর সাথে সরাসরি যোগাযোগের জন্য:\n• **WhatsApp**: **+880 1736683282**\n• **Email**: **${PERSONAL_INFO.email}**\n• **Book an Appointment**: **/book-appointment** পেজে সরাসরি সেশন বুক করতে পারেন!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionLinks: [
          { label: '📅 Book Appointment', sectionId: 'book-appointment' },
          { label: '💰 Check Pricing ($99+)', sectionId: 'pricing' },
          { label: '💬 Chat on WhatsApp', sectionId: 'whatsapp', isExternal: true, url: 'https://wa.me/8801736683282' },
        ],
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  const handleSectionClick = (action: { label: string; sectionId: string; isExternal?: boolean; url?: string }) => {
    if (action.isExternal && action.url) {
      window.open(action.url, '_blank', 'noopener,noreferrer');
      return;
    }

    const routeMap: Record<string, string> = {
      'hero': '/',
      'about': '/about',
      'services': '/services',
      'skills': '/skills',
      'projects': '/projects',
      'studio': '/studio',
      'pricing': '/pricing',
      'reviews': '/reviews',
      'book-appointment': '/book-appointment',
      'appointment': '/book-appointment',
      'contact': '/contact',
    };

    if (routeMap[action.sectionId]) {
      navigate(routeMap[action.sectionId]);
    } else if (onNavigate) {
      onNavigate(action.sectionId);
    } else {
      const el = document.getElementById(action.sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }

    // On small screens, close the chat modal when navigating
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <div id="ai-chatbot-widget" className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-50 flex flex-col items-start">
      {/* Trigger Button (Positioned Bottom-Left) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="open-ai-chat-btn"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Chatbot"
            className="group relative flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#923FFF] via-[#583FFF] to-[#7DBFFF] text-white shadow-2xl shadow-[#923FFF]/40 cursor-pointer border border-white/20 transition-all text-left"
          >
            {/* Ambient Pulse Glow */}
            <span
              aria-hidden="true"
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#923FFF] to-[#7DBFFF] opacity-60 blur-md group-hover:opacity-100 transition-opacity -z-10 animate-pulse"
            />

            {/* Avatar / Icon */}
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/40 bg-zinc-900 flex-shrink-0">
              <img
                src={PERSONAL_INFO.avatarImage}
                alt="AKTERUZZAMAN AI"
                className="w-full h-full object-cover object-[center_20%]"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-black rounded-full animate-pulse"></span>
            </div>

            {/* Text Label */}
            <div className="pr-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold tracking-wide uppercase text-white drop-shadow-sm">
                  AI Assistant
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#7DBFFF] animate-spin [animation-duration:4s]" />
              </div>
              <p className="text-[10px] text-white/90 font-medium">Ask anything • বাংলা / EN</p>
            </div>

            {/* Unread indicator */}
            {hasUnread && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7DBFFF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#923FFF] border-2 border-black"></span>
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Chat Modal (Opens from Bottom-Left) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-chatbot-window"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-[calc(100vw-2.5rem)] sm:w-[420px] h-[590px] max-h-[82vh] flex flex-col rounded-3xl glass-panel bg-zinc-950/95 border border-white/15 shadow-2xl shadow-black/90 overflow-hidden backdrop-blur-2xl origin-bottom-left"
          >
            {/* Modal Header */}
            <div className="px-4 py-3.5 sm:px-5 sm:py-4 border-b border-white/10 bg-gradient-to-r from-zinc-900/90 via-[#1a122c]/90 to-zinc-900/90 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#923FFF] to-[#7DBFFF] flex-shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden bg-black">
                    <img
                      src={PERSONAL_INFO.avatarImage}
                      alt="AKTERUZZAMAN"
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-zinc-950 rounded-full animate-pulse"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white tracking-tight">AKTERUZZAMAN AI</h3>
                    <span className="px-1.5 py-0.2 text-[9px] font-semibold bg-[#923FFF]/20 text-[#7DBFFF] border border-[#923FFF]/30 rounded-full">
                      Trained AI
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Online • Instant Answers (EN/বাংলা)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  id="reset-chat-btn"
                  onClick={handleReset}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  id="close-chat-btn"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  aria-label="Close chat"
                  className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scroll-smooth">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 shadow-md relative group ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-[#923FFF] to-[#583FFF] text-white rounded-br-none'
                        : 'bg-zinc-900/90 border border-white/10 text-zinc-200 rounded-bl-none'
                    }`}
                  >
                    {/* Copy Button for Bot Messages */}
                    {msg.role === 'assistant' && msg.id !== 'welcome' && (
                      <button
                        onClick={() => handleCopyText(msg.id, msg.text)}
                        title="Copy message"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-white bg-black/40 hover:bg-black/70 rounded transition-all cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}

                    {/* Message Body with minimal markdown rendering */}
                    <div className="whitespace-pre-line leading-relaxed text-[13px] sm:text-sm">
                      {msg.text.split('\n').map((line, i) => {
                        // Support bullet points
                        const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
                        // Support bold **text**
                        const parts = line.split(/(\*\*.*?\*\*)/g);
                        return (
                          <span key={i} className={`block min-h-[1.25rem] ${isBullet ? 'pl-2 text-zinc-300' : ''}`}>
                            {parts.map((part, j) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return (
                                  <strong key={j} className="text-white font-semibold">
                                    {part.slice(2, -2)}
                                  </strong>
                                );
                              }
                              return part;
                            })}
                          </span>
                        );
                      })}
                    </div>

                    {/* Interactive Action Links */}
                    {msg.actionLinks && msg.actionLinks.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5">
                        {msg.actionLinks.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSectionClick(action)}
                            className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-[#923FFF]/20 hover:bg-[#923FFF]/40 text-[#7DBFFF] border border-[#923FFF]/30 transition-colors cursor-pointer"
                          >
                            <span>{action.label}</span>
                            {action.isExternal ? (
                              <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <ChevronRight className="w-3 h-3" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-zinc-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Loading Typing Indicator */}
              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="bg-zinc-900/90 border border-white/10 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-[#923FFF] animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 rounded-full bg-[#583FFF] animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 rounded-full bg-[#7DBFFF] animate-bounce"></span>
                    <span className="text-xs text-zinc-400 ml-1">Trained AI thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Chips (shown when conversation is short) */}
            {messages.length <= 4 && (
              <div className="px-3 py-2 border-t border-white/5 bg-zinc-900/60">
                <p className="text-[11px] text-zinc-400 mb-1.5 font-medium px-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#7DBFFF]" />
                  Suggested questions:
                </p>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {SUGGESTIONS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(item)}
                      disabled={isLoading}
                      className="text-xs text-zinc-300 hover:text-white bg-zinc-800/90 hover:bg-[#923FFF]/20 border border-white/10 hover:border-[#923FFF]/40 rounded-full px-3 py-1 whitespace-nowrap transition-colors flex-shrink-0 cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-white/10 bg-zinc-950/95 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                id="ai-chat-input"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask in English or বাংলা..."
                disabled={isLoading}
                className="flex-1 bg-zinc-900/90 border border-white/10 focus:border-[#923FFF] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#923FFF]/50 transition-colors"
              />
              <button
                id="ai-chat-send-btn"
                type="submit"
                disabled={!inputText.trim() || isLoading}
                aria-label="Send message"
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#923FFF] to-[#583FFF] text-white disabled:opacity-40 hover:opacity-95 transition-opacity cursor-pointer flex-shrink-0 shadow-lg shadow-[#923FFF]/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
