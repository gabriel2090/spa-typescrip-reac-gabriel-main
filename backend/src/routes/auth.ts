import express from "express";
import jwt, { type Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { UserStore } from "../stores/userStore";

dotenv.config();

const JWT_SECRET: Secret = (process.env.JWT_SECRET || "secret") as Secret;
const JWT_EXPIRES_IN: string | number = process.env.JWT_EXPIRES_IN || "8h";

const router = express.Router();
const store = new UserStore();

/**
 * POST /auth/register
 * body: { username, email, password }
 * devuelve: { token, user }
 */
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body || {};
    if (!username || !email || !password) {
      return res.status(400).json({ message: "username, email y password son obligatorios" });
    }

    const user = await store.create({ username, email, password });

    const payload = { id: user.id, username: user.username, email: user.email, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.status(201).json({ token, user: payload });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
});

/**
 * POST /auth/login
 * body: { usernameOrEmail, password }
 * devuelve: { token, user }
 */
router.post("/login", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body || {};
    if (!usernameOrEmail || !password) {
      return res.status(400).json({ message: "usernameOrEmail y password son obligatorios" });
    }

    const raw = await store.findRawByEmailOrUsername(usernameOrEmail);
    if (!raw) return res.status(401).json({ message: "Credenciales inválidas" });

    const ok = await bcrypt.compare(password, raw.passwordHash);
    if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });

    const payload = { id: raw.id, username: raw.username, email: raw.email, role: raw.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return res.json({ token, user: payload });
  } catch (err: any) {
    return res.status(500).json({ message: "Error en login", detail: err.message });
  }
});

export default router;
