import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  UtensilsCrossed, Star, Flame, Leaf, ArrowRight,
  ChevronRight, Heart, ShoppingCart, Award, Clock, Search, TrendingUp
} from "lucide-react";
import { SiteCard, SiteCardsGrid, SiteStatCard } from "../components/SiteCard";
import { useCart } from "../context/CartContext";

const menuCategories = [
  {
    id: "appetizers",
    name: "Appetizers",
    icon: "🥗",
    color: "emerald",
    items: [
      {
        id: 1,
        name: "Truffle Arancini",
        desc: "Crispy Italian risotto balls infused with black truffle and aged parmesan",
        price: 1250,
        priceLabel: "Rs. 1,250",
        img: "https://i.pinimg.com/736x/bf/2a/41/bf2a4105811a1cac20cef1a067ee8c63.jpg",
        popular: true,
        spicy: false,
        vegetarian: true,
        prepTime: "15 min"
      },
      {
        id: 2,
        name: "Burrata & Heirloom Tomatoes",
        desc: "Creamy burrata cheese with seasonal heirloom tomatoes and aromatic basil oil",
        price: 1450,
        priceLabel: "Rs. 1,450",
        img: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600&q=80",
        popular: false,
        spicy: false,
        vegetarian: true,
        prepTime: "10 min"
      },
      {
        id: 3,
        name: "Seared Scallops",
        desc: "Pan-seared sea scallops on cauliflower purée topped with Osetra caviar",
        price: 1850,
        priceLabel: "Rs. 1,850",
        img: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&q=80",
        popular: true,
        spicy: false,
        vegetarian: false,
        prepTime: "18 min"
      }
    ]
  },
  {
    id: "mains",
    name: "Main Courses",
    icon: "🍽️",
    color: "amber",
    items: [
      {
        id: 4,
        name: "Slow-cooked Short Rib",
        desc: "48-hour braised beef ribs in red wine reduction with root vegetables",
        price: 2850,
        priceLabel: "Rs. 2,850",
        img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
        popular: true,
        spicy: false,
        vegetarian: false,
        prepTime: "25 min"
      },
      {
        id: 5,
        name: "Black Truffle Risotto",
        desc: "Creamy Arborio rice finished with generous black truffle shavings",
        price: 1450,
        priceLabel: "Rs. 1,450",
        img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80",
        popular: false,
        spicy: false,
        vegetarian: true,
        prepTime: "20 min"
      },
      {
        id: 6,
        name: "Charcoal Grilled Salmon",
        desc: "Wild Atlantic salmon with lemon-herb butter and seasonal vegetables",
        price: 1650,
        priceLabel: "Rs. 1,650",
        img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
        popular: true,
        spicy: false,
        vegetarian: false,
        prepTime: "22 min"
      },
      {
        id: 7,
        name: "Herb-crusted Rack of Lamb",
        desc: "New Zealand lamb rack with rosemary jus and roasted root vegetables",
        price: 2250,
        priceLabel: "Rs. 2,250",
        img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80",
        popular: false,
        spicy: false,
        vegetarian: false,
        prepTime: "28 min"
      }
    ]
  },
  {
    id: "desserts",
    name: "Desserts",
    icon: "🍰",
    color: "pink",
    items: [
      {
        id: 8,
        name: "Molten Chocolate Soufflé",
        desc: "Dark Belgian chocolate soufflé with vanilla bean ice cream",
        price: 850,
        priceLabel: "Rs. 850",
        img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80",
        popular: true,
        spicy: false,
        vegetarian: true,
        prepTime: "15 min"
      },
      {
        id: 9,
        name: "Classic Tiramisu",
        desc: "Traditional Italian dessert with espresso-soaked ladyfingers and mascarpone",
        price: 750,
        priceLabel: "Rs. 750",
        img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80",
        popular: false,
        spicy: false,
        vegetarian: true,
        prepTime: "12 min"
      },
      {
        id: 10,
        name: "Crème Brûlée",
        desc: "Silky vanilla custard with perfectly caramelized sugar crust",
        price: 650,
        priceLabel: "Rs. 650",
        img: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80",
        popular: true,
        spicy: false,
        vegetarian: true,
        prepTime: "10 min"
      }
    ]
  },
  {
    id: "beverages",
    name: "Beverages",
    icon: "☕",
    color: "blue",
    items: [
      {
        id: 11,
        name: "Signature Cocktails",
        desc: "Seasonal cocktails crafted with premium spirits and fresh ingredients",
        price: 1050,
        priceLabel: "Rs. 850 - 1,250",
        img: "https://images.unsplash.com/photo-1514362545857-3bc16c43767d?w=600&q=80",
        popular: true,
        spicy: false,
        vegetarian: true,
        prepTime: "8 min"
      },
      {
        id: 12,
        name: "Curated Wine Selection",
        desc: "Handpicked wines from local and international vineyards",
        price: 2250,
        priceLabel: "Rs. 1,250 - 3,500",
        img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80",
        popular: false,
        spicy: false,
        vegetarian: true,
        prepTime: "5 min"
      },
      {
        id: 13,
        name: "Artisan Coffee",
        desc: "Single-origin beans roasted in-house and brewed to perfection",
        price: 550,
        priceLabel: "Rs. 450 - 650",
        img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
        popular: true,
        spicy: false,
        vegetarian: true,
        prepTime: "5 min"
      }
    ]
  }
];

