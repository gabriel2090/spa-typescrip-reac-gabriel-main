import React, { useEffect, useState } from "react";
import { api } from "../services/apiService";

interface Product {
  id?: string;
  sku: string;
  name: string;
  brand?: string;
  category?: string;
  quantity?: number;
  price?: number;
  isActive?: boolean;
  imageUrl?: string;
}

const empty: Product = {
  sku: "",
  name: "",
  brand: "",
  category: "",
  quantity: 0,
  price: 0,
  isActive: true,
  imageUrl: "",
};

const ProductsView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({ ...empty });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const isAdmin = user?.role === "admin";

  const load = async () => {
    try {
      const list = await api.getProducts();
      setProducts(list);
    } catch (e: any) {
      setMsg(e.message || "Error al cargar productos");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    try {
      if (!isAdmin) {
        setMsg("Permisos insuficientes");
        return;
      }
      if (!token) {
        setMsg("No autenticado");
        return;
      }
      if (editingId) {
        const updated = await api.updateProduct(editingId, form, token);
        setProducts((prev) => prev.map((p) => (p.id === editingId ? updated : p)));
        setEditingId(null);
        setForm({ ...empty });
        setMsg("Producto actualizado");
      } else {
        const created = await api.createProduct(form, token);
        setProducts((prev) => [created, ...prev]);
        setForm({ ...empty });
        setMsg("Producto creado");
      }
    } catch (err: any) {
      setMsg(err.message || "Error");
    }
  };

  const edit = (p: Product) => {
    setEditingId(p.id!);
    setForm({ ...p });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id: string) => {
    if (!isAdmin || !token) return;
    if (!confirm("¿Eliminar producto?")) return;
    try {
      await api.deleteProduct(id, token);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setMsg("Producto eliminado");
    } catch (err: any) {
      setMsg(err.message || "Error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Productos</h1>
        {isAdmin ? (
          <span className="text-sm bg-green-100 px-2 py-1 rounded">Rol: admin</span>
        ) : (
          <span className="text-sm bg-gray-100 px-2 py-1 rounded">Rol: user</span>
        )}
      </div>

      {msg && <div className="p-2 rounded bg-yellow-50 text-sm">{msg}</div>}

      {isAdmin && (
        <form onSubmit={submit} className="grid grid-cols-2 gap-3 border p-4 rounded">
          <input
            className="border p-2 rounded"
            placeholder="SKU"
            value={form.sku}
            onChange={(e) => setForm((s) => ({ ...s, sku: e.target.value }))}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Marca"
            value={form.brand}
            onChange={(e) => setForm((s) => ({ ...s, brand: e.target.value }))}
          />
          <input
            className="border p-2 rounded"
            placeholder="Categoría"
            value={form.category}
            onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
          />
          <input
            className="border p-2 rounded"
            type="number"
            min={0}
            placeholder="Cantidad"
            value={form.quantity}
            onChange={(e) => setForm((s) => ({ ...s, quantity: Number(e.target.value) }))}
          />
          <input
            className="border p-2 rounded"
            type="number"
            min={0}
            step="0.01"
            placeholder="Precio"
            value={form.price}
            onChange={(e) => setForm((s) => ({ ...s, price: Number(e.target.value) }))}
          />
          <input
            className="border p-2 rounded col-span-2"
            placeholder="Imagen URL"
            value={form.imageUrl}
            onChange={(e) => setForm((s) => ({ ...s, imageUrl: e.target.value }))}
          />

          {/* Vista previa de imagen */}
          {form.imageUrl && (
            <div className="col-span-2">
              <p className="text-xs text-gray-500 mb-1">Vista previa</p>
              <img
                src={form.imageUrl}
                alt="preview"
                className="w-32 h-32 object-cover rounded border"
                onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
              />
            </div>
          )}

          <label className="flex items-center gap-2 col-span-2">
            <input
              type="checkbox"
              checked={!!form.isActive}
              onChange={(e) => setForm((s) => ({ ...s, isActive: e.target.checked }))}
            />
            Activo
          </label>

          <div className="col-span-2 flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">
              {editingId ? "Guardar cambios" : "Crear producto"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({ ...empty });
                }}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {/* Nueva columna de imagen */}
            <th className="p-2 border">Imagen</th>
            <th className="p-2 border">SKU</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Precio</th>
            <th className="p-2 border">Cantidad</th>
            <th className="p-2 border">Estado</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="p-2 border">
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-14 h-14 object-cover rounded"
                    onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                  />
                ) : (
                  <span className="text-xs text-gray-400">Sin imagen</span>
                )}
              </td>
              <td className="p-2 border">{p.sku}</td>
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">
                {typeof p.price === "number" ? p.price.toFixed(2) : p.price}
              </td>
              <td className="p-2 border">{p.quantity}</td>
              <td className="p-2 border">{p.isActive ? "Activo" : "Inactivo"}</td>
              <td className="p-2 border">
                {isAdmin ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => edit(p)}
                      className="px-2 py-1 bg-amber-500 text-white text-sm rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => remove(p.id!)}
                      className="px-2 py-1 bg-red-500 text-white text-sm rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-gray-500">Solo lectura</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsView;
