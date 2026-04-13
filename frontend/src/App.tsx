import { useState } from 'react';
import { Sidebar } from './components/UI/Sidebar';
import { Dashboard } from './components/UI/Dashboard';
import { AssistantModel } from './components/Assistant/AssistantModel';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { ChatInterface } from './components/UI/ChatInterface';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Bell, ShieldCheck } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="relative w-full h-screen bg-bg text-white overflow-hidden">
      {/* Restored Awesome Background & 3D Environment */}
      <AssistantModel />

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
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Column 2: Main Feature Module */}
          <main className="pro-main-col">
            <header className="flex justify-between items-center mb-4">
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
              {activeTab === 'dashboard' ? (
                <motion.div key="dash" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <Dashboard />
                </motion.div>
              ) : (
                <div className="pro-panel flex-1 flex flex-col items-center justify-center p-12 text-center opacity-50">
                  <Activity className="w-12 h-12 mb-4 animate-pulse text-primary" />
                  <h2 className="text-xl font-bold">Module Initialization</h2>
                  <p className="max-w-xs text-sm mt-2 text-text-dim">This component is currently synchronizing with the central academic repository.</p>
                </div>
              )}
            </AnimatePresence>
          </main>

          {/* Column 3: Nexus Intelligence Panel */}
          <aside className="pro-side-col h-full">
            <div className="flex items-center gap-2 mb-6">
                <ShieldCheck className="text-primary w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Nexus_Intelligence</span>
            </div>

            <div className="flex-1 flex flex-col gap-6 overflow-hidden">
                <div className="pro-panel p-5 bg-primary/5 border-primary/20">
                    <h3 className="text-xs font-bold text-primary mb-2 uppercase">System Status</h3>
                    <div className="flex justify-between text-[10px] font-mono mb-1">
                        <span>AI_CORE</span>
                        <span className="text-green-500">OPTIMAL</span>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden flex flex-col pro-panel">
                    <div className="p-4 border-b border-border bg-white/5">
                        <span className="text-[10px] font-bold uppercase">Direct Command Entry</span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <ChatInterface />
                    </div>
                </div>

                <button 
                    onClick={handleLogout}
                    className="w-full p-4 text-[10px] font-bold text-accent hover:bg-accent/10 border border-accent/20 transition-all uppercase"
                >
                    Terminate Session
                </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
