import React from 'react';
import { mockAnnouncements } from '../../data/mockData';
import { History, Bell, Search, Filter, ArrowRight } from 'lucide-react';

interface HistoryViewProps {
  setActiveTab: (tab: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ setActiveTab }) => {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-left-4 duration-700 h-full">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold tracking-tight uppercase tracking-widest flex items-center gap-3">
                        <History className="text-primary" /> Academic Log
                    </h2>
                    <p className="text-xs text-text-dim">Historical Data Stream • Communications & Events</p>
                </div>
                <div className="flex gap-4">
                    <div className="pro-panel px-4 py-2 flex items-center gap-3 group bg-black/20">
                         <Search className="w-3 h-3 text-text-dim group-hover:text-primary transition-colors" />
                         <input 
                            placeholder="Search Logs..." 
                            className="bg-transparent border-none outline-none text-[10px] text-white w-32 placeholder:text-text-dim"
                         />
                    </div>
                    <button className="pro-panel p-2 hover:bg-white/5"><Filter className="w-4 h-4 text-text-dim" /></button>
                </div>
            </header>

            <div className="flex flex-col gap-4 pb-8">
                {mockAnnouncements.map((log, i) => (
                    <div key={log.id} className="pro-panel p-6 flex items-start gap-6 group hover:border-primary/30 transition-all relative overflow-hidden">
                        {/* Status Indicator */}
                        <div className="shrink-0 w-12 h-12 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center relative">
                             <Bell className="w-5 h-5 text-primary" />
                             <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-bg" />
                        </div>

                        <div className="flex-1 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{log.department}</span>
                                <span className="text-[10px] font-mono text-text-dim">{log.date}</span>
                            </div>
                            <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{log.title}</h3>
                            <p className="text-xs text-text-dim leading-relaxed max-w-2xl">
                                {log.content}
                            </p>
                            <button 
                                onClick={() => setActiveTab('history')}
                                className="text-[10px] font-bold text-primary uppercase tracking-widest mt-2 flex items-center gap-2 group-hover:translate-x-1 transition-transform"
                            >
                                Read Full Document <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>

                        {/* Background number */}
                        <div className="absolute right-4 bottom-4 text-6xl font-bold text-white/5 pointer-events-none italic">
                            0{i + 1}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
