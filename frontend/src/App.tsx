import { useState } from 'react';
import { Sidebar } from './components/UI/Sidebar';
import { Dashboard } from './components/UI/Dashboard';
import { CalendarView } from './components/UI/CalendarView';
import { TaskView } from './components/UI/TaskView';
import { ProgressView } from './components/UI/ProgressView';
import { AnalyticsView } from './components/UI/AnalyticsView';
import { HistoryView } from './components/UI/HistoryView';
import { SettingsView } from './components/UI/SettingsView';
import { AssistantModel } from './components/Assistant/AssistantModel';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { ChatInterface } from './components/UI/ChatInterface';
import { MouseGlow } from './components/UI/MouseGlow';
import { VoiceAssistant } from './components/Assistant/VoiceAssistant';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Bell, ShieldCheck, LogOut } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isRegistering, setIsRegistering] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'calendar': return <CalendarView />;
      case 'tasks': return <TaskView />;
      case 'attendance': return <ProgressView setActiveTab={setActiveTab} />;
      case 'analytics': return <AnalyticsView />;
      case 'history': return <HistoryView setActiveTab={setActiveTab} />;
      case 'settings': return <SettingsView />;
      default: return (
        <div className="pro-panel flex-1 flex flex-col items-center justify-center p-12 text-center opacity-50 h-full">
            <Activity className="w-12 h-12 mb-4 animate-pulse text-primary" />
            <h2 className="text-xl font-bold">Module Initialization</h2>
            <p className="max-w-xs text-sm mt-2 text-text-dim">This component is currently synchronizing with the central academic repository.</p>
        </div>
      );
    }
  };

  return (
    <div className="relative w-full h-screen bg-bg text-white overflow-hidden">
      <MouseGlow />
      {/* Restored Awesome Background & 3D Environment */}
      <AssistantModel isListening={voiceActive} />
      <VoiceAssistant 
        isActive={voiceActive} 
        setIsActive={setVoiceActive} 
        onCommand={(tab) => setActiveTab(tab)} 
      />

      {!token ? (
        <div className="relative z-20 flex items-center justify-center h-full px-6">
          <AnimatePresence mode="wait">
            {isRegistering ? (
              <motion.div key="reg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Register onToggle={() => setIsRegistering(false)} onSuccess={() => setIsRegistering(false)} />
              </motion.div>
            ) : (
              <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Login onToggle={() => setIsRegistering(true)} onSuccess={(t) => setToken(t)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="pro-container relative z-10">
          {/* Column 1: Navigation Sidebar */}
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isVoiceActive={voiceActive}
            onToggleVoice={() => setVoiceActive(!voiceActive)}
          />

          {/* Column 2: Main Feature Module */}
          <main className="pro-main-col overflow-y-auto">
            <header className="flex justify-between items-center mb-4 shrink-0">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {activeTab === 'dashboard' ? 'Academic Hub' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h1>
                <p className="text-sm text-text-dim">Professional Academic Management System</p>
              </div>
              <div className="flex gap-3">
                <button className="pro-panel p-2 hover:bg-white/5 transition-colors">
                  <Bell className="w-5 h-5 text-text-dim" />
                </button>
                <div className="pro-panel px-4 py-2 flex items-center gap-3">
                   <div className="w-2 h-2 bg-green-500 rounded-full" />
                   <span className="text-xs font-semibold">SECURE_LINK</span>
                </div>
              </div>
            </header>

            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab} 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex-1"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Column 3: Nexus Intelligence Panel */}
          <aside className="pro-side-col h-full">
            <div className="flex items-center gap-2 mb-6">
                <ShieldCheck className="text-primary w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Nexus_Intelligence</span>
            </div>

            <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                <div className="pro-panel p-5 bg-primary/5 border-primary/20">
                    <h3 className="text-xs font-bold text-primary mb-2 uppercase">System Status</h3>
                    <div className="flex justify-between text-[10px] font-mono mb-1">
                        <span>AI_CORE</span>
                        <span className="text-green-500">OPTIMAL</span>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden flex flex-col pro-panel border-white/10">
                    <div className="px-4 py-2 border-b border-white/5 bg-white/5 flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">Direct Command Entry</span>
                        <div className="flex gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
                            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <ChatInterface />
                    </div>
                </div>

                <button 
                    onClick={handleLogout}
                    className="group relative w-full p-4 overflow-hidden rounded-lg border border-red-500/30 bg-red-500/5 hover:bg-red-500/10 transition-all duration-500"
                >
                    {/* Animated Danger Stripe Background */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(239,68,68,0.1)_10px,rgba(239,68,68,0.1)_20px)]" />
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(239,68,68,0.2)]" />
                    
                    <div className="relative z-10 flex items-center justify-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-red-400 group-hover:text-red-300 uppercase tracking-[0.3em] transition-colors">
                            End_Protocol_Session
                        </span>
                        <LogOut className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-1 transition-transform" />
                    </div>

                    {/* Scanning Line */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-red-500/50 -translate-y-full group-hover:animate-scanline" />
                </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
