import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "desafiolatam",
  database: "softjobs",
  password: "desafiolatam",
  host: "localhost",
  port: 5432,
});

export const pgQuery = async (queryString, params = []) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(queryString, params);
    console.log(result.rows);
    return result.rows;
  } catch (e) {
    console.error("Error en la query:", e);
    throw e;
  } finally {
    if (client) client.release();
  }
};
