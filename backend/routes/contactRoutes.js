const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  handleContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const router = express.Router();

router.post("/", handleContact);
router.get("/", authMiddleware, getContacts);
router.put("/:id", authMiddleware, updateContact);
router.delete("/:id", authMiddleware, deleteContact);
module.exports = router;