const menuFallbackImage = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FFF4E8"/>
        <stop offset="100%" stop-color="#FDE7D2"/>
      </linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#F97316"/>
        <stop offset="100%" stop-color="#EA580C"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" rx="48" fill="url(#bg)"/>
    <circle cx="400" cy="280" r="130" fill="#fff" opacity="0.78"/>
    <circle cx="400" cy="280" r="92" fill="#F97316" opacity="0.12"/>
    <circle cx="400" cy="280" r="55" fill="url(#accent)" opacity="0.92"/>
    <path d="M150 155c0 0 58 48 58 110s-58 110-58 110" fill="none" stroke="#F97316" stroke-width="14" stroke-linecap="round" opacity="0.35"/>
    <path d="M650 155c0 0-58 48-58 110s58 110 58 110" fill="none" stroke="#F97316" stroke-width="14" stroke-linecap="round" opacity="0.35"/>
    <text x="400" y="488" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="700" fill="#1F2937">Dish image coming soon</text>
  </svg>
`);

const handleMenuImageError = (event) => {
  if (event.currentTarget.src !== menuFallbackImage) {
    event.currentTarget.src = menuFallbackImage;
  }
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const [backendMenuItems, setBackendMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch menu items from backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu');
        const data = await response.json();
        setBackendMenuItems(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching menu:', error);
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const savedFavorites = window.localStorage.getItem("foodzone-menu-favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch {
        window.localStorage.removeItem("foodzone-menu-favorites");
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("foodzone-menu-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const allItems = menuCategories.flatMap((category) =>
    category.items.map((item) => ({
      ...item,
      categoryId: category.id,
      categoryName: category.name,
      categoryIcon: category.icon,
    }))
  );
  
  const activeCategoryData = activeCategory === "all"
    ? { items: allItems }
    : menuCategories.find(category => category.id === activeCategory);

  // Filter items based on search
  const filteredItems = activeCategoryData.items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total menu stats
  const totalItems = menuCategories.reduce((sum, cat) => sum + cat.items.length, 0);
  const popularItems = menuCategories.reduce((sum, cat) => 
    sum + cat.items.filter(item => item.popular).length, 0
  );
  const avgPrice = Math.round(
    menuCategories.reduce((sum, cat) => 
      sum + cat.items.reduce((s, item) => s + item.price, 0), 0
    ) / totalItems
  );
  const happyCustomers = 1000;

  const toggleFavorite = (itemId) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="menu-page-shell min-h-screen" style={{ backgroundColor: 'var(--background-color)' }}>
      <div className="section-container menu-page-top">
        <div className="menu-hero fade-up">
          <div className="menu-hero-pill">
            <UtensilsCrossed size={14} />
            <span>Our Menu</span>
          </div>
          <h1 className="menu-hero-title text-gray-900">
            Our Popular <span className="text-orange-500">Dishes</span>
          </h1>
          <div className="menu-hero-divider">
            <span className="menu-hero-divider-line" />
            <span className="menu-hero-divider-icon">✻</span>
            <span className="menu-hero-divider-line" />
          </div>
          <p className="menu-hero-subtitle">
            Discover our chef's signature creations, crafted with passion and the finest seasonal ingredients.
          </p>
        </div>

        {/* Stats Section */}
        <SiteCardsGrid columns={5} className="menu-stats-grid" style={{ marginBottom: "60px" }}>
          <SiteStatCard icon={UtensilsCrossed} value={totalItems} label="Total Dishes" />
          <SiteStatCard icon={TrendingUp} iconWrapClass="site-card-icon-wrap--emerald" value={popularItems} label="Popular Items" />
          <SiteStatCard icon={Award} iconWrapClass="site-card-icon-wrap--blue" value={menuCategories.length} label="Categories" />
          <SiteStatCard icon={Star} iconWrapClass="site-card-icon-wrap--amber" value={`Rs. ${avgPrice}`} label="Avg Price" />
          <SiteStatCard icon={Heart} iconWrapClass="site-card-icon-wrap--rose" value={`${happyCustomers.toLocaleString()}+`} label="Happy Customers" />
        </SiteCardsGrid>

        {/* Category Navigation */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10 menu-controls">
          <div className="flex flex-wrap justify-center gap-3 menu-category-tabs">
            {[
              { id: "all", name: "All Items", icon: UtensilsCrossed },
              { id: "mains", name: "Main Course", icon: UtensilsCrossed },
              { id: "desserts", name: "Desserts", icon: UtensilsCrossed },
              { id: "beverages", name: "Beverages", icon: UtensilsCrossed },
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`group relative px-6 py-4 text-base font-semibold rounded-2xl transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-xl scale-105"
                    : "bg-white text-ink/70 border-2 border-gray-200 hover:border-gold-300 hover:shadow-lg"
                }`}
              >
                <span className="flex items-center gap-2">
                  <category.icon size={18} />
                  {category.name}
                </span>
                {activeCategory === category.id && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-80">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-gold-500 focus:outline-none transition-colors text-base"
            />
          </div>
        </div>

        {/* Results Count */}
        {searchQuery && (
          <div className="mb-6 text-center">
            <p className="text-ink/60">
              Found <span className="font-bold text-charcoal-900">{filteredItems.length}</span> dish{filteredItems.length !== 1 ? 'es' : ''} matching "{searchQuery}"
            </p>
          </div>
        )}
        
        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-charcoal-900 mb-2">No dishes found</h3>
            <p className="text-ink/60">Try searching with different keywords</p>
          </div>
        ) : (
          <SiteCardsGrid className="mb-14 menu-items-grid">
            {filteredItems.map((item) => (
              <SiteCard
                key={item.id}
                image={item.img}
                imageAlt={item.name}
                badge={item.popular ? "Bestseller" : item.categoryName}
                badgeDot={item.popular ? "#f97316" : "#3b82f6"}
                title={item.name}
                description={item.desc}
                tags={[
                  item.priceLabel,
                  item.prepTime,
                  item.vegetarian ? "Veg" : null,
                  item.spicy ? "Spicy" : null,
                ].filter(Boolean)}
                onImageError={handleMenuImageError}
                mediaChildren={
                  <button
                    type="button"
                    onClick={() => toggleFavorite(item.id)}
                    aria-label={favorites.includes(item.id) ? `Unlike ${item.name}` : `Like ${item.name}`}
                    aria-pressed={favorites.includes(item.id)}
                    className="site-card-media-action"
                  >
                    <Heart
                      size={16}
                      className={favorites.includes(item.id) ? "text-red-500 fill-red-500" : "text-gray-400"}
                    />
                  </button>
                }
                footer={
                  <div className="site-card-footer">
                    <p className="site-card-price">{item.priceLabel}</p>
                    <button 
                      type="button" 
                      onClick={() => addToCart(item)}
                      className="site-card-tag" 
                      style={{ background: "#f97316", color: "#fff" }}
                    >
                      <ShoppingCart size={14} style={{ display: "inline", marginRight: "6px" }} />
                      Add
                    </button>
                  </div>
                }
              />
            ))}
          </SiteCardsGrid>
        )}
        
        {/* Call to Action Section */}
        <div className="menu-cta-wrap text-center relative overflow-hidden mb-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-6">
              <UtensilsCrossed size={28} className="text-white" />
            </div>
              <h2 className="text-4xl font-display font-bold text-charcoal-900 mb-4">
              Ready to Experience Culinary Excellence?
            </h2>
            <p className="text-charcoal-800/80 text-lg mb-8 leading-relaxed">
              Reserve your table now and savor our exceptional cuisine in an elegant, sophisticated ambiance. 
              Your unforgettable dining experience awaits.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 menu-cta-actions">
              <Link 
                to="/reservations" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-orange-600 font-bold hover:shadow-2xl transition-all"
              >
                Reserve a Table
                <ArrowRight size={18} />
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/60 text-white font-semibold hover:bg-white/10 transition-all"
              >
                Contact Us
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <SiteCardsGrid columns={3} className="menu-features-grid">
          {[
            {
              icon: Award,
              title: "Award-Winning Chef",
              desc: "Led by internationally acclaimed culinary experts"
            },
            {
              icon: Leaf,
              title: "Fresh Local Ingredients",
              desc: "Sourced daily from trusted local farms and suppliers"
            },
            {
              icon: UtensilsCrossed,
              title: "Custom Menus",
              desc: "Personalized dining experiences for special occasions"
            }
          ].map((feature, i) => {
            const Icon = feature.icon;
            const iconWraps = [
              "site-card-icon-wrap--amber",
              "site-card-icon-wrap--green",
              "site-card-icon-wrap--orange",
            ];
            return (
              <SiteCard
                key={i}
                icon={Icon}
                iconWrapClass={iconWraps[i]}
                title={feature.title}
                description={feature.desc}
              />
            );
          })}
        </SiteCardsGrid>
      </div>
    </div>
  );
}
