import React from 'react';
import { mockAttendance } from '../../data/mockData';
import { Activity, ShieldCheck, AlertTriangle, TrendingUp, BarChart3 } from 'lucide-react';

export const ProgressView: React.FC = () => {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-700">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold tracking-tight uppercase tracking-widest">Progress Tracking</h2>
                    <p className="text-xs text-text-dim">Academic Stability & Engagement Analytics</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-text-dim uppercase">Overall index</span>
                        <span className="text-lg font-mono font-bold text-primary">82.4%</span>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center p-1">
                         <div className="w-full h-full rounded-full border-2 border-primary border-t-transparent animate-spin duration-[3000ms]" />
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual metric cards */}
                {mockAttendance.map((item, i) => (
                    <div key={i} className="pro-panel p-6 flex flex-col gap-6 relative group overflow-hidden">
                        {/* Background SVG Decoration */}
                        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                             <BarChart3 className="w-32 h-32" />
                        </div>

                        <div className="flex justify-between items-start z-10">
                            <div>
                                <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{item.subject}</h3>
                                <p className="text-[10px] text-text-dim font-mono tracking-widest uppercase mt-1">Core Module</p>
                            </div>
                            {item.percentage < 75 ? (
                                <AlertTriangle className="text-red-500 w-5 h-5 animate-pulse" />
                            ) : (
                                <ShieldCheck className="text-primary w-5 h-5" />
                            )}
                        </div>

                        <div className="flex items-baseline gap-2 z-10">
                            <span className="text-4xl font-bold font-mono tracking-tighter">{item.percentage}%</span>
                            <span className="text-xs text-text-dim uppercase tracking-widest font-bold">Attendance</span>
                        </div>

                        <div className="flex flex-col gap-2 z-10">
                            <div className="flex justify-between text-[10px] font-bold uppercase text-text-dim">
                                <span>Engagement Profile</span>
                                <span>{item.attendedClasses}/{item.totalClasses} Units</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full transition-all duration-1000 ease-out ${
                                        item.percentage < 75 ? 'bg-red-500' : 'bg-primary'
                                    }`} 
                                    style={{ width: `${item.percentage}%` }} 
                                />
                            </div>
                        </div>

                        <button className="text-[10px] font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 mt-2">
                             Full Analysis <TrendingUp className="w-3 h-3" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="pro-panel p-8 bg-primary/5 border-primary/10 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Activity className="w-10 h-10 text-primary animate-pulse" />
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest">AI Synthesis Result</h4>
                        <p className="text-xs text-text-dim max-w-md mt-1">
                            Current performance trajectory indicates a <span className="text-primary font-bold">92% probability</span> of achieving Target GPA within the specified timeline.
                        </p>
                    </div>
                </div>
                <button className="pro-button uppercase text-[10px] tracking-[0.2em] font-bold py-3">Download Synergy Report</button>
            </div>
        </div>
    );
};
