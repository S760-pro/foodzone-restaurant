const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  createContact,
  getAllContacts,
  updateContactStatus
} = require("../controllers/contactController");

// Public route - anyone can submit contact form
router.post("/", createContact);

// Protected admin routes
router.get("/", protect, authorize("admin", "staff"), getAllContacts);
router.put("/:id/status", protect, authorize("admin", "staff"), updateContactStatus);

module.exports = router;
