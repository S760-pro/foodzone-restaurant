import { Link } from "react-router-dom";
import {
  Star, Clock, ChevronRight, ArrowRight, ArrowUpRight, Award,
  MapPin, Phone, Mail, UtensilsCrossed,
  BedDouble, Users, Calendar, Shield
} from "lucide-react";
import { SiteCard, SiteCardsGrid } from "../components/SiteCard";
import logo from "../assets/logo.svg";

const popularDishes = [
  {
    id: 1,
    name: "Truffle Arancini",
    price: 1250,
    rating: 4.9,
    desc: "Crispy risotto balls with black truffle",
    img: "https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=600&q=80",
    badge: "Bestseller",
    readTime: "5 min"
  },
  {
    id: 2,
    name: "Slow-cooked Short Rib",
    price: 2850,
    rating: 5.0,
    desc: "48-hour braised in red wine",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    badge: "Chef's Special",
    readTime: "8 min"
  },
  {
    id: 3,
    name: "Charcoal Grilled Salmon",
    price: 1650,
    rating: 4.8,
    desc: "Wild Atlantic with lemon-herb butter",
    img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
    badge: "Popular",
    readTime: "6 min"
  },
  {
    id: 4,
    name: "Molten Chocolate Soufflé",
    price: 850,
    rating: 4.9,
    desc: "Belgian chocolate with vanilla ice cream",
    img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80",
    badge: "Dessert Hit",
    readTime: "4 min"
  }
];

const featuredRooms = [
  {
    id: 1,
    name: "Executive Suite",
    price: 14000,
    img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    size: "55 m²",
    guests: 4,
    amenities: ["WiFi", "Smart TV", "Kitchenette"]
  },
  {
    id: 2,
    name: "Presidential Suite",
    price: 22000,
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    size: "85 m²",
    guests: 5,
    amenities: ["Jacuzzi", "Butler", "Terrace"]
  },
  {
    id: 3,
    name: "Garden View",
    price: 10500,
    img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    size: "42 m²",
    guests: 3,
    amenities: ["Balcony", "Garden View", "WiFi"]
  }
];

const features = [
  {
    icon: Award,
    title: "Award-Winning",
    desc: "Michelin-rated cuisine and service"
  },
  {
    icon: Clock,
    title: "Open 7 Days",
    desc: "Serving breakfast, lunch & dinner"
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    desc: "Contactless payment options"
  },
  {
    icon: Users,
    title: "Group Bookings",
    desc: "Perfect for celebrations"
  }
];

const testimonials = [
  {
    name: "Muhammad Haseeb Arshad",
    role: "Entrepreneur",
    location: "Pakistan",
    text: "I worked with Muzammil on a React project and had a great experience. He is skilled, professional, and delivers quality work on time. I highly recommend him for any web development project.",
    rating: 5,
    avatar: "MH",
    avatarBg: "#2563EB"
  },
  {
    name: "dan17011888",
    role: "Business Owner",
    location: "United Kingdom",
    text: "Great experience! The seller designed a clean and professional eBay listing template. Communication was smooth, and delivery was very fast. Highly recommended!",
    rating: 5,
    avatar: "DU",
    avatarBg: "#10B981"
  },
  {
    name: "rizwanran",
    role: "Marketing Manager",
    location: "United Kingdom",
    text: "I was blown away by the professionalism! He gave my list a great job for my list so much better. Mu some examples and messages him and some great feedback.",
    rating: 5,
    avatar: "RR",
    avatarBg: "#8B5CF6"
  }
];

