import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.svg";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    password: "", confirmPassword: "", role: "guest",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, phone: form.phone, password: form.password, role: "customer" });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell auth-register min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
          alt="Restaurant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/45 to-black/65"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl auth-card my-8">
          <div className="auth-surface bg-white rounded-[28px] shadow-[0_24px_70px_rgba(17,24,39,0.22)] border border-white/80 overflow-hidden transition-all duration-300 hover:shadow-[0_30px_85px_rgba(17,24,39,0.28)]">
            <div className="auth-header px-8 py-9 sm:px-12 sm:py-11 relative overflow-hidden ring-1 ring-orange-100 ring-inset">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

              <div className="relative flex flex-col items-center gap-4 text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-orange-50 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 ring-4 ring-orange-100">
                  <img src={logo} alt="Food Zone" className="w-12 h-12 sm:w-16 sm:h-16 object-contain" />
                </div>

                <div className="flex-1 text-center">
                  <h1 className="auth-title text-4xl sm:text-5xl font-black text-gray-900 leading-none mb-3 tracking-[-0.03em]">Create Account</h1>
                  <p className="text-gray-500 text-base sm:text-lg font-medium">Join Food Zone today</p>
                </div>
              </div>
            </div>

            <div className="auth-form-panel px-7 py-8 sm:px-12 sm:py-10 lg:px-14 lg:py-12">
              <div className="mb-8">
                <div className="flex items-center gap-2.5 mb-4 pl-2 text-orange-600">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <label className="text-lg font-bold text-gray-800">Select Role</label>
                </div>
                <div className="grid grid-cols-2 gap-5 pl-2 pr-2">
                  {[
                    { value: "guest", label: "Guest", icon: "👤" },
                    { value: "staff", label: "Staff", icon: "👔" },
                  ].map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setForm({ ...form, role: r.value })}
                      className={`py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 border border-orange-200 ${
                        form.role === r.value
                          ? "bg-white text-orange-600 shadow-lg scale-[1.01]"
                          : "bg-orange-50 text-orange-700 hover:bg-orange-100"
                      }`}
                    >
                      <span className="text-xl">{r.icon}</span>
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-3 pl-2 text-orange-600">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <label className="text-lg font-bold text-gray-800">Full Name</label>
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Muhammad Ali"
                    className="w-full px-5 py-4 bg-white/95 border-2 border-white rounded-2xl text-gray-900 text-base sm:text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all shadow-sm"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-3 pl-2 text-white">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <label className="text-lg font-bold text-white">Email Address</label>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="cheemafaraz@gmail.com"
                    className="w-full px-5 py-4 bg-white/95 border-2 border-white rounded-2xl text-gray-900 text-base sm:text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all shadow-sm"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-3 pl-2 text-white">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <label className="text-lg font-bold text-white">Phone Number</label>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+92 300 0000000"
                    className="w-full px-5 py-4 bg-white/95 border-2 border-white rounded-2xl text-gray-900 text-base sm:text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all shadow-sm"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-3 pl-2 text-white">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <label className="text-lg font-bold text-white">Password</label>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      placeholder="Min. 6 characters"
                      className="w-full px-5 py-4 pr-14 bg-white/95 border-2 border-white rounded-2xl text-gray-900 text-base sm:text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2.5 mb-3 pl-2 text-white">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <label className="text-lg font-bold text-white">Confirm Password</label>
                  </div>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="Re-enter password"
                      className="w-full px-5 py-4 pr-14 bg-white/95 border-2 border-white rounded-2xl text-gray-900 text-base sm:text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-600 transition-colors"
                    >
                      {showConfirm ? <EyeOff size={22} /> : <Eye size={22} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-red-600">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <p className="text-sm sm:text-base font-semibold">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-orange-600 py-4 rounded-2xl font-bold text-lg hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  {loading ? "Creating..." : "Create Account →"}
                </button>

                <div className="relative my-5 text-center text-white/90">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/40"></div>
                  </div>
                  <div className="relative inline-block bg-transparent px-3 text-base font-medium">or</div>
                </div>

                <Link
                  to="/login"
                  className="block w-full text-center py-4 border-2 border-white/80 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Already have an account? Sign In
                </Link>
              </form>

              <p className="text-center text-white/70 text-sm font-medium mt-6">
                Powered by Food Zone
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
