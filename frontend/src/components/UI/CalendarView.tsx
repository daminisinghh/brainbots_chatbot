import React from 'react';
import { mockSchedule } from '../../data/mockData';
import { Clock, MapPin, User, ChevronLeft, ChevronRight } from 'lucide-react';

export const CalendarView: React.FC = () => {
    // Basic day grouping
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    
    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold tracking-tight">Academic Schedule</h2>
                    <p className="text-xs text-text-dim">Standard Weekly Configuration • Semester II</p>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 pro-panel hover:bg-white/5"><ChevronLeft className="w-4 h-4" /></button>
                    <button className="p-2 pro-panel hover:bg-white/5"><ChevronRight className="w-4 h-4" /></button>
                </div>
            </header>

            <div className="grid grid-cols-5 gap-4 h-full min-h-[500px]">
                {days.map((day) => (
                    <div key={day} className="flex flex-col gap-4">
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 py-2 text-center rounded border border-primary/20">
                            {day}
                        </div>
                        
                        <div className="flex-1 flex flex-col gap-3">
                            {mockSchedule.filter(s => s.day === day).map((session, i) => (
                                <div key={session.id} className="pro-panel p-4 group hover:border-primary/40 transition-all cursor-pointer relative overflow-hidden">
                                    {/* Accent strip */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/30 group-hover:bg-primary transition-colors" />
                                    
                                    <div className="flex flex-col gap-3">
                                        <div className="text-xs font-bold leading-tight group-hover:text-primary transition-colors">
                                            {session.subject}
                                        </div>
                                        
                                        <div className="flex flex-col gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                                            <div className="flex items-center gap-2 text-[10px]">
                                                <Clock className="w-3 h-3 text-cyan-400" />
                                                <span>{session.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px]">
                                                <MapPin className="w-3 h-3 text-cyan-400" />
                                                <span>{session.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px]">
                                                <User className="w-3 h-3 text-cyan-400" />
                                                <span>{session.faculty}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Visual pulse for current/next class mock */}
                                    {i === 0 && day === 'Monday' && (
                                        <div className="absolute top-2 right-2">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            
                            {/* Empty state placeholder for the day */}
                            {mockSchedule.filter(s => s.day === day).length === 0 && (
                                <div className="flex-1 border border-dashed border-white/5 rounded flex items-center justify-center">
                                    <span className="text-[10px] text-text-dim uppercase tracking-widest font-bold opacity-30">No Sessions</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
