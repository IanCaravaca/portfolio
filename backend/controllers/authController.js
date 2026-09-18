const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email y contraseña son obligatorios",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const result = await pool.query(
      `SELECT * FROM users
       WHERE email = $1`,
      [normalizedEmail],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({
      message: "Login correcto",
      token: token,
    });
  } catch (error) {
    console.log("Error al iniciar sesión:", error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
module.exports = { login };
