import React from 'react';
import { mockAssignments } from '../../data/mockData';
import { Plus, MoreHorizontal, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

export const TaskView: React.FC = () => {
    const columns = [
        { id: 'pending', label: 'Pending Directives', icon: Clock, color: 'text-primary' },
        { id: 'completed', label: 'Archived / Complete', icon: CheckCircle2, color: 'text-green-500' },
        { id: 'overdue', label: 'Critical Overdue', icon: AlertCircle, color: 'text-red-500' }
    ];

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-700 h-full">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold tracking-tight uppercase tracking-widest">Task Matrix</h2>
                    <p className="text-xs text-text-dim font-mono">Central Objective Distribution • Nexus Core</p>
                </div>
                <button className="pro-button flex items-center gap-2 py-2 px-4">
                    <Plus className="w-4 h-4" /> Initialize Task
                </button>
            </header>

            <div className="flex gap-6 h-full min-h-[600px] overflow-x-auto pb-6">
                {columns.map((col) => (
                    <div key={col.id} className="flex-1 min-w-[300px] flex flex-col gap-4">
                        <div className="flex items-center justify-between px-2 pb-2 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <col.icon className={`w-4 h-4 ${col.color}`} />
                                <span className="text-xs font-bold uppercase tracking-wider">{col.label}</span>
                                <span className="text-[10px] bg-white/5 py-0.5 px-2 rounded-full text-text-dim">
                                    {mockAssignments.filter(a => a.status === col.id).length}
                                </span>
                            </div>
                            <MoreHorizontal className="w-4 h-4 text-text-dim cursor-pointer" />
                        </div>

                        <div className="flex-1 flex flex-col gap-3">
                            {mockAssignments.filter(a => a.status === col.id).map((task) => (
                                <div key={task.id} className="pro-panel p-4 flex flex-col gap-4 group hover:border-white/20 transition-all cursor-pointer">
                                    <div className="flex justify-between items-start">
                                        <div className={`text-[10px] font-bold px-2 py-0.5 rounded border border-current uppercase tracking-tighter ${
                                            task.priority === 'high' ? 'text-red-400 opacity-80' : 
                                            task.priority === 'medium' ? 'text-yellow-400 opacity-80' : 'text-blue-400 opacity-80'
                                        }`}>
                                            {task.priority}_Priority
                                        </div>
                                        <div className="text-[10px] font-mono text-text-dim">{task.subject}</div>
                                    </div>
                                    
                                    <div className="text-sm font-bold group-hover:text-primary transition-colors leading-relaxed">
                                        {task.title}
                                    </div>
                                    
                                    <div className="flex items-center gap-4 border-t border-white/5 pt-3">
                                        <div className="flex items-center gap-1.5 text-[10px] text-text-dim uppercase font-bold tracking-tighter">
                                            <Clock className="w-3 h-3" /> Due {task.dueDate}
                                        </div>
                                        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className={`h-full ${col.color.replace('text', 'bg')}`} style={{ width: '40%' }} />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* New Task Entry Placeholder */}
                            <div className="border border-dashed border-white/5 rounded-lg p-4 flex items-center justify-center group hover:bg-white/5 transition-all cursor-pointer">
                                <Plus className="w-4 h-4 text-text-dim group-hover:text-primary transition-colors" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
