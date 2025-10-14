// src/stores/userStore.ts
import { readDB, writeDB } from "../utils/db";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

/**
 * Decorador para agregar defaults al crear un usuario (role y createdAt)
 * sin tocar la lógica base.
 */
export function AddDefaultsOnCreate() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const [payload] = args;
      const withDefaults = {
        role: "user",
        createdAt: Date.now(),
        ...payload,
      };
      return await original.apply(this, [withDefaults]);
    };
    return descriptor;
  };
}

export class UserStore {
  private log(method: string, path: string) {
    console.log(`[HTTP SIM] ${method} ${path} - ${new Date().toISOString()}`);
  }

  async list() {
    this.log("GET", "/users");
    const db = await readDB();
    db.users = db.users || [];
    // no exponemos hash
    return db.users.map((u: any) => ({ ...u, passwordHash: undefined }));
  }

  async findByName(username: string) {
    this.log("GET", `/users?username=${username}`);
    const db = await readDB();
    db.users = db.users || [];
    const user = db.users.find((u: any) => u.username === username);
    return user ? { ...user, passwordHash: undefined } : null;
  }

  async findByEmail(email: string) {
    this.log("GET", `/users?email=${email}`);
    const db = await readDB();
    db.users = db.users || [];
    const user = db.users.find((u: any) => u.email === email);
    return user ? { ...user, passwordHash: undefined } : null;
  }

  async findRawByEmailOrUsername(emailOrUser: string) {
    const db = await readDB();
    db.users = db.users || [];
    return db.users.find(
      (u: any) => u.email === emailOrUser || u.username === emailOrUser
    );
  }

  @AddDefaultsOnCreate()
  async create(payload: {
    username: string;
    email: string;
    password: string;
    role?: "user" | "admin";
    createdAt?: number;
  }) {
    this.log("POST", "/users");
    const db = await readDB();
    db.users = db.users || [];

    // unicidad por username y email
    if (db.users.some((u: any) => u.username === payload.username)) {
      throw new Error("Username ya existe");
    }
    if (db.users.some((u: any) => u.email === payload.email)) {
      throw new Error("Email ya existe");
    }

    const passwordHash = await bcrypt.hash(payload.password, 10);
    const user = {
      id: uuidv4(),
      username: payload.username,
      email: payload.email,
      role: payload.role ?? "user",
      createdAt: payload.createdAt ?? Date.now(),
      passwordHash,
    };

    db.users.push(user);
    await writeDB(db);
    return { ...user, passwordHash: undefined };
  }

  async update(id: string, patch: Partial<{ username: string; email: string; role: string; password: string }>) {
    this.log("PATCH", `/users/${id}`);
    const db = await readDB();
    db.users = db.users || [];
    const idx = db.users.findIndex((u: any) => u.id === id);
    if (idx === -1) throw new Error("Usuario no encontrado");

    const user = db.users[idx];
    if (patch.username && patch.username !== user.username) {
      if (db.users.some((u: any) => u.username === patch.username)) {
        throw new Error("Username ya existe");
      }
      user.username = patch.username;
    }
    if (patch.email && patch.email !== user.email) {
      if (db.users.some((u: any) => u.email === patch.email)) {
        throw new Error("Email ya existe");
      }
      user.email = patch.email;
    }
    if (patch.role) user.role = patch.role;
    if (patch.password) user.passwordHash = await bcrypt.hash(patch.password, 10);

    db.users[idx] = user;
    await writeDB(db);
    return { ...user, passwordHash: undefined };
  }

  async remove(id: string) {
    this.log("DELETE", `/users/${id}`);
    const db = await readDB();
    db.users = db.users || [];
    db.users = db.users.filter((u: any) => u.id !== id);
    await writeDB(db);
    return true;
  }
}
