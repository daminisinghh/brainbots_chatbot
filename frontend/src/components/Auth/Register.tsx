import React, { useState } from 'react';
import { authAPI } from '../../api/api';
import { UserPlus } from 'lucide-react';

interface AuthProps {
  onSuccess: () => void;
  onToggle: () => void;
}

export const Register: React.FC<AuthProps> = ({ onSuccess, onToggle }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authAPI.register({ username, password });
      setSuccess(true);
      setTimeout(onSuccess, 2000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'REGISTRATION_FAILED');
    }
  };

  return (
    <div className="pro-panel bg-black/80 backdrop-blur-xl border-border p-12 max-w-md w-full shadow-2xl">
      <div className="text-center mb-10">
        <div className="w-12 h-12 bg-secondary/10 rounded flex items-center justify-center mx-auto mb-6 border border-secondary/20">
            <UserPlus className="text-secondary w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold tracking-tight mb-2">INITIALIZE IDENTITY</h2>
        <p className="text-[10px] text-text-dim uppercase font-bold tracking-widest">Enrollment Protocol</p>
      </div>

      {success ? (
        <div className="text-green-500 font-bold text-center p-12 bg-green-500/5 border border-green-500/20 uppercase tracking-widest text-[10px] animate-pulse">
            IDENTITY SYNCHRONIZED // REDIRECTING
        </div>
      ) : (
        <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-text-dim uppercase">Choose ID</span>
                <input 
                    className="pro-input" 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="new_operator_id"
                />
            </div>
            <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-text-dim uppercase">Generate Access Secret</span>
                <input 
                    className="pro-input" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                />
            </div>

            {error && <div className="text-accent text-[10px] font-bold text-center border border-accent/20 bg-accent/5 p-2 uppercase animate-pulse">{error}</div>}

            <button type="submit" className="pro-button mt-4 h-11 uppercase tracking-widest text-[10px]">Initialize Protocol</button>
        </form>
      )}

      {!success && (
        <div className="mt-8 text-center pt-8 border-t border-border">
            <button onClick={onToggle} className="text-[10px] font-bold text-text-dim hover:text-secondary transition-colors uppercase cursor-pointer">
                Existing Identity? Terminal Login
            </button>
        </div>
      )}
    </div>
  );
};
