import React, { useState, useEffect } from 'react';
import { mlAPI } from '../../api/api';
import { 
  Calendar, 
  CheckCircle2,
  Clock,
  Activity,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { mockAssignments } from '../../data/mockData';

const gpaHistoryData = [
  { term: 'Fall 2024', gpa: 3.1 },
  { term: 'Spr 2025', gpa: 3.3 },
  { term: 'Fall 2025', gpa: 3.6 },
  { term: 'Spr 2026', gpa: 3.8, isPrediction: true },
];

const stabilityData = [
  { metric: 'Attendance', value: 88, fullMark: 100 },
  { metric: 'Assignments', value: 85, fullMark: 100 },
  { metric: 'Exams', value: 92, fullMark: 100 },
  { metric: 'Engagement', value: 75, fullMark: 100 },
  { metric: 'Focus', value: 82, fullMark: 100 },
];

export const Dashboard: React.FC = () => {
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const res = await mlAPI.predict({
          attendance_rate: 0.88,
          assignment_score: 85.5,
          study_hours_weekly: 20.0,
          extracurricular_hours: 5.0,
          previous_gpa: 3.6
        });
        setPrediction(res.data);
      } catch {
        setPrediction({
            predicted_gpa: "3.85",
            risk_level: "Low",
            recommendations: [
                "Increase study hours by 2h/week for optimization",
                "Maintain high performance in upcoming mid-terms",
                "Explore additional research papers in Discrete Mathematics"
            ]
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPrediction();
  }, []);

  const chartData = gpaHistoryData.map((item, index) => {
    if (index === 3 && prediction?.predicted_gpa) {
      return { ...item, gpa: parseFloat(prediction.predicted_gpa) };
    }
    return item;
  });

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-1000">
      {/* Top HUD Core Status Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="pro-panel p-4 flex items-center justify-between border-primary/20 bg-primary/5">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                    <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                   <span className="text-[9px] font-black text-text-dim uppercase tracking-widest">Neural_Core</span>
                   <div className="text-xs font-bold text-white uppercase">Active_Sync</div>
                </div>
            </div>
            <span className="text-[10px] font-mono text-primary font-bold">STABLE</span>
        </div>
        
        <div className="pro-panel p-4 flex items-center justify-between border-cyan-500/20 bg-cyan-500/5">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 rounded shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                   <span className="text-[9px] font-black text-text-dim uppercase tracking-widest">Encrypted_IO</span>
                   <div className="text-xs font-bold text-white uppercase">Protected</div>
                </div>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 font-bold">128-BIT</span>
        </div>

        <div className="pro-panel p-4 flex items-center justify-between border-violet-500/20 bg-violet-500/5">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-violet-500/20 rounded shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                    <Activity className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                   <span className="text-[9px] font-black text-text-dim uppercase tracking-widest">Signal_Load</span>
                   <div className="text-xs font-bold text-white uppercase">Nominal</div>
                </div>
            </div>
            <span className="text-[10px] font-mono text-violet-400 font-bold">14.2%</span>
        </div>
      </div>

      {/* 3D Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="pro-panel p-6 flex flex-col gap-4 min-h-[300px] group transition-all duration-500 hover:border-primary/30">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-text-main uppercase tracking-[0.2em]">Predictive Trajectory</span>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-black font-mono leading-none text-glow text-primary">{loading ? '--' : (prediction?.predicted_gpa || 'N/A')}</div>
                    <div className="text-[8px] text-text-dim font-bold uppercase tracking-widest mt-1">Projected_Outcome</div>
                </div>
            </div>
            
            <div className="h-[200px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="term" stroke="#334155" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#334155" fontSize={10} tickLine={false} axisLine={false} domain={[2.0, 4.0]} />
                        <RechartsTooltip 
                            contentStyle={{ backgroundColor: 'rgba(10,10,12,0.9)', border: '1px solid rgba(59, 130, 246, 0.4)', borderRadius: '8px', backdropFilter: 'blur(12px)' }}
                            itemStyle={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                            labelStyle={{ color: '#64748b', fontSize: '9px', fontWeight: 'bold', marginBottom: '4px' }}
                        />
                        <Area 
                            type="monotoneX" 
                            dataKey="gpa" 
                            stroke="#3b82f6" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorGpa)" 
                            activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="pro-panel p-6 flex flex-col gap-4 min-h-[300px] group transition-all duration-500 hover:border-cyan-500/30">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-text-main uppercase tracking-[0.2em]">Efficiency Radar</span>
                </div>
                <div className="text-right">
                    {loading ? (
                        <div className="text-[10px] font-black text-text-dim animate-pulse uppercase tracking-widest">Analyzing...</div>
                    ) : (
                        <span className={`px-3 py-1 text-[9px] font-black rounded border tracking-widest ${
                            prediction?.risk_level === 'Low' 
                            ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                        } uppercase shadow-[0_0_15px_rgba(34,197,94,0.1)]`}>
                            {prediction?.risk_level}_RISK_PROFILE
                        </span>
                    )}
                </div>
            </div>

            <div className="h-[200px] w-full relative left-[-15px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={stabilityData}>
                        <PolarGrid stroke="#1e293b" />
                        <PolarAngleAxis dataKey="metric" tick={{ fill: '#64748b', fontSize: 9, fontWeight: 'bold' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Metrics" dataKey="value" stroke="#06b6d4" strokeWidth={2} fill="#06b6d4" fillOpacity={0.2} />
                        <RechartsTooltip 
                            contentStyle={{ backgroundColor: 'rgba(10,10,12,0.9)', border: '1px solid rgba(6, 182, 212, 0.4)', borderRadius: '8px', backdropFilter: 'blur(12px)' }}
                            itemStyle={{ color: '#06b6d4', fontSize: '11px', fontWeight: 'bold' }}
                            labelStyle={{ display: 'none' }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

      {/* Feature Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="pro-panel p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" /> Active_Task_Matrix
                </h3>
                <span className="text-[8px] font-black text-primary px-2 py-1 bg-primary/10 border border-primary/20 rounded lowercase">4_pending_ops</span>
            </div>
            <div className="flex flex-col gap-3 px-1">
                {mockAssignments.slice(0, 4).map((item, i) => (
                    <div key={i} className="pro-panel p-4 flex items-center justify-between group cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
                                <Clock className="w-3.5 h-3.5 text-text-dim group-hover:text-primary transition-colors" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-white group-hover:text-primary transition-colors uppercase tracking-tight">{item.title}</div>
                                <div className="text-[9px] text-text-dim mt-0.5 font-mono tracking-widest opacity-60">ETD: {item.dueDate}</div>
                            </div>
                        </div>
                        <div className={`text-[8px] font-black px-2 py-1 border rounded transition-all duration-300 ${
                            item.priority === 'high' 
                            ? 'bg-red-500/10 text-red-500 border-red-500/20 group-hover:border-red-500 group-hover:bg-red-500/20' 
                            : 'bg-primary/10 text-primary border-primary/20 group-hover:border-primary group-hover:bg-primary/20'
                        } uppercase tracking-widest`}>
                            {item.priority}_PRI
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="pro-panel p-6 flex flex-col gap-6 border-cyan-500/10">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Neural_Directives
                </h3>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-cyan-400/5 border border-cyan-400/20 rounded">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
                    <span className="text-[8px] font-black text-cyan-400 lowercase tracking-widest">stream_active</span>
                </div>
            </div>
            {loading ? (
                <div className="m-auto text-[10px] text-text-dim font-bold uppercase tracking-[0.3em] animate-pulse">Synthesizing...</div>
            ) : (
                <div className="flex flex-col gap-3">
                    {prediction?.recommendations?.map((rec: string, i: number) => (
                        <div key={i} className="flex gap-4 p-4 pro-panel relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500 border-white/5">
                            {/* Animated Background Shimmer */}
                            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-cyan-400/5 to-transparent skew-x-12 translate-x-16 group-hover:translate-x-0 transition-transform duration-700" />
                            
                            <div className="w-6 h-6 rounded bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)] group-hover:border-cyan-400/40">
                                <span className="text-[9px] font-black text-cyan-400">{i+1}</span>
                            </div>
                            <p className="text-[11px] text-text-dim leading-relaxed font-bold z-10 group-hover:text-white transition-colors">
                                <span className="text-cyan-400 tracking-widest opacity-60 mr-2">OP:</span> {rec}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

