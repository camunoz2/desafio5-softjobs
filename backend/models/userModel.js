import { queryDatabase } from "../config/db.js";

export const getAllUsers = async () => {
  const query = "select * from usuarios";
  const users = await queryDatabase(query);
  return users;
};

export const createUser = async () => {
  const query = "insert into ususarios (email, password, rol, language)";
  const values = [email, password, rol, language];
  const newUser = await queryDatabase(query, values);
  return newUser;
};
