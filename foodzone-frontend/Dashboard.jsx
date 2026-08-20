import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Calendar, Bed, Utensils, Wallet } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { bookingAPI } from "../services/api";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;
    bookingAPI.getMine()
      .then(setBookings)
      .catch(() => setBookings([]))
      .finally(() => setLoadingBookings(false));
  }, [user]);

  if (!user) return null;

  const initial = (user.name || "G").trim().charAt(0).toUpperCase();
  const activeBookings = bookings.filter(b => b.status === "confirmed").length;
  const totalRooms = bookings.filter(b => b.bookingType === "room" && b.status !== "cancelled").length;
  const totalDining = bookings.filter(b => b.bookingType === "table" && b.status !== "cancelled").length;
  const totalSpent = bookings.filter(b => b.status !== "cancelled").reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  // Popular menu items
  const popularMenu = [
    { name: "Grilled Salmon", desc: "Fresh salmon with herbs and lemon butter sauce", price: 2450, img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&q=80" },
    { name: "Fettuccine Alfredo", desc: "Creamy Alfredo pasta with grilled chicken", price: 1750, img: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=200&q=80" },
    { name: "Chocolate Lava Cake", desc: "Warm chocolate cake with vanilla ice cream", price: 950, img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=200&q=80" },
  ];

  return (
    <div className="dashboard-page min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50" style={{ paddingTop: '64px' }}>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-orange-100 text-xs sm:text-sm font-semibold mb-1">MY DASHBOARD 👋</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">Welcome back,</h1>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-100 leading-tight">{user.name}!</h1>
              <p className="text-orange-100 text-sm mt-2 max-w-xl">Manage your bookings, view your reservations, and explore new experiences.</p>
            </div>
            <div className="hidden lg:block flex-shrink-0">
              <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80" alt="" className="w-56 h-32 object-cover rounded-2xl shadow-xl opacity-90" />
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-container max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="dashboard-main-grid grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 mb-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-3xl font-bold mb-3 shadow-lg">
                  {initial}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{user.email}</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 mt-2">
                  ✓ Verified
                </span>
              </div>

              <div className="mt-6 space-y-3 border-t pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">📱 Phone</span>
                  <span className="font-semibold text-gray-900">{user.phone || '+92170293620'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">📍 Location</span>
                  <span className="font-semibold text-gray-900">Multan, PK</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">👤 Member Since</span>
                  <span className="font-semibold text-gray-900">2024</span>
                </div>
              </div>

              <button
                onClick={logout}
                className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-all"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-orange-500">⚡</span>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Quick Actions</h3>
              </div>
              <div className="space-y-3">
                <Link to="/reservations" className="block p-3 sm:p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white text-lg flex-shrink-0">
                      🍽️
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm">Reserve Dining</p>
                      <p className="text-xs text-gray-600 truncate">Book a table for your next meal</p>
                    </div>
                  </div>
                </Link>
                <Link to="/rooms" className="block p-3 sm:p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white text-lg flex-shrink-0">
                      🏨
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm">Book a Room</p>
                      <p className="text-xs text-gray-600 truncate">Plan your next stay with us</p>
                    </div>
                  </div>
                </Link>
                <Link to="/menu" className="block p-3 sm:p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center text-white text-lg flex-shrink-0">
                      📖
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 text-sm">View Menu</p>
                      <p className="text-xs text-gray-600 truncate">Explore our culinary offerings</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="dashboard-content lg:col-span-9 space-y-6">
            
            {/* Stats Cards */}
            <div className="dashboard-stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-orange-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Calendar className="text-orange-600" size={24} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">{activeBookings}</p>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-xs text-gray-500">Total Bookings</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Bed className="text-blue-600" size={24} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">{totalRooms}</p>
                <p className="text-sm text-gray-600">Rooms</p>
                <p className="text-xs text-gray-500">Total Bookings</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Utensils className="text-purple-600" size={24} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">{totalDining}</p>
                <p className="text-sm text-gray-600">Dining</p>
                <p className="text-xs text-gray-500">Table Reservations</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <Wallet className="text-green-600" size={24} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">PKR {(totalSpent / 1000).toFixed(1)}k</p>
                <p className="text-sm text-gray-600">Spent</p>
                <p className="text-xs text-gray-500">Total Transactions</p>
              </div>
            </div>

            {/* Recent Bookings & Popular Menu */}
            <div className="dashboard-panels-grid grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Recent Bookings */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📅</span>
                    <h3 className="text-lg font-bold text-gray-900">Recent Bookings</h3>
                  </div>
                  <button className="text-orange-500 text-sm font-semibold hover:text-orange-600">View All</button>
                </div>

                {loadingBookings ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                      <Calendar className="text-orange-600" size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No Bookings Yet</h3>
                    <p className="text-sm text-gray-600 mb-6">Start your journey with us by making your first reservation today.</p>
                    <Link to="/reservations" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all">
                      Make a Reservation
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookings.slice(0, 3).map((booking) => (
                      <div key={booking._id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              booking.bookingType === 'room' ? 'bg-blue-100' : 'bg-purple-100'
                            }`}>
                              {booking.bookingType === 'room' ? '🏨' : '🍽️'}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">{booking.bookingType === 'room' ? 'Room Booking' : 'Table Reservation'}</p>
                              <p className="text-xs text-gray-600">{new Date(booking.checkIn || booking.reservationTime).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Popular Menu */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⭐</span>
                    <h3 className="text-lg font-bold text-gray-900">Popular Menu</h3>
                  </div>
                  <Link to="/menu" className="text-orange-500 text-sm font-semibold hover:text-orange-600">View Full Menu</Link>
                </div>

                <div className="space-y-4">
                  {popularMenu.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all">
                      <img src={item.img} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600 line-clamp-1">{item.desc}</p>
                      </div>
                      <p className="text-orange-500 font-bold text-sm">PKR {item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
