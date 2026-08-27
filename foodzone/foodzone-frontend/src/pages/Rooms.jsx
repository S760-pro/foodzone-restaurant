import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Wifi, AirVent, Tv, Coffee, Users, Maximize2,
  Star, Check, ArrowRight, Sparkles, Crown, Bed, Shield, Gift, Tag, Award, ChevronRight
} from "lucide-react";
import { SiteCard, SiteCardsGrid } from "../components/SiteCard";
import { roomAPI } from "../services/api";

const roomTypes = [
  {
    id: 1,
    name: "Deluxe Room",
    subtitle: "Urban Elegance",
    desc: "Experience comfort with stunning city views, a luxurious king bed, and a modern rain shower.",
    price: 8500,
    priceLabel: "Rs. 8,500",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    amenities: ["Free WiFi", "Air Conditioning", "Flat Screen TV", "Mini Bar", "Rain Shower", "Work Desk"],
    size: "32 m²",
    occupancy: 2,
    beds: "1 King Bed",
    rating: 4.8,
    reviews: 124,
    featured: false
  },
  {
    id: 2,
    name: "Executive Suite",
    subtitle: "Premium Comfort",
    desc: "Spacious suite with separate lounge area, smart entertainment, and exclusive amenities.",
    price: 14000,
    priceLabel: "Rs. 14,000",
    img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    amenities: ["Free WiFi", "Air Conditioning", "Living Area", "Kitchenette", "Smart TV", "Minibar"],
    size: "55 m²",
    occupancy: 4,
    beds: "1 King + 1 Queen",
    rating: 4.9,
    reviews: 98,
    featured: true
  },
  {
    id: 3,
    name: "Garden View",
    subtitle: "Nature's Retreat",
    desc: "Relax in a serene setting with lush garden views, twin beds, and a private patio.",
    price: 10500,
    priceLabel: "Rs. 10,500",
    img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    amenities: ["Free WiFi", "Air Conditioning", "Private Balcony", "Garden View", "Tea Service", "Rainfall Shower"],
    size: "42 m²",
    occupancy: 3,
    beds: "2 Queen Beds",
    rating: 4.7,
    reviews: 156,
    featured: false
  },
  {
    id: 4,
    name: "Presidential Suite",
    subtitle: "Ultimate Luxury",
    desc: "Our most luxurious offering with panoramic views, private terrace, and personalized service.",
    price: 22000,
    priceLabel: "Rs. 22,000",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    amenities: ["Free WiFi", "Jacuzzi", "Private Terrace", "Butler Service", "Dining Area", "Premium Bar"],
    size: "85 m²",
    occupancy: 5,
    beds: "1 King + 2 Singles",
    rating: 5.0,
    reviews: 67,
    featured: true
  }
];

const roomHighlights = [
  {
    icon: AirVent,
    title: "Modern Amenities",
    desc: "Premium facilities for a comfortable stay"
  },
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    desc: "Stay connected with complimentary WiFi"
  },
  {
    icon: Coffee,
    title: "24/7 Room Service",
    desc: "Round-the-clock service at your convenience"
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    desc: "Your safety and privacy are our priority"
  }
];

