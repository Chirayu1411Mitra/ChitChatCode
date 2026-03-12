import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Registerform from './Registerform';
import { loginUser } from "../services/api";

function Loginform() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [prefillEmail, setPrefillEmail] = useState('');

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(form);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      await login(user);
    } catch (err) {
      if (err.response?.status === 404) {
        setPrefillEmail(form.email);
        setShowRegister(true);
      } else {
        setError("Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (showRegister) return <Registerform prefillEmail={prefillEmail} onBack={() => setShowRegister(false)} />;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F0F4F8] p-4 font-sans text-slate-800">
      <div className="bg-white w-full max-w-[480px] p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white">
        
        {/* Animated Icon Container */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-[1.5rem] flex items-center justify-center rotate-3 transition-transform hover:rotate-0">
            <span className="text-3xl -rotate-3">💬</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back</h2>
          <p className="text-slate-400 text-sm mt-2 font-medium">Enter your details to access your chats.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-2xl border border-red-100 text-center animate-in fade-in zoom-in duration-300">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 ml-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="panda@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 rounded-2xl bg-[#F8FAFC] border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all outline-none placeholder:text-slate-300 shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="block text-sm font-bold text-slate-700">Password</label>
              <button type="button" className="text-xs font-bold text-blue-500 hover:text-blue-600">Forgot?</button>
            </div>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 rounded-2xl bg-[#F8FAFC] border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all outline-none placeholder:text-slate-300 shadow-sm"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 px-6 font-bold rounded-2xl transition-all mt-4 flex items-center justify-center gap-2 shadow-lg ${
              loading 
                ? 'bg-blue-300 text-white cursor-not-allowed' 
                : 'bg-[#4285F4] hover:bg-[#3b77db] text-white shadow-blue-500/25 active:scale-[0.98]'}`}
          >
            {loading ? (
               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : "Login Now"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-10 text-center text-sm text-slate-500 font-medium">
          Don’t have an account?{" "}
          <button onClick={() => setShowRegister(true)} className="text-blue-500 font-bold hover:text-blue-600 transition-colors underline-offset-4 hover:underline">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Loginform;