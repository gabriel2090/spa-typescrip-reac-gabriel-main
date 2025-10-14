import { api } from "../services/apiService";

export async function handleRegister(username: string, email: string, password: string) {
  try {
    const res = await api.register({ username, email, password });
    return res.user;
  } catch (error: any) {
    throw new Error(error.message || "Error al registrarse");
  }
}
