import React, { useState } from 'react';
import { mockAssignments as initialAssignments } from '../../data/mockData';
import { Plus, MoreHorizontal, AlertCircle, Clock, CheckCircle2, ChevronRight, Trash2 } from 'lucide-react';

export const TaskView: React.FC = () => {
    const [tasks, setTasks] = useState(initialAssignments);

    const [isCreating, setIsCreating] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const toggleStatus = (id: string) => {
        setTasks(prev => prev.map(t => {
            if (t.id === id) {
                const nextStatus = t.status === 'completed' ? 'pending' : 'completed';
                return { ...t, status: nextStatus };
            }
            return t;
        }));
    };

    const handleCreateTask = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!newTaskTitle.trim()) {
            setIsCreating(false);
            return;
        }
        
        const newTask = {
            id: Date.now().toString(),
            title: newTaskTitle,
            subject: "SYSTEM",
            dueDate: "pending",
            status: "pending" as const,
            priority: "medium" as const
        };
        setTasks(prev => [...prev, newTask]);
        setNewTaskTitle('');
        setIsCreating(false);
    };

    const deleteTask = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const columns = [
        { id: 'pending', label: 'Pending Directives', icon: Clock, color: 'text-primary' },
        { id: 'completed', label: 'Archived / Complete', icon: CheckCircle2, color: 'text-green-500' },
        { id: 'overdue', label: 'Critical Overdue', icon: AlertCircle, color: 'text-red-500' }
    ];

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-700 h-full">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold tracking-tight uppercase tracking-widest">Task Matrix</h2>
                    <p className="text-xs text-text-dim font-mono">Central Objective Distribution • Nexus Core</p>
                </div>
                {isCreating ? (
                    <form onSubmit={handleCreateTask} className="flex flex-col sm:flex-row items-center gap-2">
                        <input 
                            autoFocus
                            value={newTaskTitle}
                            onChange={e => setNewTaskTitle(e.target.value)}
                            placeholder="DIRECTIVE_TITLE..."
                            className="bg-black/50 border border-primary/50 text-white px-3 py-1.5 rounded text-xs font-mono focus:outline-none focus:border-primary shadow-[0_0_15px_rgba(59,130,246,0.1)] w-full sm:w-auto"
                        />
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button type="button" onClick={() => setIsCreating(false)} className="px-2 py-1.5 text-xs text-text-dim hover:text-white transition-colors">Cancel</button>
                            <button type="submit" className="pro-button py-1.5 px-4 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:scale-105 transition-transform flex items-center justify-center gap-2 whitespace-nowrap">
                                <Plus className="w-3 h-3"/> Save
                            </button>
                        </div>
                    </form>
                ) : (
                    <button onClick={() => setIsCreating(true)} className="pro-button flex items-center justify-center gap-2 py-2 px-4 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-105 transition-transform w-[180px]">
                        <Plus className="w-4 h-4" /> Initialize Task
                    </button>
                )}
            </header>

            <div className="flex gap-6 h-full min-h-[600px] overflow-x-auto pb-6">
                {columns.map((col) => (
                    <div key={col.id} className="flex-1 min-w-[300px] flex flex-col gap-4">
                        <div className="flex items-center justify-between px-2 pb-2 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <col.icon className={`w-4 h-4 ${col.color}`} />
                                <span className="text-xs font-bold uppercase tracking-wider">{col.label}</span>
                                <span className="text-[10px] bg-white/5 py-0.5 px-2 rounded-full text-text-dim font-mono">
                                    {tasks.filter(a => a.status === col.id).length.toString().padStart(2, '0')}
                                </span>
                            </div>
                            <MoreHorizontal className="w-4 h-4 text-text-dim cursor-pointer hover:text-white transition-colors" />
                        </div>

                        <div className="flex-1 flex flex-col gap-3">
                            {tasks.filter(a => a.status === col.id).map((task) => (
                                <div 
                                    key={task.id} 
                                    onClick={() => toggleStatus(task.id)}
                                    className="pro-panel p-4 flex flex-col gap-4 group hover:border-white/20 transition-all cursor-pointer relative overflow-hidden"
                                >
                                    {/* Scanline Effect on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-20 -translate-y-full group-hover:animate-scanline pointer-events-none" />
                                    
                                    <div className="flex justify-between items-start relative z-10">
                                        <div className={`text-[10px] font-bold px-2 py-0.5 rounded border border-current uppercase tracking-tighter ${
                                            task.priority === 'high' ? 'text-red-400 opacity-80' : 
                                            task.priority === 'medium' ? 'text-yellow-400 opacity-80' : 'text-blue-400 opacity-80'
                                        }`}>
                                            {task.priority}_Priority
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-[10px] font-mono text-text-dim">{task.subject}</div>
                                            <button onClick={(e) => deleteTask(task.id, e)} className="p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-400 text-text-dim transition-all">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between gap-2 relative z-10">
                                        <div className="text-sm font-bold group-hover:text-primary transition-colors leading-relaxed">
                                            {task.title}
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-text-dim transition-transform group-hover:translate-x-1" />
                                    </div>
                                    
                                    <div className="flex items-center gap-4 border-t border-white/5 pt-3 relative z-10">
                                        <div className="flex items-center gap-1.5 text-[10px] text-text-dim uppercase font-bold tracking-tighter">
                                            <Clock className="w-3 h-3" /> {task.dueDate}
                                        </div>
                                        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full transition-all duration-1000 ${col.color.replace('text', 'bg')}`} 
                                                style={{ width: task.status === 'completed' ? '100%' : '30%' }} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* New Task Entry Placeholder */}
                            <div onClick={() => setIsCreating(true)} className="border border-dashed border-white/10 rounded-lg p-6 flex flex-col items-center justify-center gap-2 group hover:bg-white/5 hover:border-primary/30 transition-all cursor-pointer">
                                <Plus className="w-6 h-6 text-text-dim group-hover:text-primary transition-transform group-hover:scale-110" />
                                <span className="text-[10px] font-bold text-text-dim uppercase tracking-widest group-hover:text-primary">New_Directive</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
