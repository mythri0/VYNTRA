import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  RotateCcw,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  Compass,
  CheckCircle2,
  ExternalLink,
  ClipboardList
} from 'lucide-react';
import { VyntraLogo } from './VyntraLogo';
import { analytics } from '../services/analyticsService';
import { VyntraReportGenerator } from '../services/reportService';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  quickReplies?: string[];
  link?: { text: string; route: string };
}

interface ChatbotProps {
  navigate: (route: string) => void;
  onOpenFormModal?: () => void;
}

export const ExecutiveChatbot: React.FC<ChatbotProps> = ({ navigate, onOpenFormModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: "Hello! 👋 I'm K Mythri Vaishnavi, owner at VYNTRA.\n\nWelcome to VYNTRA – From Complexity to Clarity! I'm here to assist you in exploring our Transformation Outcomes, Lean Six Sigma Methodologies, Discrete-Event Simulators, and Consulting Practice Frameworks.\n\nWhat would you like to explore today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: [
        'How do you reduce operational cost & scrap?',
        'Tell me about Discrete-Event Flow Simulation',
        'What KPIs and formulas do you measure?',
        'Fill Enterprise Service Scope Form',
        'How can I schedule an advisory discovery call?'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');

    // Generate intelligent contextual response
    setTimeout(() => {
      const lower = text.toLowerCase();
      let botReply = '';
      let replyLink: { text: string; route: string } | undefined = undefined;
      let nextSuggestions: string[] = [];

      if (lower.includes('report') || lower.includes('analytics') || lower.includes('dispatch report') || lower.includes('performance report')) {
        VyntraReportGenerator.dispatchReport('Daily');
        botReply = "I have compiled and automatically dispatched today's Daily Performance Report (incorporating unique visitors, conversion rates, CTA breakdowns, and recent lead pipelines) directly to mythrivaishnavik.int2027g3@gmail.com.";
        nextSuggestions = [
          'How do you reduce operational cost & scrap?',
          'Fill Enterprise Service Scope Form',
          'How can I schedule an advisory discovery call?'
        ];
      } else if (lower.includes('form') || lower.includes('scope') || lower.includes('requirement') || lower.includes('service form')) {
        botReply = "You can complete our comprehensive Enterprise Service Intake Form right away. It gathers all essential organizational details, plant bottlenecks, simulation requirements, and desired outcomes, and routes the submission securely to our executive team.";
        nextSuggestions = [
          'How do you reduce operational cost & scrap?',
          'Tell me about Discrete-Event Flow Simulation',
          'How can I schedule an advisory discovery call?'
        ];
        if (onOpenFormModal) {
          onOpenFormModal();
        }
      } else if (lower.includes('cost') || lower.includes('scrap') || lower.includes('copq') || lower.includes('waste')) {
        botReply = "Our Cost Reduction framework attacks the 'Hidden Factory'—untracked scrap, rework cycles, and working capital bleed. We utilize GEMBA DOWNTIME waste diagnostics and DMAIC problem-solving to deliver 15%–28% COPQ reduction reconciled directly to your P&L.";
        replyLink = { text: 'Explore Cost Reduction Architecture', route: 'outcomes/cost-reduction' };
        nextSuggestions = [
          'What KPIs and formulas do you measure?',
          'Tell me about Discrete-Event Flow Simulation',
          'Book an introductory consultation'
        ];
      } else if (lower.includes('simulat') || lower.includes('sandbox') || lower.includes('line')) {
        botReply = "VYNTRA's Discrete-Event Simulator lets executive teams test line layout reconfigurations, buffer sizes, and batch changeovers in a risk-free digital sandbox before investing capital expenditure. This eliminates starvation and WIP bottlenecks.";
        replyLink = { text: 'Launch Value Stream Simulator', route: 'simulator' };
        nextSuggestions = [
          'How do you reduce operational cost & scrap?',
          'How can I schedule an advisory discovery call?'
        ];
      } else if (lower.includes('kpi') || lower.includes('formula') || lower.includes('measure') || lower.includes('cpk')) {
        botReply = "We calibrate statistically verified KPIs including Process Cycle Efficiency (PCE %), Cost of Poor Quality (COPQ), First Pass Yield (FPY), Overall Equipment Effectiveness (OEE), and Process Capability (Cp/Cpk > 1.67).";
        replyLink = { text: 'Open Lean Sigma Calculator', route: 'calculator' };
        nextSuggestions = [
          'How do you reduce operational cost & scrap?',
          'Book an introductory consultation'
        ];
      } else if (lower.includes('call') || lower.includes('consult') || lower.includes('schedule') || lower.includes('book') || lower.includes('intro')) {
        botReply = "You can schedule an introductory discovery session directly with our senior operations cadre. We will review your plant/service telemetry, establish baseline opportunities, and scope a diagnostic roadmap.";
        replyLink = { text: 'Schedule an Introductory Call', route: 'contact' };
        nextSuggestions = [
          'How do you reduce operational cost & scrap?',
          'Tell me about Discrete-Event Flow Simulation'
        ];
      } else {
        botReply = "Thank you for asking! VYNTRA combines classical Lean Six Sigma industrial engineering with AI and discrete-event simulation to transform operational complexity into measurable enterprise EBITDA.";
        replyLink = { text: 'View All Transformation Outcomes', route: 'outcomes' };
        nextSuggestions = [
          'How do you reduce operational cost & scrap?',
          'Tell me about Discrete-Event Flow Simulation',
          'How can I schedule an advisory discovery call?'
        ];
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        link: replyLink,
        quickReplies: nextSuggestions
      };

      setMessages(prev => [...prev, botMsg]);
    }, 500);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'bot',
        text: "Hello! 👋 I'm K Mythri Vaishnavi, Owner at VYNTRA.\n\nWelcome back! How can I assist you with our Transformation Outcomes, simulation tools, or consulting practices?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: [
          'How do you reduce operational cost & scrap?',
          'Tell me about Discrete-Event Flow Simulation',
          'What KPIs and formulas do you measure?',
          'Fill Enterprise Service Scope Form',
          'How can I schedule an advisory discovery call?'
        ]
      }
    ]);
  };

  return (
    <>
      {/* FLOATING ACTION TRIGGER BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          onClick={() => {
            const nextState = !isOpen;
            setIsOpen(nextState);
            analytics.trackCtaClick(nextState ? 'Open Executive Chat' : 'Close Executive Chat', window.location.hash || '/');
          }}
          className={`relative p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer group ${
            isOpen 
              ? 'bg-slate-900 text-white rotate-90 scale-95' 
              : 'bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:scale-105 ring-4 ring-blue-500/20'
          }`}
          aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6" />
              {/* Online Green Indicator Dot */}
              <span className="absolute top-1 right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
            </>
          )}
        </button>
      </div>

      {/* CHATBOT DIALOG MODAL / SLIDE-IN */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[94vw] sm:w-[400px] h-[520px] max-h-[calc(100vh-100px)] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* HEADER */}
          <div className="p-3.5 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-sm font-bold text-xs">
                  KM
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-white tracking-tight">K Mythri Vaishnavi</h4>
                  <span className="text-[9px] font-mono uppercase bg-blue-500/30 text-blue-300 border border-blue-400/30 px-1.5 py-0.2 rounded font-semibold">
                    Owner
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-300 font-sans">
                  VYNTRA Operations &amp; Advisory
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Restart conversation"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CONTEXT BANNER */}
          <div className="px-4 py-2 bg-blue-50/70 border-b border-blue-100/80 flex items-center justify-between text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              <span>Context: <strong>VYNTRA Advisory Platform</strong></span>
            </div>
            <span className="text-emerald-700 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded font-mono font-semibold text-[10px]">
              Active
            </span>
          </div>

          {/* MESSAGES SCROLL AREA */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 text-xs shadow-2xs mt-0.5 font-bold">
                    KM
                  </div>
                )}

                <div className={`max-w-[82%] space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Optional Deep Link Button */}
                  {msg.link && (
                    <button
                      onClick={() => {
                        navigate(msg.link!.route);
                        setIsOpen(false);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-[11px] font-bold transition-colors cursor-pointer group"
                    >
                      <span>{msg.link.text}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}

                  {/* Suggested Questions / Quick Replies */}
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="pt-2 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block tracking-wider">
                        Suggested Inquiries:
                      </span>
                      <div className="flex flex-col gap-1.5">
                        {msg.quickReplies.map((q, qIdx) => (
                          <button
                            key={qIdx}
                            onClick={() => handleSendMessage(q)}
                            className="text-left px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50/80 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 text-[11.5px] transition-all shadow-2xs cursor-pointer flex items-center justify-between group"
                          >
                            <span className="line-clamp-1">{q}</span>
                            <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <span className={`text-[10px] text-slate-400 block ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 text-xs shadow-2xs mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* BOTTOM DIRECT ACTION CALLOUT */}
          <div className="px-4 py-2 bg-slate-100/90 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-600 font-medium">Ready to specify your project?</span>
            <div className="flex items-center gap-2">
              {onOpenFormModal && (
                <button
                  onClick={() => {
                    onOpenFormModal();
                    setIsOpen(false);
                  }}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                >
                  <ClipboardList className="w-3 h-3" />
                  <span>Fill Form</span>
                </button>
              )}
              <span className="text-slate-300">|</span>
              <button
                onClick={() => {
                  navigate('contact');
                  setIsOpen(false);
                }}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Book Call</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* INPUT BAR */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder="Ask about Cost Reduction, Simulation, KPIs..."
                className="flex-1 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all shadow-xs cursor-pointer flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-500" />
                <span>Context-Aware Operational Advisory</span>
              </span>
              <span>Press Enter ↵ to send</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

