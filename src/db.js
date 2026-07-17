import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

// import.meta.url = file:///home/subikstha/projects/frontend%20masters/notes-cli/src/db.js
// DB_PATH = /home/subikstha/frontend%20masters/notes-cli/src/db.json

// const DB_PATH = new URL("../db.json", import.meta.url).pathname;
const DB_PATH = fileURLToPath(new URL("../db.json", import.meta.url));

export const getDB = async () => {
  const db = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(db);
};

export const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
};

export const insert = async (data) => {
  const db = await getDB();
  db.notes.push(data);
  await saveDB(db);
  return data;
};
