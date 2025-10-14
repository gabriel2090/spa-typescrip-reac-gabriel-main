// src/routes/products.ts
import express from "express";
import { readDB, writeDB } from "../utils/db";
import { v4 as uuidv4 } from "uuid";
import { authMiddleware, requireRole, AuthRequest } from "../middlewares/auth";

const router = express.Router();

/** GET /products?category=&brand=  (público) */
router.get("/", async (req, res) => {
  try {
    const { category, brand } = req.query;
    const db = await readDB();
    let products = db.products || [];
    if (category) products = products.filter((p: any) => p.category === category);
    if (brand) products = products.filter((p: any) => p.brand === brand);
    return res.json(products);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

/** GET /products/:id (público) */
router.get("/:id", async (req, res) => {
  try {
    const db = await readDB();
    const p = (db.products || []).find((x: any) => x.id === req.params.id);
    if (!p) return res.status(404).json({ message: "Producto no encontrado" });
    return res.json(p);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

/** POST /products (admin) */
router.post("/", authMiddleware, requireRole("admin"), async (req: AuthRequest, res) => {
  try {
    const { sku, name, brand, category, quantity, price, isActive = true, imageUrl } = req.body || {};
    if (!sku || !name) return res.status(400).json({ message: "sku y name son obligatorios" });

    const db = await readDB();
    db.products = db.products || [];

    // SKU único
    if (db.products.some((p: any) => p.sku === sku)) {
      return res.status(409).json({ message: "SKU ya existe" });
    }

    // Validaciones básicas
    if (quantity != null && quantity < 0) return res.status(400).json({ message: "quantity no puede ser negativa" });
    if (price != null && price < 0) return res.status(400).json({ message: "price no puede ser negativo" });

    const product = {
      id: uuidv4(),
      sku,
      name,
      brand: brand ?? "",
      category: category ?? "",
      quantity: quantity ?? 0,
      price: price ?? 0,
      isActive,
      imageUrl: imageUrl ?? "",
      createdAt: Date.now(),
    };

    db.products.push(product);
    await writeDB(db);
    console.log(`[HTTP SIM] POST /products - ${new Date().toISOString()}`);
    return res.status(201).json(product);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

/** PUT /products/:id (admin) */
router.put("/:id", authMiddleware, requireRole("admin"), async (req: AuthRequest, res) => {
  try {
    const db = await readDB();
    db.products = db.products || [];
    const idx = db.products.findIndex((p: any) => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: "Producto no encontrado" });

    const current = db.products[idx];
    const patch = req.body || {};

    // validar SKU único si cambia
    if (patch.sku && patch.sku !== current.sku) {
      if (db.products.some((p: any) => p.sku === patch.sku)) {
        return res.status(409).json({ message: "SKU ya existe" });
      }
    }
    if (patch.quantity != null && patch.quantity < 0) return res.status(400).json({ message: "quantity no puede ser negativa" });
    if (patch.price != null && patch.price < 0) return res.status(400).json({ message: "price no puede ser negativo" });

    db.products[idx] = { ...current, ...patch, updatedAt: Date.now() };
    await writeDB(db);
    console.log(`[HTTP SIM] PUT /products/${req.params.id} - ${new Date().toISOString()}`);
    return res.json(db.products[idx]);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

/** DELETE /products/:id (admin) */
router.delete("/:id", authMiddleware, requireRole("admin"), async (req: AuthRequest, res) => {
  try {
    const db = await readDB();
    db.products = db.products || [];
    db.products = db.products.filter((p: any) => p.id !== req.params.id);
    await writeDB(db);
    console.log(`[HTTP SIM] DELETE /products/${req.params.id} - ${new Date().toISOString()}`);
    return res.json({ ok: true });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
