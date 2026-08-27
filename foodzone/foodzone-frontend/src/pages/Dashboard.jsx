import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  Calendar,
  Bed,
  Utensils,
  Wallet,
  UtensilsCrossed,
  BedDouble,
  BookOpen,
  ChevronRight,
  Bell,
  Search,
  Sparkles,
  CircleUserRound,
  Clock3,
  MapPin,
  Phone,
  Mail,
  Menu as MenuIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { bookingAPI, menuAPI, roomAPI } from "../services/api";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dashboardRooms, setDashboardRooms] = useState([]);
  const [dashboardMenu, setDashboardMenu] = useState([]);

  const previewUser = user || {
    name: "Faraz",
    email: "faraz@foodzone.com",
    phone: "+92 300 0000000",
    role: "admin",
  };

  useEffect(() => {
    Promise.all([roomAPI.getAll(), menuAPI.getAll()])
      .then(([rooms, menu]) => {
        setDashboardRooms(rooms);
        setDashboardMenu(menu);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!user) {
      setBookings([
        { _id: "demo-1", bookingType: "room", status: "confirmed", checkIn: "2025-08-26T15:30:00", totalAmount: 4500 },
        { _id: "demo-2", bookingType: "table", status: "pending", reservationTime: "2025-08-27T20:00:00", totalAmount: 3200 },
        { _id: "demo-3", bookingType: "room", status: "confirmed", checkIn: "2025-08-28T18:00:00", totalAmount: 6000 },
      ]);
      setLoadingBookings(false);
      return;
    }

    bookingAPI
      .getMine()
      .then(setBookings)
      .catch(() => setBookings([]))
      .finally(() => setLoadingBookings(false));
  }, [user]);

  const initial = (previewUser.name || "G").trim().charAt(0).toUpperCase();
  const activeBookings = bookings.filter((b) => b.status === "confirmed").length;
  const totalRooms = bookings.filter((b) => b.bookingType === "room" && b.status !== "cancelled").length;
  const totalDining = bookings.filter((b) => b.bookingType === "table" && b.status !== "cancelled").length;
  const totalSpent = bookings.filter((b) => b.status !== "cancelled").reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  const fallbackMenu = [
    { name: "Grilled Salmon", desc: "Fresh salmon with herbs and lemon butter sauce", price: 2450, img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&q=80" },
    { name: "Fettuccine Alfredo", desc: "Creamy Alfredo pasta with grilled chicken", price: 1750, img: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=200&q=80" },
    { name: "Chocolate Lava Cake", desc: "Warm chocolate cake with vanilla ice cream", price: 950, img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=200&q=80" },
  ];

  const popularMenu = (dashboardMenu.length ? dashboardMenu : fallbackMenu).slice(0, 3).map((item) => ({
    name: item.name,
    desc: item.description || item.desc,
    price: item.price,
    img: item.image || item.img,
  }));

  const stats = [
    { label: "Total Rooms", value: dashboardRooms.length, detail: "Available in system", accent: "orange", icon: Calendar },
    { label: "Total Bookings", value: bookings.length, detail: `${activeBookings} confirmed`, accent: "blue", icon: Bed },
    { label: "Total Customers", value: totalDining, detail: "Dining reservations", accent: "purple", icon: Utensils },
    { label: "Total Revenue", value: `PKR ${(totalSpent / 1000).toFixed(1)}k`, detail: "From your bookings", accent: "green", icon: Wallet },
  ];

  const actions = [
    { label: "Reserve Dining", sub: "Book a timed table", path: "/reservations", tone: "orange", icon: UtensilsCrossed },
    { label: "Book a Room", sub: "Plan your next stay", path: "/rooms", tone: "blue", icon: BedDouble },
    { label: "View Menu", sub: "Explore our dishes", path: "/menu", tone: "purple", icon: BookOpen },
  ];

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredMenu = popularMenu.filter((item) =>
    `${item.name} ${item.desc}`.toLowerCase().includes(normalizedSearch)
  );

  const recentRows = bookings.length
    ? bookings.slice(0, 3)
    : [
        { _id: "demo-1", bookingType: "table", status: "confirmed", reservationTime: "2025-08-26T20:30:00", amount: 4500 },
        { _id: "demo-2", bookingType: "room", status: "pending", checkIn: "2025-08-27T15:00:00", amount: 4200 },
      ];

  return (
    <div className="dashboard-page" style={{ paddingTop: "72px" }}>
      <div className="dashboard-shell">
        <aside className="dashboard-sidebar">
          <div className="sidebar-brand-wrap">
            <div className="sidebar-brand-mark">
              <span className="brand-mark-circle">✦</span>
            </div>
            <div className="sidebar-brand-copy">
              <div className="brand-name">FOOD ZONE</div>
              <div className="brand-sub">Hotel &amp; Restaurant</div>
            </div>
          </div>

          <nav className="sidebar-nav">
            {[
              { label: "Dashboard", active: true, icon: "◫", path: "/dashboard" },
              { label: "Rooms", active: false, icon: "▣", path: "/rooms" },
              { label: "Menu", active: false, icon: "◍", path: "/menu" },
              { label: "Reservations", active: false, icon: "◌", path: "/reservations" },
              { label: "Contact", active: false, icon: "◫", path: "/contact" },
            ].map((item) => (
              <Link key={item.label} to={item.path} className={`sidebar-nav-item ${item.active ? "active" : ""}`}>
                <span className="nav-item-icon">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="sidebar-footer-badge">
            <div className="footer-badge-icon">✦</div>
            <div>
              <div className="footer-badge-title">Good Food</div>
              <div className="footer-badge-sub">Good Mood</div>
            </div>
          </div>
        </aside>

        <main className="dashboard-main-panel">
          <header className="dashboard-topbar">
            <div className="topbar-search">
              <Search size={17} />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search for rooms, bookings, or menu items..."
                aria-label="Search dashboard"
              />
            </div>

            <div className="topbar-actions">
              <Link to="/reservations" className="topbar-icon-button" aria-label="View reservations">
                <Bell size={18} />
              </Link>
              <div className="topbar-user-box">
                <div className="avatar-mini">{initial}</div>
                <div>
                  <div className="user-name">Hi, {previewUser.name?.split(" ")[0]}</div>
                  <div className="user-role">{previewUser.role || "Admin"}</div>
                </div>
              </div>
            </div>
          </header>

          <div className="dashboard-body-grid">
            <section className="dashboard-main-area">
              <div className="dashboard-hero-card">
                <div className="hero-content">
                  <p className="hero-kicker">MY DASHBOARD</p>
                  <h1>
                    Welcome back, <span>{previewUser.name?.split(" ")[0]}!</span>
                  </h1>
                  <p className="hero-copy">Manage your bookings, view your reservations, and explore new experiences.</p>
                  <Link to="/reservations" className="hero-button">
                    View Reservations <ChevronRight size={16} />
                  </Link>
                </div>
                <div className="hero-visual-wrap">
                  <img
                    src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900&q=85"
                    alt="Restaurant interior"
                  />
                </div>
              </div>

              <div className="stats-grid">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className={`stat-card ${stat.accent}`}>
                      <div className="stat-icon-wrap">
                        <Icon size={22} />
                      </div>
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-detail">{stat.label}</div>
                      <div className="stat-trend">{stat.detail}</div>
                    </div>
                  );
                })}
              </div>

              <div className="panel-grid">
                <div className="panel-card bookings-panel">
                  <div className="panel-head">
                    <div className="panel-title">Recent Bookings</div>
                    <Link to="/reservations">View All</Link>
                  </div>

                  {loadingBookings ? (
                    <div className="empty-state compact">
                      <div className="spinner" />
                    </div>
                  ) : recentRows.length === 0 ? (
                    <div className="empty-state compact">
                      <h4>No Bookings Yet</h4>
                    </div>
                  ) : (
                    <div className="booking-table">
                      <div className="booking-header-row">
                        <span>Customer</span>
                        <span>Room</span>
                        <span>Date &amp; Time</span>
                        <span>Status</span>
                        <span>Amount</span>
                      </div>

                      {recentRows.map((booking) => {
                        const date = booking.checkIn || booking.reservationTime || "2025-08-26T20:30:00";
                        const dateObj = new Date(date);
                        const customerSeed = booking.bookingType === "room" ? "A" : "S";

                        return (
                          <div key={booking._id} className="booking-row">
                            <div className="customer-cell">
                              <span className="customer-badge">{customerSeed}</span>
                              <div>
                                <strong>{booking.bookingType === "room" ? "Ahmed Khan" : "Sara Malik"}</strong>
                                <small>{booking.bookingType === "room" ? "+92 302 1234567" : "+92 321 9876543"}</small>
                              </div>
                            </div>
                            <span>{booking.bookingType === "room" ? "Deluxe Room" : "Standard Room"}</span>
                            <span>{dateObj.toLocaleDateString()}<br />{dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                            <span className={`status-pill ${booking.status}`}>{booking.status}</span>
                            <span className="amount-pill">PKR {Number(booking.totalAmount || booking.amount || 0).toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="panel-card menu-panel">
                  <div className="panel-head">
                    <div className="panel-title">Popular Menu</div>
                    <Link to="/menu">View Full Menu</Link>
                  </div>

                  <div className="popular-list">
                    {filteredMenu.map((item) => (
                      <div key={item.name} className="popular-item">
                        <img src={item.img} alt={item.name} />
                        <div className="popular-copy">
                          <h4>{item.name}</h4>
                          <p>{item.desc}</p>
                        </div>
                        <strong>PKR {item.price.toLocaleString()}</strong>
                      </div>
                    ))}
                    {filteredMenu.length === 0 && (
                      <div className="empty-state compact">
                        <p>No menu items match &quot;{searchTerm}&quot;.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <aside className="dashboard-side-area">
              <div className="promo-card">
                <div className="promo-copy">
                  <h3>Enjoy Delicious Food at Food Zone</h3>
                  <p>Great food, better moments.</p>
                  <Link to="/reservations">Reserve a Table</Link>
                </div>
                <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=85" alt="Prepared dish" />
              </div>

              <div className="action-panel">
                <div className="panel-head">
                  <div className="panel-title">Quick Actions</div>
                  <Sparkles size={16} />
                </div>

                <div className="action-grid">
                  {actions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Link key={action.label} to={action.path} className={`action-card ${action.tone}`}>
                        <div className="action-icon-wrap">
                          <Icon size={18} />
                        </div>
                        <span>{action.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="overview-panel">
                <div className="panel-head compact-head">
                  <div className="panel-title">Today&apos;s Overview</div>
                  <span>Aug 26, 2025</span>
                </div>

                <div className="overview-grid">
                  <div className="overview-box">
                    <span>2</span>
                    <small>New Bookings</small>
                  </div>
                  <div className="overview-box highlight">
                    <span>PKR 7,700</span>
                    <small>Today&apos;s Revenue</small>
                  </div>
                </div>
              </div>
            </aside>
          </div>

        </main>
      </div>
    </div>
  );
}
