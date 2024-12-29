import { getAllUsers } from "../models/userModel.js";
import { connectToDatabase } from "../config/db.js";

export const fetchUsers = async (req, res) => {
  try {
    await connectToDatabase();
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (e) {
    console.error("Error fethcin users", e);
    res.status(500).send("Server error in user fetching");
  }
};
