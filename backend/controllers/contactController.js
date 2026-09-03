const pool = require("../db");
const handleContact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
    });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return res.status(400).json({
      message: "Los campos no pueden contener solo espacios",
    });
  }

  if (cleanName.length < 2) {
    return res.status(400).json({
      message: "El nombre debe tener al menos 2 caracteres",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(cleanEmail)) {
    return res.status(400).json({
      message: "El email no tiene un formato válido",
    });
  }

  if (cleanMessage.length < 10) {
    return res.status(400).json({
      message: "El mensaje debe tener al menos 10 caracteres",
    });
  }

  console.log("Nombre:", cleanName);
  console.log("Email:", cleanEmail);
  console.log("Mensaje:", cleanMessage);
  try {
    const result = await pool.query(
      `INSERT INTO contacts (name, email, message)
   VALUES ($1, $2, $3)
   RETURNING *`,
      [cleanName, cleanEmail, cleanMessage],
    );

    res.status(201).json({
      message: "Contacto guardado correctamente",
      contact: result.rows[0],
    });
  } catch (error) {
    console.log("Error al guardar el contacto:", error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

module.exports = {
  handleContact,
};
