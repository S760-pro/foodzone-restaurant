const Booking = require("../models/Booking");
const Room = require("../models/Room");
const Table = require("../models/Table");

// @route POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({ ...req.body, user: req.user._id });

    // Mark room/table as unavailable
    if (booking.bookingType === "room" && booking.room)
      await Room.findByIdAndUpdate(booking.room, { isAvailable: false });
    if (booking.bookingType === "table" && booking.table)
      await Table.findByIdAndUpdate(booking.table, { isAvailable: false });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/bookings/my
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("room", "roomNumber type price")
      .populate("table", "tableNumber capacity")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/bookings  (admin/staff only)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user", "name email phone")
      .populate("room", "roomNumber type")
      .populate("table", "tableNumber capacity")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route PUT /api/bookings/:id/status
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route PUT /api/bookings/:id/cancel
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Only owner or admin can cancel
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== "admin")
      return res.status(403).json({ message: "Not authorized to cancel this booking" });

    booking.status = "cancelled";
    await booking.save();

    // Free up room/table
    if (booking.bookingType === "room" && booking.room)
      await Room.findByIdAndUpdate(booking.room, { isAvailable: true });
    if (booking.bookingType === "table" && booking.table)
      await Table.findByIdAndUpdate(booking.table, { isAvailable: true });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  cancelBooking,
};
