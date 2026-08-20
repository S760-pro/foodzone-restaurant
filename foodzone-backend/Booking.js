const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookingType: { type: String, enum: ["room", "table"], required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    table: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
    checkIn: { type: Date },
    checkOut: { type: Date },
    reservationTime: { type: Date },
    partySize: { type: Number },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    totalAmount: { type: Number, required: true },
    specialRequests: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
