import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal, Shield, Cpu, Mic } from 'lucide-react';
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
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden border-l border-white/5">
      {/* Messages Area with Data stream background */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide data-stream-bg">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] flex items-start gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar Icon with Glowing Ring */}
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ${
                  msg.sender === 'user' 
                    ? 'border-secondary bg-secondary/20 shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                    : 'border-primary bg-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.3)] animate-pulse-glow'
                }`}>
                  {msg.sender === 'user' ? <Shield className="w-4 h-4 text-secondary" /> : <Cpu className="w-4 h-4 text-primary" />}
                </div>

                {/* Message Bubble with Glassmorphism */}
                <div className={`p-4 rounded-xl relative overflow-hidden group ${
                  msg.sender === 'user' ? 'glass-cyan text-right' : 'glass-violet'
                }`}>
                  {/* Inner Gradient Background */}
                  <div className={`absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-br ${
                    msg.sender === 'user' ? 'from-secondary to-transparent' : 'from-primary to-transparent'
                  }`} />
                  
                  <div className="flex items-center gap-2 mb-1.5 opacity-50">
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {msg.sender === 'user' ? 'Operator' : 'AI_Nexus Core'}
                    </span>
                    <span className="text-[8px] font-mono">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                  </div>

                  <p className="font-mono text-xs leading-relaxed relative z-10 text-white/90">
                    {msg.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start pl-12">
               <div className="px-3 py-1.5 glass-violet text-primary text-[10px] font-mono animate-pulse uppercase tracking-[0.2em] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                  Processing_Signal...
               </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* HUD Input Area - Re-styled as a terminal */}
      <div className="p-6 bg-black/60 border-t border-white/10 relative overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/40" />

        <div className="relative group">
          <div className="absolute left-4 top-4 flex gap-2 items-center">
            <Terminal className="w-4 h-4 text-primary group-focus-within:text-secondary transition-colors" />
            <Mic className="w-3 h-3 text-white/20 hover:text-accent cursor-pointer transition-colors" />
          </div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="EXECUTE_COMMAND..."
            className="w-full bg-white/5 border border-white/10 focus:border-primary/50 focus:bg-primary/5 pl-12 pr-12 py-3.5 text-xs font-mono text-white placeholder:text-white/20 outline-none transition-all rounded"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-2 top-2 h-9 w-9 bg-primary/20 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-all duration-300 rounded disabled:opacity-20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        <div className="mt-3 flex justify-between items-center px-1">
            <div className="flex gap-3">
                <div className="w-1 h-3 bg-primary/30" />
                <div className="w-1 h-3 bg-primary/30" />
                <div className="w-1 h-3 bg-primary/30" />
            </div>
            <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.3em]">Neural_Link v4.0.2</span>
        </div>
      </div>
    </div>
  );
};
