import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.svg";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };

  const links = [
    { name: "Home", to: "/" },
    { name: "Rooms", to: "/rooms" },
    { name: "Menu", to: "/menu" },
    { name: "Reservations", to: "/reservations" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200" style={{ backgroundColor: 'var(--background-color)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <div className="section-container">
        <div className="flex items-center justify-between" style={{ height: '78px' }}>
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Food Zone" className="h-10 w-10 object-contain" />
            <span className="text-orange-500 font-display text-lg tracking-wide font-bold">
              FOOD ZONE
            </span>
          </Link>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-10 absolute left-1/2 transform -translate-x-1/2">
            {links.map((l) => (
              <Link key={l.name} to={l.to}
                className="text-gray-700 hover:text-orange-500 px-4 py-2 rounded-lg transition-all text-[16px] font-semibold">
                {l.name}
              </Link>
            ))}
          </nav>

          {/* Right: Desktop Auth */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5">
            {user ? (
              <>
                <span className="text-gray-700 text-[15px] font-medium">
                  Hi, {user.name?.split(" ")[0]}
                </span>
                <Link
                  to="/dashboard"
                  className="nav-dashboard-button px-5 py-2.5 rounded-lg text-[15px] font-bold"
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout}
                  className="px-5 py-2.5 border border-orange-500 text-orange-500 rounded-md text-[15px] font-bold hover:bg-orange-500 hover:text-white transition-colors cursor-pointer">
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <Link to="/login"
                  className="text-gray-700 hover:text-orange-500 text-[15px] font-medium transition-colors">
                  Login
                </Link>
                <Link to="/register"
                  className="nav-book-button px-6 py-3 border border-orange-500 text-orange-500 rounded-lg text-[15px] font-bold hover:bg-orange-500 hover:text-white transition-all">
                  Book Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-gray-700 p-2 rounded focus-ring" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden px-6 py-4 flex flex-col gap-4 border-t border-gray-200" style={{ backgroundColor: 'var(--background-color)' }}>
          {links.map((l) => (
            <Link key={l.name} to={l.to}
              className="text-gray-700 text-[16px] font-medium hover:text-orange-500 transition-colors"
              onClick={() => setOpen(false)}>
              {l.name}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/dashboard" className="nav-dashboard-button w-fit px-4 py-2 rounded-lg text-[16px] font-bold" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
              <button onClick={handleLogout} className="px-5 py-2.5 border border-orange-500 text-orange-500 rounded-md text-[15px] font-bold hover:bg-orange-500 hover:text-white transition-colors w-fit">
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 text-[16px]" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/register" className="px-5 py-2.5 border border-orange-500 text-orange-500 rounded-md text-[15px] font-bold hover:bg-orange-500 hover:text-white transition-colors w-fit" onClick={() => setOpen(false)}>
                Book Now
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
