import React, { useEffect, useState } from "react";
import { api } from "../services/apiService";

type Product = {
  id: string;
  sku: string;
  name: string;
  brand?: string;
  category?: string;
  quantity?: number;
  price?: number;
  isActive?: boolean;
  imageUrl?: string;
};

const UserCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const load = async () => {
    try {
      const list = await api.getProducts();
      // solo activos y con stock
      setProducts(list.filter((p: Product) => p.isActive !== false && (p.quantity ?? 0) > 0));
    } catch (e: any) {
      setMsg(e.message || "Error al cargar productos");
    }
  };

  useEffect(() => { load(); }, []);

  const buy = async (p: Product) => {
    setMsg(null);
    if (!user || !token) {
      setMsg("Debes iniciar sesión");
      return;
    }
    try {
      await api.createOrder({
        items: [{ productId: p.id, quantity: 1 }],
      }, token);
      setMsg(`Compra realizada: ${p.name}`);
      // refresca stock
      load();
    } catch (e: any) {
      setMsg(e.message || "No se pudo completar la compra");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Catálogo</h1>
      {msg && <div className="mb-4 p-2 bg-yellow-50 rounded text-sm">{msg}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {products.map((p) => (
          <div key={p.id} className="border rounded p-3 flex flex-col">
            {p.imageUrl ? (
              <img src={p.imageUrl} alt={p.name} className="w-full h-40 object-cover rounded mb-3" />
            ) : (
              <div className="w-full h-40 bg-gray-100 rounded mb-3 grid place-items-center text-sm text-gray-500">
                Sin imagen
              </div>
            )}
            <h2 className="font-semibold">{p.name}</h2>
            <p className="text-sm text-gray-600">{p.brand} · {p.category}</p>
            <p className="mt-1"><b>${p.price?.toFixed?.(2) ?? p.price}</b></p>
            <p className="text-sm text-gray-500">Stock: {p.quantity}</p>
            <button
              className="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={(p.quantity ?? 0) < 1}
              onClick={() => buy(p)}
            >
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCatalog;
