import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  CheckSquare, 
  History, 
  Settings, 
  BrainCircuit, 
  Trophy,
  Cpu,
  RefreshCw,
  Mic,
  MicOff
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isVoiceActive?: boolean;
  onToggleVoice?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isVoiceActive, onToggleVoice }) => {
  const primaryMenu = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'calendar', icon: Calendar, label: 'Academic Calendar' },
    { id: 'tasks', icon: CheckSquare, label: 'Task Matrix' },
    { id: 'attendance', icon: Trophy, label: 'Progress Tracking' },
  ];

  const systemMenu = [
    { id: 'analytics', icon: BrainCircuit, label: 'AI Analytics' },
    { id: 'history', icon: History, label: 'Academic Log' },
    { id: 'settings', icon: Settings, label: 'Preferences' },
  ];

  return (
    <div className="pro-sidebar h-full group/sidebar">
      {/* Brand HUD Logo */}
      <div 
        onClick={() => setActiveTab('dashboard')}
        className="flex items-center gap-4 px-2 mb-8 relative group cursor-pointer"
      >
        <div className="relative">
            <div className="w-10 h-10 bg-primary/10 border border-primary/40 rounded shadow-[0_0_15px_rgba(59,130,246,0.2)] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-primary">
                <span className="text-white font-black text-xl italic tracking-tighter">Z</span>
            </div>
            {/* Animated Ring */}
            <div className="absolute inset-[-4px] border border-primary/20 rounded-full animate-spin duration-[8s] pointer-events-none" />
        </div>
        <div>
            <h1 className="text-sm font-black tracking-[0.2em] text-white">ZENITH PRO</h1>
            <p className="text-[9px] text-primary font-bold uppercase tracking-[0.1em] flex items-center gap-1">
                <Cpu className="w-2.5 h-2.5" /> Nexus_Core v4
            </p>
        </div>
        {/* Horizontal Scanline */}
        <div className="absolute bottom-[-10px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      </div>

      <div className="flex-1 flex flex-col gap-8">
        <div>
            <p className="px-5 text-[9px] font-black text-text-dim uppercase mb-4 tracking-[0.3em] opacity-50 flex items-center gap-2">
                <span className="w-1 h-3 bg-primary/40" /> Main_Modules
            </p>
            <nav className="flex flex-col gap-1.5 px-2">
                {primaryMenu.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`pro-nav-item relative group ${activeTab === item.id ? 'active' : ''}`}
                    >
                        <item.icon className={`w-4 h-4 transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-6'}`} />
                        <span className="tracking-wide">{item.label}</span>
                        {activeTab === item.id && (
                            <div className="absolute inset-0 bg-primary/5 rounded-lg border border-primary/10 -z-10 shadow-[0_0_15px_rgba(59,130,246,0.05)]" />
                        )}
                    </button>
                ))}
            </nav>
        </div>

        <div>
            <p className="px-5 text-[9px] font-black text-text-dim uppercase mb-4 tracking-[0.3em] opacity-50 flex items-center gap-2">
                <span className="w-1 h-3 bg-cyan-500/40" /> Advanced_Systems
            </p>
            <nav className="flex flex-col gap-1.5 px-2">
                {systemMenu.map((item) => (
                   <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`pro-nav-item relative group ${activeTab === item.id ? 'active' : ''}`}
                   >
                        <item.icon className={`w-4 h-4 transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110 group-hover:-rotate-6'}`} />
                        <span className="tracking-wide">{item.label}</span>
                   </button>
                ))}
            </nav>
        </div>
      </div>

      {/* Voice Assistant Toggle */}
      <div className="mt-auto pt-4">
          <button 
            onClick={onToggleVoice}
            className={`w-full pro-panel p-4 flex items-center justify-between group transition-all duration-500 hover:scale-[1.02] ${
                isVoiceActive ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-white/5 bg-white/5'
            }`}
          >
              <div className="flex items-center gap-3">
                  <div className={`p-2 rounded bg-black/40 border transition-colors ${
                      isVoiceActive ? 'border-primary text-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'border-white/10 text-text-dim group-hover:text-primary group-hover:border-primary/40'
                  }`}>
                      {isVoiceActive ? <Mic className="w-3.5 h-3.5 animate-pulse" /> : <MicOff className="w-3.5 h-3.5" />}
                  </div>
                  <div className="text-left">
                      <span className="text-[9px] font-black text-white uppercase tracking-widest block">Neural_Voice</span>
                      <span className={`text-[8px] font-bold uppercase tracking-widest ${isVoiceActive ? 'text-primary' : 'text-text-dim'}`}>
                          {isVoiceActive ? 'Link_Active' : 'Link_Offline'}
                      </span>
                  </div>
              </div>
              <div className={`w-2 h-2 rounded-full ${isVoiceActive ? 'bg-primary animate-ping' : 'bg-white/10'}`} />
          </button>
      </div>

      {/* Real-time Data Monitor Footer */}
      <div className="mt-8 pro-panel p-5 bg-black/40 border-t border-primary/10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <RefreshCw className="w-3 h-3 text-primary animate-spin-slow" />
                <span className="text-[9px] font-black text-text-dim uppercase tracking-widest">Data_Integrity</span>
            </div>
            <span className="text-[9px] font-mono text-primary font-bold">100%</span>
        </div>
        
        <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-primary/10 animate-pulse" />
            <div className="h-full bg-primary/60 w-3/4 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000" />
            
            {/* Moving Light Glint */}
            <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
        
        <div className="flex justify-between text-[8px] font-mono text-text-dim/60">
            <span>SYNC::SECURE</span>
            <span>Uptime: 99.9%</span>
        </div>
      </div>
    </div>
  );
};
