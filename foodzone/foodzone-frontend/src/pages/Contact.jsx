import { MapPin, Phone, Mail, Clock, Send, MessageSquare, User, AtSign } from "lucide-react";
import { useState } from "react";
import { contactAPI } from "../services/api";
import { SiteCard, SiteCardsGrid } from "../components/SiteCard";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await contactAPI.create(formData);
      
      alert(response.message || "Thank you for contacting us! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (err) {
      setError(err.message || "Failed to send message. Please try again.");
      console.error('Contact form error:', err);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Multan, Punjab, Pakistan", "Near City Center"],
      color: "orange"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+92 300 0000000", "+92 301 1111111"],
      color: "blue"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@foodzone.com", "reservations@foodzone.com"],
      color: "green"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Monday - Sunday", "9:00 AM - 11:00 PM"],
      color: "purple"
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--background-color)', minHeight: 'auto' }}>
      
      {/* ═══════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════ */}
      <section style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <div className="section-container">
          <div className="text-center fade-up">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-100 text-orange-700 font-semibold text-base mb-6">
              <MessageSquare size={20} />
              Get In Touch
            </div>
            <h1 className="section-title text-gray-900 mb-6">
              Contact <span className="text-orange-500">Food Zone</span>
            </h1>
            <p className="section-subtitle max-w-2xl mx-auto">
              Have a question or want to make a reservation? We're here to help! Reach out to us through any of the methods below.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT INFO CARDS
      ═══════════════════════════════════════ */}
      <section style={{ paddingBottom: '80px' }}>
        <div className="section-container">
          <SiteCardsGrid>
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const iconWraps = {
                orange: "site-card-icon-wrap--orange",
                blue: "site-card-icon-wrap--blue",
                green: "site-card-icon-wrap--green",
                purple: "site-card-icon-wrap--purple",
              };

              return (
                <SiteCard
                  key={index}
                  icon={Icon}
                  iconWrapClass={iconWraps[info.color]}
                  title={info.title}
                  description={info.details.join(" · ")}
                  align="center"
                />
              );
            })}
          </SiteCardsGrid>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT FORM & MAP SECTION
      ═══════════════════════════════════════ */}
      <section style={{ paddingBottom: '100px' }}>
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            
            {/* Left Side - Contact Form */}
            <div className="contact-form-card site-card site-card--panel">
              <div className="contact-form-header">
                <div className="contact-form-icon">
                  <MessageSquare size={28} className="text-orange-600" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">
                  Send Us a <span className="text-orange-500">Message</span>
                </h2>
                <p className="text-gray-600 text-base">
                  Fill out the form below and we'll get back to you soon.
                </p>
              </div>

              <div className="site-card-body">
              <form onSubmit={handleSubmit} className="contact-message-form space-y-7">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="contact-form-input w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-lg text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <AtSign size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="contact-form-input w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-lg text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div>
                  <label htmlFor="phone" className="block text-lg font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 300 0000000"
                      className="contact-form-input w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-lg text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label htmlFor="subject" className="block text-lg font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this regarding?"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-lg text-gray-900 placeholder-gray-400"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-lg font-semibold text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all resize-none text-lg text-gray-900 placeholder-gray-400"
                  ></textarea>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="contact-submit-button w-full bg-orange-500 text-white py-4 rounded-xl font-semibold text-xl hover:bg-orange-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
              </div>
            </div>

            {/* Right Side - Map & Additional Info */}
            <div className="space-y-6">
              {/* Map Container */}
              <div className="site-card site-card--panel overflow-hidden" style={{ minHeight: '620px' }}>
                <div className="h-full min-h-[620px] bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center" style={{ padding: '56px' }}>
                  <div className="text-center">
                    <MapPin size={64} className="mx-auto mb-4 text-orange-500" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontWeight: '700' }}>Visit Our Location</h3>
                    <p className="text-gray-600 mb-6 max-w-sm" style={{ paddingLeft: '18px', paddingRight: '18px' }}>
                      We're located in the heart of Multan, Punjab. Drop by anytime during our working hours!
                    </p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 hover:shadow-lg"
                    >
                      <MapPin size={20} />
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Info Box */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300" style={{ padding: '52px', paddingLeft: '48px', paddingRight: '48px' }}>
                <h3 className="text-3xl font-bold mb-6 text-white" style={{ fontWeight: '700' }}>Why Choose Food Zone?</h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white">✓</span>
                    </div>
                    <span className="text-white/95 text-sm leading-relaxed">
                      Award-winning cuisine with fresh, locally-sourced ingredients
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white">✓</span>
                    </div>
                    <span className="text-white/95 text-sm leading-relaxed">
                      Luxurious rooms with modern amenities and exceptional comfort
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white">✓</span>
                    </div>
                    <span className="text-white/95 text-sm leading-relaxed">
                      Professional staff dedicated to making your experience memorable
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white">✓</span>
                    </div>
                    <span className="text-white/95 text-sm leading-relaxed">
                      Convenient location in the heart of Multan with easy access
                    </span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ SECTION
      ═══════════════════════════════════════ */}
      <section style={{ paddingTop: '72px', paddingBottom: '100px' }}>
        <div className="section-container">
          <div className="text-center mb-12" style={{ marginTop: '16px', marginBottom: '56px' }}>
            <h2 className="section-title text-gray-900" style={{ marginTop: '16px', marginBottom: '18px' }}>
              Frequently Asked <span className="text-orange-500">Questions</span>
            </h2>
            <p className="section-subtitle" style={{ marginTop: '12px' }}>
              Quick answers to common questions about Food Zone
            </p>
          </div>

          <div className="faq-list max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Do I need to make a reservation?",
                a: "While walk-ins are welcome, we recommend making a reservation to guarantee your preferred time, especially during weekends and holidays."
              },
              {
                q: "What are your parking facilities?",
                a: "We offer complimentary parking for all our guests. Our parking area can accommodate both cars and motorcycles."
              },
              {
                q: "Do you offer catering services?",
                a: "Yes! We provide full catering services for events, parties, and corporate functions. Contact us for a customized quote."
              },
              {
                q: "Are vegetarian and halal options available?",
                a: "Absolutely! All our food is 100% halal, and we have an extensive selection of vegetarian dishes on our menu."
              },
              {
                q: "Can I host a private event at Food Zone?",
                a: "Yes, we have private dining areas and event spaces available. Contact us to discuss your requirements and pricing."
              }
            ].map((faq, index) => (
              <details key={index} className="faq-item site-card site-card--panel overflow-hidden group">
                <summary className="font-semibold text-gray-900 cursor-pointer hover:bg-orange-50 transition-colors flex items-center justify-between" style={{ padding: '26px 32px' }}>
                  <span>{faq.q}</span>
                  <span className="text-orange-500 text-xl">+</span>
                </summary>
                <div className="text-gray-600 text-sm leading-relaxed" style={{ padding: '0 32px 28px' }}>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
