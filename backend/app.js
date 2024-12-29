import express from "express";

const app = express();

const PORT = process.env.EXPRESS_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en ${PORT}`);
});
