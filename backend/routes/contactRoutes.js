const express = require("express");
const {
  handleContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const router = express.Router();

router.post("/", handleContact);
router.get("/", getContacts);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);
module.exports = router;
