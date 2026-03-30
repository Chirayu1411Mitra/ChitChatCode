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
    <div className="min-h-screen w-full flex bg-[#F8FAFC] font-sans selection:bg-[#8a1c7c]/30">
      
      {/* Left Side - Interactive Branding Panel */}
      <div className="hidden lg:flex relative w-1/2 bg-[linear-gradient(135deg,#2a0a5e,#8a1c7c,#11a09d)] overflow-hidden items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute w-[35rem] h-[35rem] bg-white/10 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite] top-[-10%] left-[-15%]"></div>
        <div className="absolute w-[45rem] h-[45rem] bg-[#11a09d]/20 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite] bottom-[-20%] right-[-10%]"></div>
        
        {/* Glassmorphism Decorative Card */}
        <div className="relative z-10 flex flex-col items-center text-center px-12 transform hover:scale-105 transition-transform duration-700">
          <div className="w-32 h-32 bg-white/20 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center mb-10 shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white/30 animate-bounce" style={{ animationDuration: '4s' }}>
            {/* ADD PATH TO LOGO.PNG HERE IN THE SRC ATTRIBUTE */}
            <img src="/path/to/logo.png" alt="Logo" className="w-16 h-16 object-contain drop-shadow-md" />
          </div>
          <h1 className="text-5xl font-extrabold mb-6 text-white drop-shadow-sm tracking-tight">Join the Network</h1>
          <p className="text-xl font-medium text-white/90 drop-shadow-sm max-w-md leading-relaxed">
            Create an account to start experiencing seamless communication.
          </p>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
        
        {/* Mobile decorative blobs */}
        <div className="absolute lg:hidden w-72 h-72 bg-[#8a1c7c]/10 rounded-full blur-3xl top-0 right-0 pointer-events-none"></div>
        <div className="absolute lg:hidden w-72 h-72 bg-[#11a09d]/10 rounded-full blur-3xl bottom-0 left-0 pointer-events-none"></div>

        <div className="w-full max-w-[520px] relative z-10 bg-white/90 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(42,10,94,0.1)] border border-white/60">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#111827] mb-2 tracking-tight">Create Account</h2>
            <p className="text-[#6B7280] font-medium text-sm">Join ChitChatCode and start talking today.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-100 rounded-2xl text-center text-sm text-red-500 animate-in fade-in zoom-in duration-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Username */}
            <div className="space-y-2 group">
              <label className="block text-sm font-bold text-[#374151] ml-2 transition-colors group-focus-within:text-[#371285]">Username</label>
              <input
                type="text"
                name="username"
                placeholder="panda_dev"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-[1.5rem] bg-[#F9FAFB] border-2 border-[#E5E7EB] focus:border-[#371285] focus:bg-white focus:ring-4 focus:ring-[#371285]/10 transition-all duration-300 outline-none placeholder:text-[#9CA3AF] text-[#111827] font-medium hover:border-[#D1D5DB]"
              />
            </div>

            {/* Email */}
            <div className="space-y-2 group">
              <label className="block text-sm font-bold text-[#374151] ml-2 transition-colors group-focus-within:text-[#371285]">Email</label>
              <input
                type="email"
                name="email"
                placeholder="panda@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-[1.5rem] bg-[#F9FAFB] border-2 border-[#E5E7EB] focus:border-[#371285] focus:bg-white focus:ring-4 focus:ring-[#371285]/10 transition-all duration-300 outline-none placeholder:text-[#9CA3AF] text-[#111827] font-medium hover:border-[#D1D5DB]"
              />
            </div>

            {/* Side-by-Side Password Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Password */}
              <div className="space-y-2 group">
                <label className="block text-sm font-bold text-[#374151] ml-2 transition-colors group-focus-within:text-[#371285]">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 rounded-[1.5rem] bg-[#F9FAFB] border-2 border-[#E5E7EB] focus:border-[#371285] focus:bg-white focus:ring-4 focus:ring-[#371285]/10 transition-all duration-300 outline-none placeholder:text-[#9CA3AF] text-[#111827] font-medium tracking-widest hover:border-[#D1D5DB]"
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2 group">
                <label className="block text-sm font-bold text-[#374151] ml-2 transition-colors group-focus-within:text-[#371285]">Confirm</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 rounded-[1.5rem] bg-[#F9FAFB] border-2 border-[#E5E7EB] focus:border-[#371285] focus:bg-white focus:ring-4 focus:ring-[#371285]/10 transition-all duration-300 outline-none placeholder:text-[#9CA3AF] text-[#111827] font-medium tracking-widest hover:border-[#D1D5DB]"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 font-bold rounded-[1.5rem] transition-all duration-300 mt-8 flex items-center justify-center gap-2 shadow-[0_10px_20px_-10px_rgba(55,18,133,0.5)] ${
                loading
                  ? 'bg-[#E6E6E6] text-[#A6A6A6] cursor-not-allowed shadow-none'
                  : 'bg-[#371285] hover:bg-[#2a0a5e] text-white hover:-translate-y-1 active:translate-y-0 active:scale-95'
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#1E293B]/40 border-t-[#1E293B] rounded-full animate-spin"></div>
              ) : "Register"}
            </button>

          </form>

          <div className="mt-10 text-center text-sm text-[#6B7280] font-medium">
            Already have an account?
            <button
              onClick={onBack}
              className="ml-2 text-[#371285] font-bold hover:text-[#8a1c7c] transition-colors hover:underline underline-offset-4"
            >
              Login
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Registerform;