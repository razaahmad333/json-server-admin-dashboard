import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import dotenv from "dotenv";

dotenv.config();

const file = process.env.DB_FILE_ABS_PATH;

const adapter = new JSONFile(file);

const db = new Low(adapter, {});

export async function readDatabase() {
  await db.read();
  return db.data;
}

export async function writeDatabase(data) {
  await readDatabase();
  db.data = data;
  await db.write();
}

export default db;
