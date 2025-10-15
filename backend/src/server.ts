// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth";
import productsRoutes from "./routes/products";
import ordersRoutes from "./routes/orders"; // 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

//  Rutas de autenticación
app.use("/auth", authRoutes);

// CRUD de productos (admin)
app.use("/products", productsRoutes);

//  Órdenes (usuarios logueados)
app.use("/orders", ordersRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API backend listo. Revisa /auth, /products y /orders" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
