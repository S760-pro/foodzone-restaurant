const express = require("express");
const {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getMenuItems);
router.post("/", protect, authorize("admin", "staff"), createMenuItem);
router.put("/:id", protect, authorize("admin", "staff"), updateMenuItem);
router.delete("/:id", protect, authorize("admin"), deleteMenuItem);

module.exports = router;
