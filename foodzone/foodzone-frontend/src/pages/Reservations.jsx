import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BedDouble,
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  Phone,
  Shield,
  Sparkles,
  Star,
  Users,
  UtensilsCrossed,
  User,
} from "lucide-react";
import { SiteCard, SiteCardsGrid, SiteStatCard } from "../components/SiteCard";

export default function Reservations() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    tableDate: "",
    tableTime: "",
    tableGuests: "2",
    tablePreference: "",
    tableRequests: "",
    checkInDate: "",
    checkOutDate: "",
    roomGuests: "2",
    roomType: "",
    roomCount: "1",
    roomPhone: "",
    roomRequests: "",
  });

  const stats = [
    { value: "1245", label: "Total Reservations", icon: Calendar, tone: "bg-blue-100 text-blue-600" },
    { value: "89", label: "Guests Today", icon: Users, tone: "bg-emerald-100 text-emerald-600" },
    { value: "23", label: "Pending Today", icon: Clock, tone: "bg-violet-100 text-violet-600" },
    { value: "4.8★", label: "Guest Rating", icon: Star, tone: "bg-amber-100 text-amber-600" },
  ];

  const inputClassName =
    "w-full rounded-lg border-2 border-gray-200 bg-white px-5 py-3.5 text-sm text-slate-700 outline-none transition-all placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 hover:border-gray-300";

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(false);

    try {
      // Prepare booking data for table reservation
      const tableBookingData = {
        bookingType: "table",
        partySize: parseInt(formData.tableGuests),
        reservationTime: `${formData.tableDate}T${formData.tableTime}`,
        specialRequests: `Table Preference: ${formData.tablePreference}. ${formData.tableRequests}`,
        totalAmount: 0, // Free for table booking
        phone: formData.phone,
        fullName: formData.fullName,
        email: formData.email
      };

      // Prepare booking data for room reservation
      const roomBookingData = {
        bookingType: "room",
        checkIn: formData.checkInDate,
        checkOut: formData.checkOutDate,
        partySize: parseInt(formData.roomGuests),
        specialRequests: `Room Type: ${formData.roomType}, Rooms: ${formData.roomCount}. ${formData.roomRequests}`,
        totalAmount: 0, // Will be calculated based on room type
        phone: formData.roomPhone
      };

      // Send requests to backend
      const promises = [];
      
      if (formData.tableDate && formData.tableTime) {
        promises.push(
          fetch('http://localhost:5000/api/bookings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('fz_token')}`
            },
            body: JSON.stringify(tableBookingData)
          })
        );
      }

      if (formData.checkInDate && formData.checkOutDate) {
        promises.push(
          fetch('http://localhost:5000/api/bookings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('fz_token')}`
            },
            body: JSON.stringify(roomBookingData)
          })
        );
      }

      await Promise.all(promises);
      
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          tableDate: "",
          tableTime: "",
          tableGuests: "2",
          tablePreference: "",
          tableRequests: "",
          checkInDate: "",
          checkOutDate: "",
          roomGuests: "2",
          roomType: "",
          roomCount: "1",
          roomPhone: "",
          roomRequests: "",
        });
      }, 3000);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please make sure you are logged in and try again.');
    }
  };

  return (
    <div className="reservations-page-shell min-h-screen" style={{ backgroundColor: "var(--background-color)" }}>
      <div className="section-container reservations-page-top" style={{ paddingTop: "44px", paddingBottom: "92px" }}>
        <div className="menu-hero fade-up" style={{ maxWidth: "760px" }}>
          <div className="menu-hero-pill justify-center">
            <Calendar size={14} />
            <span>Plan Your Visit</span>
          </div>
          <h1 className="menu-hero-title text-gray-900">
            Make a <span className="text-orange-500">Reservation</span>
          </h1>
          <div className="menu-hero-divider">
            <span className="menu-hero-divider-line" />
            <span className="menu-hero-divider-icon">✻</span>
            <span className="menu-hero-divider-line" />
          </div>
          <p className="menu-hero-subtitle">
            Book a table at our restaurant or reserve a luxurious room with our seamless online reservation system.
          </p>
        </div>

        <SiteCardsGrid columns={4} style={{ maxWidth: "1100px", margin: "28px auto 0" }}>
          {stats.map((card) => {
            const toneMap = {
              "bg-blue-100 text-blue-600": "site-card-icon-wrap--blue",
              "bg-emerald-100 text-emerald-600": "site-card-icon-wrap--emerald",
              "bg-violet-100 text-violet-600": "site-card-icon-wrap--purple",
              "bg-amber-100 text-amber-600": "site-card-icon-wrap--amber",
            };
            return (
              <SiteStatCard
                key={card.label}
                icon={card.icon}
                iconWrapClass={toneMap[card.tone]}
                value={card.value}
                label={card.label}
              />
            );
          })}
        </SiteCardsGrid>

        {submitted ? (
          <div className="mx-auto mb-16 max-w-2xl">
            <div className="site-card site-card--panel overflow-hidden">
              <div className="px-8 py-20 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 size={40} className="text-emerald-600" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-charcoal-900">Reservation Confirmed!</h3>
                <p className="mb-8 text-ink/60">We have received your request and will contact you shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
                >
                  Make Another Reservation
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-10 lg:grid-cols-2">
                {/* Table Reservation Card */}
                <div className="site-card site-card--panel overflow-hidden" style={{ padding: 'clamp(28px, 8vw, 50px) clamp(20px, 8vw, 45px)', marginTop: '24px', marginBottom: '24px' }}>
                  <div className="mb-10 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                      <UtensilsCrossed size={22} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-charcoal-900">Table Reservation</h2>
                      <p className="text-sm text-ink/55 mt-1">Reserve a table for dining and celebrations</p>
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-3 block text-sm font-semibold text-charcoal-900">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className={inputClassName}
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-semibold text-charcoal-900">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className={inputClassName}
                      />
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-semibold text-charcoal-900">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+92 300 0000000"
                        className={inputClassName}
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-semibold text-charcoal-900">Number of Guests</label>
                      <select
                        name="tableGuests"
                        value={formData.tableGuests}
                        onChange={handleInputChange}
                        className={`${inputClassName} appearance-none`}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                          <option key={count} value={count}>
                            {count} Guest{count > 1 ? "s" : ""}
                          </option>
                        ))}
                        <option value="9+">9+ Guests</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-semibold text-charcoal-900">Date *</label>
                      <input
                        type="date"
                        name="tableDate"
                        value={formData.tableDate}
                        onChange={handleInputChange}
                        className={inputClassName}
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-semibold text-charcoal-900">Table Preference</label>
                      <select
                        name="tablePreference"
                        value={formData.tablePreference}
                        onChange={handleInputChange}
                        className={`${inputClassName} appearance-none`}
                      >
                        <option value="">Select preference</option>
                        <option value="window">Window Seat</option>
                        <option value="outdoor">Outdoor</option>
                        <option value="quiet">Quiet Corner</option>
                        <option value="private">Private Area</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-semibold text-charcoal-900">Time *</label>
                      <select
                        name="tableTime"
                        value={formData.tableTime}
                        onChange={handleInputChange}
                        className={`${inputClassName} appearance-none`}
                        required
                      >
                        <option value="">Select time</option>
                        {[
                          "11:00 AM",
                          "12:00 PM",
                          "1:00 PM",
                          "2:00 PM",
                          "3:00 PM",
                          "4:00 PM",
                          "5:00 PM",
                          "6:00 PM",
                          "7:00 PM",
                          "8:00 PM",
                          "9:00 PM",
                        ].map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-3 block text-sm font-semibold text-charcoal-900">Special Requests</label>
                      <textarea
                        name="tableRequests"
                        value={formData.tableRequests}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Tell me about your special requests..."
                        className={`${inputClassName} resize-none`}
                      />
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-gray-200">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 text-base font-bold text-white transition-all duration-300 hover:from-teal-600 hover:to-cyan-700 hover:shadow-lg hover:-translate-y-1"
                      style={{ padding: '14px 24px' }}
                    >
                      Confirm Table Reservation
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>

                {/* Room Reservation Card */}
                <div className="site-card site-card--panel overflow-hidden" style={{ padding: 'clamp(28px, 8vw, 50px) clamp(20px, 8vw, 45px)', marginTop: '24px', marginBottom: '24px' }}>
                  <div className="mb-10 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                      <BedDouble size={22} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-charcoal-900">Room Reservation</h2>
                      <p className="text-sm text-ink/55 mt-1">Reserve your stay with flexible room options</p>
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-3 block text-sm font-semibold text-charcoal-900">Check-in Date</label>
                      <input
                        type="date"
                        name="checkInDate"
                        value={formData.checkInDate}
                        onChange={handleInputChange}
                        className={inputClassName}
                      />
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-semibold text-charcoal-900">Check-out Date</label>
                      <input
                        type="date"
                        name="checkOutDate"
                        value={formData.checkOutDate}
                        onChange={handleInputChange}
                        className={inputClassName}
                      />
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-semibold text-charcoal-900">Number of Guests</label>
                      <select
                        name="roomGuests"
                        value={formData.roomGuests}
                        onChange={handleInputChange}
                        className={`${inputClassName} appearance-none`}
                      >
                        {[1, 2, 3, 4, 5, 6].map((count) => (
                          <option key={count} value={count}>
                            {count} Guest{count > 1 ? "s" : ""}
                          </option>
                        ))}
                        <option value="7+">7+ Guests</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-semibold text-charcoal-900">Room Type</label>
                      <select
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleInputChange}
                        className={`${inputClassName} appearance-none`}
                      >
                        <option value="">Select room type</option>
                        <option value="deluxe">Deluxe Room</option>
                        <option value="executive">Executive Suite</option>
                        <option value="garden">Garden View</option>
                        <option value="presidential">Presidential Suite</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-semibold text-charcoal-900">Number of Rooms</label>
                      <select
                        name="roomCount"
                        value={formData.roomCount}
                        onChange={handleInputChange}
                        className={`${inputClassName} appearance-none`}
                      >
                        {[1, 2, 3, 4].map((count) => (
                          <option key={count} value={count}>
                            {count} Room{count > 1 ? "s" : ""}
                          </option>
                        ))}
                        <option value="5+">5+ Rooms</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-semibold text-charcoal-900">Contact Number</label>
                      <input
                        type="tel"
                        name="roomPhone"
                        value={formData.roomPhone}
                        onChange={handleInputChange}
                        placeholder="+92 300 0000000"
                        className={inputClassName}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-3 block text-sm font-semibold text-charcoal-900">Special Requests</label>
                      <textarea
                        name="roomRequests"
                        value={formData.roomRequests}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Tell me about your special requests..."
                        className={`${inputClassName} resize-none`}
                      />
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-gray-200">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 text-base font-bold text-white transition-all duration-300 hover:from-teal-600 hover:to-cyan-700 hover:shadow-lg hover:-translate-y-1"
                      style={{ padding: '14px 24px' }}
                    >
                      Confirm Room Reservation
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </form>
        )}

        <SiteCardsGrid columns={3} style={{ maxWidth: "1100px", margin: "40px auto 0" }}>
          {[
            { icon: CheckCircle2, title: "Instant Confirmation", desc: "Receive immediate confirmation for your booking" },
            { icon: Shield, title: "Flexible Cancellation", desc: "Cancel or modify your booking easily any time" },
            { icon: Sparkles, title: "VIP Treatment", desc: "Enjoy exclusive benefits and personalized service" },
          ].map((feature, index) => (
            <SiteCard
              key={index}
              icon={feature.icon}
              iconWrapClass="site-card-icon-wrap--orange"
              title={feature.title}
              description={feature.desc}
              align="center"
            />
          ))}
        </SiteCardsGrid>

        <div className="text-center" style={{ marginTop: '80px' }}>
          <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-all duration-300 hover:gap-3">
            Need help with a special request?
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}