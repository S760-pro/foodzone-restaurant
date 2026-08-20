const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ── Middleware ──
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// ── Routes ──
app.use("/api/auth",     require("./routes/authRoutes"));
app.use("/api/rooms",    require("./routes/roomRoutes"));
app.use("/api/tables",   require("./routes/tableRoutes"));
app.use("/api/menu",     require("./routes/menuRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/orders",   require("./routes/orderRoutes"));
app.use("/api/reviews",  require("./routes/reviewRoutes"));
app.use("/api/contact",  require("./routes/contactRoutes"));

// ── Health check ──
app.get("/", (req, res) => {
  res.json({ message: "Food Zone API is running ✓", status: "ok" });
});

// ── 404 handler ──
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
