import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal, Shield, Cpu } from 'lucide-react';
import { parseMessage } from '../../logic/nlp';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "NEURAL_LINK_ESTABLISHED. I am Nexus. Predicting academic trajectory...", sender: 'assistant', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
        id: Date.now().toString(),
        text: input,
        sender: 'user',
        timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // AI Processing delay to feel "real"
    setTimeout(() => {
        const response = parseMessage(userMessage.text);
        const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: response.message,
            sender: 'assistant',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);

        // Voice Assistance (Text-to-Speech)
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Cancel any ongoing speech
            const utterance = new SpeechSynthesisUtterance(response.message);
            utterance.rate = 1.0;
            utterance.pitch = 1.1; // Slightly higher pitch for AI vibe
            utterance.volume = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden">
      {/* Messages Area with Data stream background */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-hide data-stream-bg">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[90%] flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar Icon with Glowing Ring */}
                <div className={`w-6 h-6 rounded bg-black/40 border flex items-center justify-center shrink-0 transition-all duration-700 ${
                  msg.sender === 'user' 
                    ? 'border-secondary/40 text-secondary shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                    : 'border-primary/40 text-primary shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                }`}>
                  {msg.sender === 'user' ? <Shield className="w-3 h-3" /> : <Cpu className="w-3 h-3 animate-pulse" />}
                </div>

                {/* Message Bubble with Glassmorphism */}
                <div className={`px-3 py-2.5 rounded border relative overflow-hidden group ${
                  msg.sender === 'user' 
                  ? 'bg-secondary/5 border-secondary/20 rounded-tr-none' 
                  : 'bg-primary/5 border-primary/20 rounded-tl-none'
                }`}>
                  {/* Subtle Scanline for Assistant */}
                  {msg.sender === 'assistant' && (
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-0 pointer-events-none bg-[length:100%_2px,3px_100%]" />
                  )}
                  
                  {/* Inner Gradient Background */}
                  <div className={`absolute inset-0 opacity-5 pointer-events-none bg-gradient-to-br ${
                    msg.sender === 'user' ? 'from-secondary to-transparent' : 'from-primary to-transparent'
                  }`} />
                  
                  <div className={`flex items-center gap-2 mb-1 opacity-40 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                    <span className="text-[8px] font-black uppercase tracking-[0.2em]">
                      {msg.sender === 'user' ? 'Operator' : 'AI_Nexus'}
                    </span>
                    <span className="text-[7px] font-mono">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                  </div>

                  <p className="font-mono text-[11px] leading-relaxed relative z-10 text-white/90 tracking-tight">
                    {msg.sender === 'assistant' ? (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, staggerChildren: 0.05 }}
                      >
                        {msg.text.split('').map((char, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.01 }}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </motion.span>
                    ) : (
                      msg.text
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start pl-9">
               <div className="px-2 py-1 bg-primary/10 border border-primary/20 text-primary text-[9px] font-black animate-pulse uppercase tracking-[0.3em] flex items-center gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full animate-ping" />
                  Synthesis_In_Progress...
               </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* HUD Input Area - Terminal Mode */}
      <div className="p-3 bg-black/40 border-t border-white/5 relative">
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex gap-2 items-center pointer-events-none">
            <Terminal className="w-3.5 h-3.5 text-primary/60 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="CMD_INPUT::"
            className="w-full bg-white/[0.03] border border-white/10 focus:border-primary/40 focus:bg-primary/5 pl-9 pr-10 py-2 text-[10px] font-mono text-white placeholder:text-white/10 outline-none transition-all rounded"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-1 top-1 h-6 px-3 bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-all duration-300 rounded border border-primary/20 disabled:opacity-0"
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
        
        <div className="mt-2 flex justify-between items-center px-1">
            <div className="flex gap-2">
                {[1,2,3,4].map(i => <div key={i} className="w-0.5 h-2 bg-primary/20" />)}
            </div>
            <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.4em]">Integrated_Neural_Buffer</span>
        </div>
      </div>
    </div>
  );
};
