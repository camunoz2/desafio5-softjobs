import pg from "pg";

const { Client } = pg;

let client;

export const connectToDatabase = async () => {
  if (!client) {
    client = new Client({
      user: "desafiolatam",
      password: "desafiolatam",
      database: "softjobs",
      host: "localhost",
      port: 5432,
    });
    await client.connect();
    console.log("Connected to the PostgreSQL database");
  }
};

export const queryDatabase = async (query, params = []) => {
  if (!client) {
    throw new Error(
      "Database client is not connected. Call connectToDatabase first.",
    );
  }

  try {
    const res = await client.query(query, params);
    return res.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};

export const closeDatabase = async () => {
  if (client) {
    await client.end();
    console.log("Disconnected from the PostgreSQL database");
    client = null;
  }
};
