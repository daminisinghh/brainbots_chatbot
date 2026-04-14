import React, { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceAssistantProps {
  onCommand: (tab: string) => void;
  isActive: boolean;
  setIsActive: (val: boolean) => void;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onCommand, isActive, setIsActive }) => {
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Text-to-Speech Utility
  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;
    
    // Stop any current speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.1;
    utterance.pitch = 0.9; // Slightly lower for a professional AI feel
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    // Speech-to-Text Setup
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const text = event.results[current][0].transcript.toLowerCase();
      setTranscript(text);

      if (event.results[current].isFinal) {
        handleCommand(text);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech Recognition Error:", event.error);
      if (event.error === 'not-allowed') {
        setIsActive(false);
      }
    };

    recognition.start();
    speak("Neural Voice Link established. System at your command.");

    return () => {
      recognition.stop();
    };
  }, [isActive, setIsActive, speak]);

  const handleCommand = (cmd: string) => {
    if (cmd.includes('task')) {
      speak("Switching to Task Matrix.");
      onCommand('tasks');
    } else if (cmd.includes('gpa') || cmd.includes('dashboard')) {
      speak("Displaying Academic Trajectory.");
      onCommand('dashboard');
    } else if (cmd.includes('alert') || cmd.includes('log') || cmd.includes('history')) {
      speak("Opening Academic Log.");
      onCommand('history');
    } else if (cmd.includes('analytics')) {
      speak("Executing Neural Analysis.");
      onCommand('analytics');
    } else if (cmd.includes('attendance') || cmd.includes('progress')) {
      speak("Visualizing Progress Tracking.");
      onCommand('attendance');
    } else if (cmd.includes('setting')) {
        speak("Opening System Preferences.");
        onCommand('settings');
    } else if (cmd.includes('calendar')) {
        speak("Loading Academic Schedule.");
        onCommand('calendar');
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-8">
      <div className="pro-panel p-4 flex items-center gap-6 bg-primary/10 border-primary/30 min-w-[300px] backdrop-blur-2xl shadow-[0_0_50px_rgba(59,130,246,0.2)]">
        <div className="relative">
            <div className={`p-3 rounded-full border transition-all duration-500 ${
                isSpeaking ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]'
            }`}>
               {isSpeaking ? <Volume2 className="w-5 h-5 animate-pulse text-cyan-400" /> : <Mic className="w-5 h-5 animate-pulse text-primary" />}
            </div>
            {/* Visual audio waves */}
            <div className="absolute inset-0 -z-10 animate-ping opacity-20 border border-primary rounded-full" />
        </div>

        <div className="flex flex-col gap-1 overflow-hidden">
            <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Neural_Link_Active</span>
            <p className="text-xs text-white font-mono truncate max-w-[200px]">
                {transcript || "Awaiting command..."}
            </p>
        </div>

        <button 
            onClick={() => {
                speak("Neural Voice Link terminated.");
                setIsActive(false);
            }}
            className="p-2 hover:bg-white/5 rounded transition-colors group"
        >
            <MicOff className="w-4 h-4 text-text-dim group-hover:text-accent" />
        </button>

        {/* HUD Scanline */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/20 animate-scanline pointer-events-none" />
      </div>
    </div>
  );
};
