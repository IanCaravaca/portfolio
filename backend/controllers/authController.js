const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email y contraseña son obligatorios",
    });
  }
  if (password.length < 8) {
    return res.status(400).json({
      message: "La contraseña debe tener al menos 8 caracteres",
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (email, password_hash)
     VALUES ($1, $2)
     RETURNING *`,
      [email, passwordHash],
    );

    res.status(201).json({
      message: "Usuario creado correctamente",
    });
  } catch (error) {
    console.log("Error al crear usuario:", error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email y contraseña son obligatorios",
    });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM users
       WHERE email = $1`,
      [email],
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
module.exports = {
  register,
  login,
};
