import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.svg";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", role: "guest" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login({ email: form.email, password: form.password });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1920&q=80"
          alt="Restaurant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-8">
        
        {/* Login Card */}
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            style={{ boxShadow: "0 25px 70px rgba(0,0,0,0.4)" }}>
          
            {/* Header with Logo and Title */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-12 relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
              
              <div className="relative flex items-center gap-6">
                {/* Logo Container */}
                <div className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center shadow-xl flex-shrink-0">
                  <img src={logo} alt="Food Zone" className="w-20 h-20 object-contain" />
                </div>
                
                {/* Title */}
                <div className="flex-1 text-center">
                  <h1 className="text-5xl font-bold text-white mb-2">Sign In</h1>
                  <p className="text-white/90 text-lg">Welcome back to Food Zone</p>
                </div>
              </div>
            </div>

            {/* Form Body */}
            <div className="px-12 py-12">
              
              {/* Role Selection */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <label className="text-base font-bold text-gray-800">Select Role</label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "guest", label: "Guest", icon: "👤" },
                    { value: "admin", label: "Admin", icon: "🛡️" },
                  ].map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setForm({ ...form, role: r.value })}
                      className={`py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                        form.role === r.value
                          ? "bg-orange-500 text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span className="text-xl">{r.icon}</span>
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Email */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <label className="text-base font-bold text-gray-800">Email Address</label>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="cheemafaraz@gmail.com"
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <label className="text-base font-bold text-gray-800">Password</label>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className="w-full px-5 py-4 pr-14 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <p className="text-red-600 text-sm font-semibold">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-5 rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  {loading ? "Signing In..." : "Sign In →"}
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-base">
                    <span className="px-4 bg-white text-gray-500 font-semibold">or</span>
                  </div>
                </div>

                {/* Sign Up Link */}
                <Link
                  to="/register"
                  className="block w-full text-center py-5 border-3 border-orange-500 text-orange-500 rounded-2xl font-bold text-lg hover:bg-orange-50 transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ borderWidth: '3px' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Create New Account
                </Link>
              </form>

              {/* Footer */}
              <p className="text-center text-gray-500 text-sm font-semibold mt-6">
                Powered by Food Zone
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
