import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.use("/usuarios", userRoutes);

app.use((req, res) => {
  res.status(400).json({ error: "Page not found" });
});

export default app;
