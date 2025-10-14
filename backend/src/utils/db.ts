// src/utils/db.ts
import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(__dirname, "../../db.json");

// cola simple para serializar writes
let writeQueue: Promise<void> = Promise.resolve();

export async function readDB(): Promise<any> {
  const raw = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(raw || "{}");
}

export async function writeDB(data: any): Promise<void> {
  // serializar escritura evitando condiciones de carrera
  writeQueue = writeQueue.then(async () => {
    const tmp = `${DB_PATH}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf-8");
    await fs.rename(tmp, DB_PATH);
  }).catch(err => {
    console.error("Error en writeDB:", err);
  });
  return writeQueue;
}
