const mongoose = require("mongoose");
const dotenv = require("dotenv");
const MenuItem = require("./models/MenuItem");
const Room = require("./models/Room");

dotenv.config();

const menuItems = [
  {
    name: "Truffle Arancini",
    category: "appetizers",
    price: 1250,
    description: "Crispy Italian risotto balls infused with black truffle and aged parmesan",
    image: "https://i.pinimg.com/736x/bf/2a/41/bf2a4105811a1cac20cef1a067ee8c63.jpg",
    isAvailable: true
  },
  {
    name: "Burrata & Heirloom Tomatoes",
    category: "appetizers",
    price: 1450,
    description: "Creamy burrata cheese with seasonal heirloom tomatoes and aromatic basil oil",
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600&q=80",
    isAvailable: true
  },
  {
    name: "Slow-cooked Short Rib",
    category: "mains",
    price: 2850,
    description: "48-hour braised beef ribs in red wine reduction with root vegetables",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    isAvailable: true
  },
  {
    name: "Charcoal Grilled Salmon",
    category: "mains",
    price: 1650,
    description: "Wild Atlantic salmon with lemon-herb butter and seasonal vegetables",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
    isAvailable: true
  },
  {
    name: "Molten Chocolate Soufflé",
    category: "desserts",
    price: 850,
    description: "Dark Belgian chocolate soufflé with vanilla bean ice cream",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80",
    isAvailable: true
  }
];

const rooms = [
  {
    roomNumber: "101",
    type: "Deluxe Room",
    price: 8500,
    capacity: 2,
    description: "Experience comfort with stunning city views, a luxurious king bed, and a modern rain shower.",
    amenities: ["Free WiFi", "Air Conditioning", "Flat Screen TV", "Mini Bar", "Rain Shower", "Work Desk"],
    images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80"],
    isAvailable: true
  },
  {
    roomNumber: "201",
    type: "Executive Suite",
    price: 14000,
    capacity: 4,
    description: "Spacious suite with separate lounge area, smart entertainment, and exclusive amenities.",
    amenities: ["Free WiFi", "Air Conditioning", "Living Area", "Kitchenette", "Smart TV", "Minibar"],
    images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80"],
    isAvailable: true
  },
  {
    roomNumber: "301",
    type: "Garden View",
    price: 10500,
    capacity: 3,
    description: "Relax in a serene setting with lush garden views, twin beds, and a private patio.",
    amenities: ["Free WiFi", "Air Conditioning", "Private Balcony", "Garden View", "Tea Service", "Rainfall Shower"],
    images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80"],
    isAvailable: true
  },
  {
    roomNumber: "401",
    type: "Presidential Suite",
    price: 22000,
    capacity: 5,
    description: "Our most luxurious offering with panoramic views, private terrace, and personalized service.",
    amenities: ["Free WiFi", "Jacuzzi", "Private Terrace", "Butler Service", "Dining Area", "Premium Bar"],
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"],
    isAvailable: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Clear existing data
    await MenuItem.deleteMany({});
    await Room.deleteMany({});
    console.log("Cleared existing data");

    // Insert menu items
    await MenuItem.insertMany(menuItems);
    console.log("Menu items added");

    // Insert rooms
    await Room.insertMany(rooms);
    console.log("Rooms added");

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
