const express = require("express");
const {
  getTables,
  createTable,
  updateTable,
  deleteTable,
} = require("../controllers/tableController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getTables);
router.post("/", protect, authorize("admin", "staff"), createTable);
router.put("/:id", protect, authorize("admin", "staff"), updateTable);
router.delete("/:id", protect, authorize("admin"), deleteTable);

module.exports = router;
