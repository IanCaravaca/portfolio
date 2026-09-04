const pool = require("../db");
const validateContact = (name, email, message) => {
  if (!name || !email || !message) {
    return {
      error: "Todos los campos son obligatorios",
    };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return {
      error: "Los campos no pueden contener solo espacios",
    };
  }
  if (cleanName.length < 2) {
    return {
      error: "El nombre debe tener al menos 2 caracteres",
    };
  }

  if (!emailRegex.test(cleanEmail)) {
    return {
      error: "El email no tiene un formato válido",
    };
  }
  if (cleanMessage.length < 10) {
    return {
      error: "El mensaje debe tener al menos 10 caracteres",
    };
  }
  return {
    cleanName,
    cleanEmail,
    cleanMessage,
  };
};
const handleContact = async (req, res) => {
  const { name, email, message } = req.body;
  const validation = validateContact(name, email, message);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error,
    });
  }

  const { cleanName, cleanEmail, cleanMessage } = validation;

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
const getContacts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contacts");

    res.json(result.rows);
  } catch (error) {
    console.log("Error al obtener los contactos:", error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, message } = req.body;
  const validation = validateContact(name, email, message);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error,
    });
  }
  const { cleanName, cleanEmail, cleanMessage } = validation;
  try {
    const result = await pool.query(
      `UPDATE contacts
     SET name = $1, email = $2, message = $3
     WHERE id = $4
     RETURNING *`,
      [cleanName, cleanEmail, cleanMessage, id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Contacto no encontrado",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log("Error al actualizar el contacto:", error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM contacts
       WHERE id = $1
       RETURNING *`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Contacto no encontrado",
      });
    }

    res.json({
      message: "Contacto eliminado correctamente",
      contact: result.rows[0],
    });
  } catch (error) {
    console.log("Error al eliminar el contacto:", error);

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

module.exports = {
  handleContact,
  getContacts,
  updateContact,
  deleteContact,
};
