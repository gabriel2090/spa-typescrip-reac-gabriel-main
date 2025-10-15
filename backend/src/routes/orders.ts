// backend/src/routes/orders.ts
import express from "express";
import { readDB, writeDB } from "../utils/db";
import { v4 as uuidv4 } from "uuid";
import { authMiddleware, AuthRequest } from "../middlewares/auth";

const router = express.Router();

// crear orden
router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { items } = req.body || {};
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "items requerido" });
    }
    const db = await readDB();
    db.orders = db.orders || [];
    db.products = db.products || [];

    // validar stock y descontar
    for (const it of items) {
      const p = db.products.find((x: any) => x.id === it.productId);
      if (!p) return res.status(404).json({ message: "Producto no encontrado" });
      if ((p.quantity ?? 0) < it.quantity) {
        return res.status(400).json({ message: `Stock insuficiente para ${p.name}` });
      }
      p.quantity -= it.quantity;
    }

    const order = {
      id: uuidv4(),
      userId: (req as any).user.id,
      items,
      createdAt: Date.now(),
      status: "paid",
    };

    db.orders.push(order);
    await writeDB(db);
    return res.status(201).json(order);
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
});

// mis órdenes
router.get("/my", authMiddleware, async (req: AuthRequest, res) => {
  const db = await readDB();
  db.orders = db.orders || [];
  const mine = db.orders.filter((o: any) => o.userId === (req as any).user.id);
  return res.json(mine);
});

export default router;
