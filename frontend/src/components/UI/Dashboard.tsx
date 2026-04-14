import React, { useState, useEffect } from 'react';
import { mlAPI } from '../../api/api';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  CheckCircle2,
  Clock,
  Activity
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

// Mock historical & predicted data for chart
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
        console.error("ANALYSIS_LINK_ERROR");
      } finally {
        setLoading(false);
      }
    };
    fetchPrediction();
  }, []);

  // Update last data point based on backend prediction without mutating read-only objects
  const chartData = gpaHistoryData.map((item, index) => {
    if (index === 3 && prediction?.predicted_gpa) {
      return { ...item, gpa: parseFloat(prediction.predicted_gpa) };
    }
    return item;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* 3D Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* GPA Area Chart Panel */}
        <div className="pro-panel p-6 flex flex-col gap-4 min-h-[300px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                    <TrendingUp className="text-primary w-4 h-4" />
                    <span className="text-xs font-bold text-text-main uppercase tracking-wider">Predictive Trajectory</span>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold font-mono leading-none">{loading ? '--' : (prediction?.predicted_gpa || 'N/A')}</div>
                    <div className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Projected GPA</div>
                </div>
            </div>
            
            <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="term" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} domain={[2.0, 4.0]} />
                        <RechartsTooltip 
                            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '8px' }}
                            itemStyle={{ color: '#c4b5fd', fontSize: '12px', fontWeight: 'bold' }}
                            labelStyle={{ color: '#94a3b8', fontSize: '10px' }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="gpa" 
                            stroke="#8b5cf6" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorGpa)" 
                            activeDot={{ r: 6, fill: '#c4b5fd', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Stability Radar Chart Panel */}
        <div className="pro-panel p-6 flex flex-col gap-4 min-h-[300px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                    <Target className="text-cyan-400 w-4 h-4" />
                    <span className="text-xs font-bold text-text-main uppercase tracking-wider">Metrics radar</span>
                </div>
                <div className="text-right flex items-center gap-2">
                    {loading ? (
                        <span className="text-xs font-bold text-text-dim">ANALYZING</span>
                    ) : (
                        <span className={`badge ${prediction?.risk_level === 'Low' ? 'badge-success' : 'badge-warning'} uppercase`}>
                            {prediction?.risk_level}_RISK
                        </span>
                    )}
                </div>
            </div>

            <div className="flex-1 w-full relative left-[-15px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="75%" data={stabilityData}>
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="metric" tick={{ fill: '#cbd5e1', fontSize: 10, fontWeight: 'bold' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Metrics" dataKey="value" stroke="#06b6d4" strokeWidth={2} fill="#06b6d4" fillOpacity={0.3} />
                        <RechartsTooltip 
                            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '8px' }}
                            itemStyle={{ color: '#a5f3fc', fontSize: '12px', fontWeight: 'bold' }}
                            labelStyle={{ display: 'none' }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

      {/* Feature Row 2: Detailed Matrix & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Matrix */}
        <div className="pro-panel p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" /> Active Task Matrix
                </h3>
                <span className="text-[10px] font-bold text-text-dim px-2 py-1 bg-white/5 rounded-full">4 PENDING</span>
            </div>
            <div className="flex flex-col gap-3">
                {[
                    { t: 'Advanced Calculus III Mid-Term', d: 'Tomorrow, 10:00 AM', p: 'Critical', c: 'bg-red-500/20 text-red-400 border-red-500/30' },
                    { t: 'Project Alpha Documentation', d: 'In 2 hrs', p: 'High', c: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
                    { t: 'Physics Lab Report #04', d: 'In 1 day', p: 'Medium', c: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
                    { t: 'Network Layer Research', d: 'In 3 days', p: 'Low', c: 'bg-green-500/20 text-green-400 border-green-500/30' }
                ].map((item, i) => (
                    <div key={i} className="pro-card p-4 flex items-center justify-between group hover:border-white/20 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                <Clock className="w-4 h-4 text-text-dim group-hover:text-primary" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-white group-hover:text-primary transition-colors">{item.t}</div>
                                <div className="text-[10px] text-text-dim mt-1 font-mono tracking-wider">{item.d}</div>
                            </div>
                        </div>
                        <div className={`text-[10px] font-bold px-3 py-1 border rounded-full uppercase tracking-wider ${item.c}`}>
                            {item.p}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Neural Recommendations */}
        <div className="pro-panel p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Neural Directives
                </h3>
                <Activity className="text-text-dim w-4 h-4 animate-pulse" />
            </div>
            {loading ? (
                <div className="m-auto text-xs text-text-dim italic">Synthesizing directive stream...</div>
            ) : (
                <div className="flex flex-col gap-4">
                    {prediction?.recommendations?.map((rec: string, i: number) => (
                        <div key={i} className="flex gap-4 p-4 pro-card relative overflow-hidden group">
                            {/* Animated Background Sparkle */}
                            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 translate-x-10 group-hover:translate-x-0 transition-transform duration-500" />
                            
                            <div className="w-6 h-6 rounded bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                                <span className="text-[10px] font-bold text-cyan-400">{i+1}</span>
                            </div>
                            <p className="text-xs text-text-dim leading-relaxed font-medium z-10">
                                <span className="text-cyan-300 font-bold tracking-wider">SYS_OPT:</span> {rec}
                            </p>
                        </div>
                    )) || (
                        <div className="m-auto text-xs text-text-dim italic">No recommendations available at this time.</div>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

