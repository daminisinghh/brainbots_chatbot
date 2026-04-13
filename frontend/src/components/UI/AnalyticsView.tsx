import React from 'react';
import { BrainCircuit, Cpu, Database, Activity, ShieldCheck, Zap } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-700 h-full">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold tracking-tight uppercase tracking-widest flex items-center gap-3">
                        <BrainCircuit className="text-primary" /> AI Analytics Engine
                    </h2>
                    <p className="text-xs text-text-dim">Nexus Neural Core • Live Telemetry Stream</p>
                </div>
                <div className="badge badge-success flex items-center gap-2">
                    <Zap className="w-3 h-3" /> System Synchronized
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {[
                    { l: 'Neural Load', v: '14.2%', i: Cpu },
                    { l: 'Data Throughput', v: '850 MB/s', i: Database },
                    { l: 'Prediction Latency', v: '12ms', i: Activity },
                    { l: 'Core Security', v: 'Active', i: ShieldCheck }
                ].map((stat, i) => (
                    <div key={i} className="pro-panel p-5 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-text-dim font-bold text-[10px] uppercase tracking-wider">
                            <stat.i className="w-3 h-3 text-primary" /> {stat.l}
                        </div>
                        <div className="text-xl font-mono font-bold tracking-tighter text-white">
                            {stat.v}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
                <div className="pro-panel p-6 bg-black/40 flex flex-col gap-4">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-text-dim mb-2 border-b border-white/5 pb-2">Neural Signal Stream</h3>
                    <div className="flex-1 font-mono text-[10px] text-primary/70 leading-relaxed overflow-hidden opacity-50">
                        {`> INITIALIZING_NEURAL_CORE... OK
> LOADING_DATASET: STUDENT_ENGAGEMENT_V4... OK
> CALIBRATING_WEIGHTS... DONE
> SYNERGY_LOG_SIGNAL_DETECTED: ACCURATE_TARGET_ACQUISITION
> BROADCASTING_UI_STATE: SYNCED
> [SYSTEM_INFO] - Latency stabilized at 12ms.
> [WARNING] - Minor packet loss in "Discrete Mathematics" channel.
> [SUCCESS] - Attendance trajectory updated to 82.4%.
> MONITORING_USER_INPUT_CURSOR_PATH...
> DATA_REFRESH_IN_300ms...
> RE-ESTABLISHING_TLS_HANDSHAKE... OK`}
                    </div>
                </div>

                <div className="pro-panel p-6 bg-primary/5 flex flex-col gap-6 justify-center items-center text-center">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin duration-[4s]" />
                        <BrainCircuit className="w-12 h-12 text-primary drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest text-white">Cognitive Load: Balanced</h4>
                        <p className="text-[10px] text-text-dim mt-2 max-w-[200px]">The AI assistant is currently operating at optimal efficiency using 4.2GB of allocated VRAM.</p>
                    </div>
                    <button className="pro-button py-2 px-6 text-[10px] uppercase font-bold tracking-widest">Re-Calibrate Engine</button>
                </div>
            </div>
        </div>
    );
};
