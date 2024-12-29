import express from "express";

const app = express();

app.get("/", async (req, res) => {
  res.send("Connected to /");
});

app.listen(3000, () => {
  console.log("Server connected");
});
