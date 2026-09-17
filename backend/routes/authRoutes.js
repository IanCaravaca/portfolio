const express = require("express");
const rateLimit = require("express-rate-limit");
const { login } = require("../controllers/authController");

const router = express.Router();
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    message: "Demasiados intentos. Intentá nuevamente en 15 minutos.",
  },
});
router.post("/login", loginLimiter, login);
module.exports = router;
