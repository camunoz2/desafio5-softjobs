import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { pgQuery } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.EXPRESS_PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "muy_secreto";

// regitrar usuario
app.post("/usuarios", async (req, res) => {
  try {
    const { email, password, rol, lenguaje } = req.body;

    if (!email || !password || !rol || !lenguaje) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pgQuery(
      "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, hashedPassword, rol, lenguaje],
    );

    res
      .status(201)
      .json({ message: "Usuario registrado con exito", user: result[0] });
  } catch (e) {
    console.error("Error registrando usuario:", e);

    if (e.code === "23505") {
      return res.status(409).json({ error: "El email ya está registrado" });
    }

    res.status(500).json({ error: "Error en el servidor" });
  }
});

//logear user
// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email y contraseña son obligatorios" });
    }

    const result = await pgQuery("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);
    const user = result[0];

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (e) {
    console.error("Error en el login:", e);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en ${PORT}`);
});
