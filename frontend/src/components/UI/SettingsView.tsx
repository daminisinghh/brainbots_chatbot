import React, { useState } from 'react';
import { Settings, Shield, Palette, LogOut, Terminal, CheckCircle } from 'lucide-react';

export const SettingsView: React.FC = () => {
    const [glassIntensity, setGlassIntensity] = useState(35);
    const [aiConfidence, setAiConfidence] = useState(85);
    const [twoFactor, setTwoFactor] = useState(true);
    const [keyRotation, setKeyRotation] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleApply = () => {
        setIsSaving(true);
        // Simulate a system update
        setTimeout(() => {
            setIsSaving(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 800);
    };

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-700 pb-12">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold tracking-tight uppercase tracking-widest flex items-center gap-3">
                        <Settings className="text-primary" /> System Preferences
                    </h2>
                    <p className="text-xs text-text-dim">Nexus Configuration • User Personalization</p>
                </div>
                <div className="flex items-center gap-4">
                    {showSuccess && (
                        <div className="flex items-center gap-2 text-green-400 text-[10px] font-bold uppercase animate-in zoom-in fade-in">
                            <CheckCircle className="w-3 h-3" /> Preferences_Cached
                        </div>
                    )}
                    <button 
                        onClick={handleApply} 
                        disabled={isSaving}
                        className={`pro-button py-2 px-6 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSaving ? 'SYNCING...' : 'Apply Changes'}
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Security Section */}
                <div className="pro-panel p-6 flex flex-col gap-6">
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold uppercase tracking-widest">Security & Protocol</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Two-Factor Authentication</h4>
                                <p className="text-[10px] text-text-dim">Secure terminal logins with secondary tokens</p>
                            </div>
                            <div 
                                onClick={() => setTwoFactor(!twoFactor)}
                                className={`w-10 h-5 rounded-full relative cursor-pointer border transition-all duration-300 ${
                                    twoFactor ? 'bg-primary/20 border-primary/30' : 'bg-white/5 border-white/10'
                                }`}
                            >
                                <div className={`absolute top-1 w-3 h-3 rounded-full transition-all duration-300 ${
                                    twoFactor ? 'right-1 bg-primary' : 'left-1 bg-text-dim'
                                }`} />
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Neural Key Rotation</h4>
                                <p className="text-[10px] text-text-dim">Rotate AI authentication keys every 30 days</p>
                            </div>
                            <div 
                                onClick={() => setKeyRotation(!keyRotation)}
                                className={`w-10 h-5 rounded-full relative cursor-pointer border transition-all duration-300 ${
                                    keyRotation ? 'bg-primary/20 border-primary/30' : 'bg-white/5 border-white/10'
                                }`}
                            >
                                <div className={`absolute top-1 w-3 h-3 rounded-full transition-all duration-300 ${
                                    keyRotation ? 'right-1 bg-primary' : 'left-1 bg-text-dim'
                                }`} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Aesthetic Section */}
                <div className="pro-panel p-6 flex flex-col gap-6">
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                        <Palette className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-bold uppercase tracking-widest">Aesthetic Interface</span>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-[10px] font-bold text-text-dim uppercase">
                                <span>Glassmorphism Density</span>
                                <span>{glassIntensity}%</span>
                            </div>
                            <input 
                                type="range" 
                                className="w-full accent-primary bg-white/5 h-1 rounded-full appearance-none" 
                                value={glassIntensity}
                                onChange={(e) => setGlassIntensity(parseInt(e.target.value))}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-[10px] font-bold text-text-dim uppercase">
                                <span>AI Response Confidence Filter</span>
                                <span>{aiConfidence}% Threshold</span>
                            </div>
                            <input 
                                type="range" 
                                className="w-full accent-cyan-400 bg-white/5 h-1 rounded-full appearance-none" 
                                value={aiConfidence}
                                onChange={(e) => setAiConfidence(parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                </div>

                {/* Profile Section */}
                <div className="pro-panel p-6 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-xl font-bold text-primary">
                        D
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-bold">daminisinghh</h4>
                        <p className="text-[10px] text-text-dim uppercase tracking-widest font-mono">System Operator • ID_78422</p>
                    </div>
                    <button className="p-3 pro-panel bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/30">
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>

                <div className="pro-panel p-6 bg-black/40 border-primary/20 flex flex-col items-center justify-center gap-4">
                    <Terminal className="text-primary w-8 h-8 opacity-20" />
                    <p className="text-[10px] text-text-dim text-center uppercase tracking-[0.3em] font-bold">
                        Command Terminal Protocol: <span className="text-primary">ENCRYPTED</span>
                    </p>
                </div>
            </div>
        </div>
    );
};
