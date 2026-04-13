import React, { useState } from 'react';
import { authAPI } from '../../api/api';
import { Shield } from 'lucide-react';

interface AuthProps {
  onSuccess: (token: string) => void;
  onToggle: () => void;
}

export const Login: React.FC<AuthProps> = ({ onSuccess, onToggle }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      
      const res = await authAPI.login(formData);
      localStorage.setItem('token', res.data.access_token);
      onSuccess(res.data.access_token);
    } catch (err) {
      setError('AUTHENTICATION_FAILED // INVALID_CREDENTIALS');
    }
  };

  return (
    <div className="pro-panel bg-black/80 backdrop-blur-xl border-border p-12 max-w-md w-full shadow-2xl">
      <div className="text-center mb-10">
        <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mx-auto mb-6 border border-primary/20">
            <Shield className="text-primary w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold tracking-tight mb-2">ZENITH PRO LOGIN</h2>
        <p className="text-[10px] text-text-dim uppercase font-bold tracking-widest">Secure Operator Authentication</p>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-text-dim uppercase">Credential ID</span>
            <input 
                className="pro-input" 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="operator_root"
            />
        </div>
        <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-text-dim uppercase">Access Secret</span>
            <input 
                className="pro-input" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
            />
        </div>

        {error && <div className="text-accent text-[10px] font-bold text-center border border-accent/20 bg-accent/5 p-2 uppercase animate-pulse">{error}</div>}

        <button type="submit" className="pro-button mt-4 h-11 uppercase tracking-widest text-[10px]">Establish Secure Link</button>
      </form>

      <div className="mt-8 text-center pt-8 border-t border-border">
        <button onClick={onToggle} className="text-[10px] font-bold text-text-dim hover:text-primary transition-colors uppercase cursor-pointer">
            Create System Identity
        </button>
      </div>
    </div>
  );
};
