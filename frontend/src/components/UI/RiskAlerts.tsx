import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import type { RiskAnalysis } from '../../logic/riskEngine';
import { motion } from 'framer-motion';

interface RiskAlertsProps {
    alerts: { subject: string; analysis: RiskAnalysis }[];
}

export const RiskAlerts: React.FC<RiskAlertsProps> = ({ alerts }) => {
    if (alerts.length === 0) return null;

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-dim">Neural_Risk_Assessment</span>
            </div>
            
            <div className="flex flex-col gap-3">
                {alerts.map((alert, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`pro-panel p-4 border-l-4 relative overflow-hidden group ${
                            alert.analysis.level === 'HIGH' ? 'border-l-red-500 bg-red-500/5' : 
                            alert.analysis.level === 'MEDIUM' ? 'border-l-yellow-500 bg-yellow-500/5' : 
                            'border-l-green-500 bg-green-500/5'
                        }`}
                    >
                        {/* Background Pulsing Glow for High Risk */}
                        {alert.analysis.level === 'HIGH' && (
                            <div className="absolute inset-0 bg-red-500/5 animate-pulse-glow pointer-events-none" />
                        )}

                        <div className="flex justify-between items-start relative z-10">
                            <div className="flex items-start gap-4">
                                <div className={`p-2 rounded ${
                                    alert.analysis.level === 'HIGH' ? 'bg-red-500/20 text-red-500' : 
                                    alert.analysis.level === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-500' : 
                                    'bg-green-500/20 text-green-500'
                                }`}>
                                    {alert.analysis.level === 'HIGH' ? <AlertCircle className="w-4 h-4" /> : 
                                     alert.analysis.level === 'MEDIUM' ? <AlertTriangle className="w-4 h-4" /> : 
                                     <CheckCircle2 className="w-4 h-4" />}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                        {alert.subject} 
                                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-black border ${
                                            alert.analysis.level === 'HIGH' ? 'border-red-500/30 text-red-500' : 
                                            alert.analysis.level === 'MEDIUM' ? 'border-yellow-500/30 text-yellow-500' : 
                                            'border-green-500/30 text-green-500'
                                        }`}>
                                            {alert.analysis.level}_RISK
                                        </span>
                                    </h4>
                                    <p className="text-[10px] text-text-dim mt-1 font-mono">
                                        ⚠️ Issue: {alert.analysis.reason}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 pl-12 relative z-10">
                            <div className="p-2.5 bg-black/40 border border-white/5 rounded-lg">
                                <p className="text-[10px] text-white/70 italic flex items-center gap-2">
                                    <ArrowRight className="w-3 h-3 text-primary" />
                                    AI Protocol: {alert.analysis.suggestion}
                                </p>
                            </div>
                        </div>

                        {/* Scanline Effect */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5 animate-scanline" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