const roomBenefits = [
  {
    icon: Gift,
    title: "Exclusive Packages & Offers",
    desc: "Enjoy special discounts, seasonal offers, and curated packages for a memorable stay.",
    action: "View All Offers"
  },
  {
    icon: Tag,
    title: "Best Price Guarantee",
    desc: "Get the best rates when you book direct"
  },
  {
    icon: Sparkles,
    title: "Flexible Cancellation",
    desc: "Free cancellation on selected rooms"
  },
  {
    icon: Award,
    title: "Loyalty Rewards",
    desc: "Earn points and enjoy exclusive benefits"
  }
];

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch rooms from backend
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await roomAPI.getAll();
        
        // Transform backend data to match frontend structure
        const transformedRooms = data.map(room => ({
          id: room._id,
          name: room.type,
          subtitle: room.type.includes('Suite') ? 'Premium Comfort' : 'Urban Elegance',
          desc: room.description,
          price: room.price,
          priceLabel: `Rs. ${room.price.toLocaleString()}`,
          img: room.images[0] || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
          amenities: room.amenities,
          size: "42 m²",
          occupancy: room.capacity,
          beds: room.capacity > 2 ? "2 Queen Beds" : "1 King Bed",
          rating: 4.8,
          reviews: 124,
          featured: room.price > 15000
        }));
        
        setRooms(transformedRooms);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const roomTypes = rooms.length > 0 ? rooms : [];
  
  // Calculate stats
  const totalRooms = roomTypes.length;
  const avgPrice = Math.round(roomTypes.reduce((sum, r) => sum + r.price, 0) / totalRooms);
  const featuredCount = roomTypes.filter(r => r.featured).length;
  const maxOccupancy = Math.max(...roomTypes.map(r => r.occupancy));

  return (
    <div className="rooms-page-shell min-h-screen" style={{ backgroundColor: 'var(--background-color)' }}>
      <div className="section-container rooms-page-top" style={{ paddingTop: '44px', paddingBottom: '76px' }}>
        <div className="menu-hero fade-up">
          <div className="menu-hero-pill justify-center">
            <Bed size={14} />
            <span>Our Rooms</span>
          </div>
          <h1 className="menu-hero-title text-gray-900">
            Elegant <span className="text-orange-500">Rooms &amp; Suites</span>
          </h1>
          <div className="menu-hero-divider">
            <span className="menu-hero-divider-line" />
            <span className="menu-hero-divider-icon">✻</span>
            <span className="menu-hero-divider-line" />
          </div>
          <p className="menu-hero-subtitle">
            Relax in our beautifully designed rooms and suites, crafted for your comfort. Experience luxury, elegance, and world-class hospitality.
          </p>
        </div>

        <SiteCardsGrid className="mb-12 rooms-highlight-grid">
          {roomHighlights.map((item, index) => {
            const Icon = item.icon;
            const iconWraps = [
              "site-card-icon-wrap--blue",
              "site-card-icon-wrap--orange",
              "site-card-icon-wrap--green",
              "site-card-icon-wrap--purple",
            ];
            return (
              <SiteCard
                key={index}
                icon={Icon}
                iconWrapClass={iconWraps[index]}
                title={item.title}
                description={item.desc}
              />
            );
          })}
        </SiteCardsGrid>

        <SiteCardsGrid className="rooms-grid" style={{ marginBottom: "80px" }}>
          {roomTypes.map((room) => (
            <SiteCard
              key={room.id}
              image={room.img}
              imageAlt={room.name}
              badge={room.size}
              badgeDot={room.featured ? "#f97316" : "#3b82f6"}
              title={room.name}
              description={room.desc}
              tags={room.amenities}
              href="/register"
              ctaText="View Details"
              footer={
                <div className="site-card-footer">
                  <div>
                    <p className="site-card-price-label">Starting from</p>
                    <p className="site-card-price">{room.priceLabel}</p>
                  </div>
                  <Link to="/register" className="site-card-action-btn" aria-label={`Book ${room.name}`}>
                    <ChevronRight size={20} />
                  </Link>
                </div>
              }
            />
          ))}
        </SiteCardsGrid>

        <SiteCardsGrid columns={4}>
          {roomBenefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <SiteCard
                key={index}
                icon={Icon}
                iconWrapClass="site-card-icon-wrap--orange"
                title={item.title}
                description={item.desc}
                footer={
                  item.action ? (
                    <Link to="/contact" className="site-card-tag" style={{ width: "fit-content" }}>
                      {item.action} →
                    </Link>
                  ) : null
                }
              />
            );
          })}
        </SiteCardsGrid>
      </div>
    </div>
  );
}
