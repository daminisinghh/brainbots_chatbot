import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  CheckSquare, 
  History, 
  Settings, 
  BrainCircuit, 
  Trophy 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
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
    <div className="pro-sidebar h-full">
      <div className="flex items-center gap-3 px-2 mb-4">
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
        </div>
        <div>
            <h1 className="text-sm font-bold tracking-tight">ZENITH PRO</h1>
            <p className="text-[10px] text-text-dim uppercase font-semibold">Nexus Hub v4.0</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-8">
        <div>
            <p className="px-4 text-[10px] font-bold text-text-dim uppercase mb-4 tracking-widest">Main Modules</p>
            <nav className="flex flex-col gap-1">
                {primaryMenu.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`pro-nav-item ${activeTab === item.id ? 'active' : ''}`}
                    >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>

        <div>
            <p className="px-4 text-[10px] font-bold text-text-dim uppercase mb-4 tracking-widest">Advanced</p>
            <nav className="flex flex-col gap-1">
                {systemMenu.map((item) => (
                   <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`pro-nav-item ${activeTab === item.id ? 'active' : ''}`}
                   >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                   </button>
                ))}
            </nav>
        </div>
      </div>

      <div className="mt-auto pro-panel p-4 bg-white/5">
        <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-text-dim uppercase">Sync Status</span>
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
        </div>
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-2/3" />
        </div>
      </div>
    </div>
  );
};