export default function Home() {
  // Updated: Hero section redesigned
  return (
    <div style={{ backgroundColor: 'var(--background-color)', margin: 0, padding: 0, minHeight: 'auto' }}>

      {/* ═══════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════ */}
      <section className="hero-section">
        <div className="section-container">
          <div className="hero-grid">
            <div className="hero-copy fade-up">
              <div className="hero-pill">
                <img src={logo} alt="" className="hero-pill-logo" aria-hidden="true" />
                <span>Welcome to FoodZone</span>
              </div>

              <h1 className="hero-heading font-display text-gray-900">
                Foodie Restaurant
                <br />
                and Enjoy <span className="hero-accent">The Food</span>
              </h1>

              <p className="hero-description">
                Experience the perfect blend of culinary excellence and luxurious hospitality. From award-winning dishes to elegant suites, we create unforgettable moments.
              </p>

              <div className="hero-hours">
                <Clock size={16} className="text-orange-500" />
                <span>Open: 9:00am - 11:00pm</span>
              </div>

              <div className="hero-actions">
                <Link to="/reservations" className="btn-primary-hero group">
                  Reserve a Table
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link to="/menu" className="btn-secondary-hero">
                  Explore Menu
                </Link>
              </div>

              <div className="hero-stats">
                <div>
                  <p className="hero-stat-value">200<span className="hero-stat-plus">+</span></p>
                  <p className="hero-stat-label">Menu Items</p>
                </div>
                <div className="hero-stat-divider"></div>
                <div>
                  <p className="hero-stat-value">50<span className="hero-stat-plus">+</span></p>
                  <p className="hero-stat-label">Luxury Rooms</p>
                </div>
                <div className="hero-stat-divider"></div>
                <div>
                  <p className="hero-stat-value">4.9<span className="hero-stat-star">★</span></p>
                  <p className="hero-stat-label">Guest Rating</p>
                </div>
              </div>
            </div>

            <div className="hero-visual fade-up">
              <div className="hero-ring"></div>
              <div className="hero-plate-wrap">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=90"
                  alt="Delicious Food"
                  className="hero-plate"
                  loading="eager"
                />

                <div className="hero-floating-card hero-floating-card-left">
                  <img
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&q=80"
                    alt="Salmon Salad"
                    className="hero-floating-thumb"
                    loading="eager"
                  />
                  <div>
                    <p className="hero-floating-title">Salmon Salad</p>
                    <div className="hero-floating-rating">
                      <Star size={11} className="text-orange-500" fill="#F97316" />
                      <span>4.9</span>
                    </div>
                    <p className="hero-floating-price">Rs. 1,250</p>
                  </div>
                </div>

                <div className="hero-floating-badge hero-floating-badge-right">
                  🔥 Best Food
                </div>
              </div>

              <span className="hero-floating-icon hero-floating-icon-top">🥗</span>
              <span className="hero-floating-icon hero-floating-icon-bottom">🍅</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          POPULAR DISHES - BUDGET CARD STYLE
      ═══════════════════════════════════════ */}
      <section className="section-spacing" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="section-container">
          <div className="text-center mb-12 fade-up">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-100 text-orange-700 font-semibold text-base mb-6">
              <UtensilsCrossed size={20} />
              Our Menu
            </div>
            <h2 className="section-title text-gray-900">
              Our Popular <span className="text-orange-500">Dishes</span>
            </h2>
            <p className="section-subtitle mt-6">
              Discover our chef's signature creations, crafted with passion and the finest seasonal ingredients
            </p>
          </div>

          <SiteCardsGrid>
            {popularDishes.map((dish, index) => {
              const badgeDots = ["#22c55e", "#3b82f6", "#f59e0b", "#a855f7"];
              return (
                <SiteCard
                  key={dish.id}
                  image={dish.img}
                  imageAlt={dish.name}
                  badge={dish.badge}
                  badgeDot={badgeDots[index]}
                  title={dish.name}
                  description={dish.desc}
                  tags={[
                    `Rs. ${dish.price.toLocaleString()}`,
                    `${dish.rating}`,
                    dish.readTime,
                  ]}
                  href="/menu"
                />
              );
            })}
          </SiteCardsGrid>

          <div className="flex justify-center mt-16 fade-up">
            <Link to="/menu" className="btn-primary-hero group">
              View Full Menu
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURES - BUDGET CARD STYLE
      ═══════════════════════════════════════ */}
      <section className="section-spacing" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="section-container">
          <SiteCardsGrid>
            {features.map((feature, i) => {
              const Icon = feature.icon;
              const iconWraps = [
                "site-card-icon-wrap--orange",
                "site-card-icon-wrap--blue",
                "site-card-icon-wrap--green",
                "site-card-icon-wrap--purple",
              ];
              return (
                <SiteCard
                  key={i}
                  icon={Icon}
                  iconWrapClass={iconWraps[i]}
                  title={feature.title}
                  description={feature.desc}
                  align="center"
                />
              );
            })}
          </SiteCardsGrid>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ROOMS - BUDGET CARD STYLE
      ═══════════════════════════════════════ */}
      <section className="section-spacing" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="section-container">
          <div className="text-center mb-12 fade-up">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-100 text-orange-700 font-semibold text-base mb-6">
              <BedDouble size={20} />
              Accommodation
            </div>
            <h2 className="section-title text-gray-900">
              Luxury <span className="text-orange-500">Rooms & Suites</span>
            </h2>
            <p className="section-subtitle mt-6">
              Unwind in our elegantly designed rooms featuring modern amenities and exceptional comfort
            </p>
          </div>

          <SiteCardsGrid columns={3}>
            {featuredRooms.map((room) => (
              <SiteCard
                key={room.id}
                image={room.img}
                imageAlt={room.name}
                badge={room.size}
                badgeDot="#3b82f6"
                title={room.name}
                description={`${room.guests} Guests · Comfortable luxury stay`}
                tags={room.amenities}
                href="/rooms"
                footer={
                  <div className="site-card-footer">
                    <div>
                      <p className="site-card-price-label">Starting from</p>
                      <p className="site-card-price">Rs. {room.price.toLocaleString()}</p>
                    </div>
                    <Link to="/rooms" className="site-card-action-btn" aria-label={`View ${room.name}`}>
                      <ChevronRight size={20} />
                    </Link>
                  </div>
                }
              />
            ))}
          </SiteCardsGrid>

          <div className="text-center mt-12 fade-up">
            <Link to="/rooms" className="btn-primary-hero group">
              View All Rooms
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS - BUDGET CARD STYLE
      ═══════════════════════════════════════ */}
      <section className="section-spacing" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="section-container">
          <div className="text-center mb-12 fade-up">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-100 text-orange-700 font-semibold text-base mb-6">
              <Star size={20} />
              Testimonials
            </div>
            <h2 className="section-title text-gray-900">
              What Our <span className="text-orange-500">Guests Say</span>
            </h2>
            <p className="section-subtitle mt-6">
              Real experiences from our valued guests who have dined and stayed with us
            </p>
          </div>

          <SiteCardsGrid columns={3}>
            {testimonials.map((testimonial, i) => (
              <SiteCard key={i}>
                {/* Stars */}
                <div className="flex items-center gap-1.5 mb-6">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <Star key={starIndex} size={18} className="text-yellow-400" fill="#FBBF24" />
                  ))}
                </div>
                
                {/* Review Text */}
                <p className="text-gray-700 text-sm leading-relaxed mb-6" style={{ color: '#2C3E50', lineHeight: '1.7' }}>
                  "{testimonial.text}"
                </p>
                
                {/* User Info */}
                <div className="site-card-footer" style={{ borderTop: "1px solid #E5E7EB", paddingTop: "16px", marginTop: "auto" }}>
                  {/* Avatar */}
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md"
                    style={{ backgroundColor: testimonial.avatarBg }}
                  >
                    {testimonial.avatar}
                  </div>
                  
                  {/* Name, Role, Location */}
                  <div>
                    <p className="site-card-title" style={{ fontSize: "14px", marginBottom: "2px" }}>{testimonial.name}</p>
                    <p className="site-card-desc" style={{ WebkitLineClamp: "unset", fontSize: "12px", marginBottom: "2px" }}>{testimonial.role}</p>
                    <p className="text-gray-500" style={{ fontSize: "11px" }}>{testimonial.location}</p>
                  </div>
                </div>
              </SiteCard>
            ))}
          </SiteCardsGrid>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA SECTION - EXPERIENCE EXCELLENCE
      ═══════════════════════════════════════ */}
      <section style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="section-container">
          <div 
            className="relative overflow-hidden text-center px-12 py-16 fade-up"
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
              borderRadius: 'var(--card-radius)',
              boxShadow: '0 12px 32px rgba(249, 115, 22, 0.3)'
            }}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-8">
                <Calendar size={28} className="text-white" />
              </div>
              <h2 className="section-title text-white mb-6">
                Ready to Experience Excellence?
              </h2>
              <p className="section-subtitle text-white/95 mb-10 max-w-2xl mx-auto">
                Book your table or reserve a room today and discover why we're Multan's premier destination
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link
                  to="/reservations"
                  style={{
                    backgroundColor: 'white',
                    color: '#F97316',
                    padding: '16px 32px',
                    borderRadius: 'var(--button-radius)',
                    fontWeight: '600',
                    fontSize: '18px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Make Reservation
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/contact"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    padding: '16px 32px',
                    borderRadius: 'var(--button-radius)',
                    border: '2px solid white',
                    fontWeight: '600',
                    fontSize: '18px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
