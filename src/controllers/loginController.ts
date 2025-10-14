import { api } from "../services/apiService";

export async function handleLogin(usernameOrEmail: string, password: string) {
  try {
    const { token, user } = await api.login({ usernameOrEmail, password });
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (error: any) {
    throw new Error(error.message || "Error al iniciar sesión");
  }
}
