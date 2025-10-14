// src/services/apiService.ts
const API_URL = "http://localhost:4000";

export const api = {
  async register(userData: { username: string; email: string; password: string }) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error((await res.json()).message);
    return res.json(); // { token, user }
  },

  async login(credentials: { usernameOrEmail: string; password: string }) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error((await res.json()).message);
    return res.json(); // { token, user }
  },

  async getProducts() {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error("Error al cargar productos");
    return res.json();
  },

  async createProduct(product: any, token: string) {
    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error((await res.json()).message);
    return res.json();
  },

  async updateProduct(id: string, product: any, token: string) {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error((await res.json()).message);
    return res.json();
  },

  async deleteProduct(id: string, token: string) {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error((await res.json()).message);
    return res.json();
  },
};
