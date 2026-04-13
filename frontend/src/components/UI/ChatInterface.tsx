import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal, Shield, Cpu } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export const ChatInterface: React.FC = () => {
  const [messages] = useState<Message[]>([
    { id: '1', text: "NEURAL_LINK_ESTABLISHED. I am Nexus. Predicting academic trajectory...", sender: 'assistant', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-transparent overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: msg.sender === 'user' ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[90%] flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-6 h-6 border flex items-center justify-center shrink-0 ${
                  msg.sender === 'user' ? 'border-secondary bg-secondary/10' : 'border-primary bg-primary/10'
                }`}>
                  {msg.sender === 'user' ? <Shield className="w-3 h-3 text-secondary" /> : <Cpu className="w-3 h-3 text-primary" />}
                </div>
                <div className={`p-3 border ${
                  msg.sender === 'user' 
                    ? 'border-secondary/30 bg-secondary/5 text-white' 
                    : 'border-primary/30 bg-primary/5 text-white'
                }`}>
                  <p className="font-mono text-[11px] leading-relaxed">
                    <span className="opacity-50 mr-2">[{msg.sender === 'user' ? 'OP' : 'AI'}]</span>
                    {msg.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* HUD Input Area */}
      <div className="p-4 border-t border-white/5 bg-black/40">
        <div className="relative">
          <div className="absolute left-3 top-3.5">
            <Terminal className="w-4 h-4 text-primary opacity-50" />
          </div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="EXECUTE_COMMAND..."
            className="w-full hud-input pl-10 h-11 text-xs"
          />
          <button
            className="absolute right-2 top-2 h-7 w-7 bg-primary flex items-center justify-center hover:scale-110 transition-all"
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
