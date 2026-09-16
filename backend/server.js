require("dotenv").config();
const express = require("express");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

const server = app.listen(PORT, () => {
  console.log(`Servidor funcionando con Nodemon en el puerto ${PORT}`);
});

server.on("close", () => {
  console.log("⚠️ El servidor se cerró");
});

server.on("error", (error) => {
  console.log("❌ Error del servidor:", error);
});
