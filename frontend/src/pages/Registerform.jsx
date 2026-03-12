import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { registerUser } from "../services/api";

function Registerform({ prefillEmail = '', onBack }) {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: '', email: prefillEmail, password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    setLoading(true);
    try {
      const res = await registerUser({
        username: form.username,
        email: form.email,
        password: form.password
      });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      // await login({ email: form.email, password: form.password });
      await onBack();
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F0F4F8] p-4 font-sans text-slate-800">
      <div className="bg-white w-full max-w-[520px] p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white">
        
        {/* Icon Container */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-[1.5rem] flex items-center justify-center -rotate-3 transition-transform hover:rotate-0">
            <span className="text-3xl rotate-3">✨</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Account</h2>
          <p className="text-slate-400 text-sm mt-2 font-medium text-center">Join ChitChatCode and start talking today.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-2xl border border-red-100 text-center animate-in fade-in zoom-in duration-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 ml-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="panda_dev"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 rounded-2xl bg-[#F8FAFC] border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none placeholder:text-slate-300 shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 ml-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="panda@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 rounded-2xl bg-[#F8FAFC] border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none placeholder:text-slate-300 shadow-sm"
            />
          </div>

          {/* Side-by-Side Password Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 ml-1 text-center sm:text-left">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-2xl bg-[#F8FAFC] border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none placeholder:text-slate-300 shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 ml-1 text-center sm:text-left">Confirm</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-2xl bg-[#F8FAFC] border-2 border-transparent focus:border-indigo-500 focus:bg-white transition-all outline-none placeholder:text-slate-300 shadow-sm"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 px-6 font-bold rounded-2xl transition-all mt-6 flex items-center justify-center gap-2 shadow-lg ${
              loading 
                ? 'bg-indigo-300 text-white cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25 active:scale-[0.98]'}`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : "Register"}
          </button>
        </form>

        <div className="mt-10 text-center text-sm text-slate-500 font-medium">
          Already have an account?{" "}
          <button onClick={onBack} className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors underline-offset-4 hover:underline">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registerform;