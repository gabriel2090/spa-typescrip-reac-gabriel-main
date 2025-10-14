import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../../services/apiService";

type FormType = "login" | "register";

const LoginRegister: React.FC = () => {
  const { formType = "login" } = useParams<{ formType: FormType }>();
  const [tab, setTab] = useState<FormType>(formType as FormType);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const [reg, setReg] = useState({ username: "", email: "", password: "" });
  const [log, setLog] = useState({ usernameOrEmail: "", password: "" });

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const { token, user } = await api.register(reg);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setMsg("Registro exitoso");
      navigate("/dashboard");
    } catch (err: any) {
      setMsg(err.message || "Error de registro");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const { token, user } = await api.login(log);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setMsg("Login exitoso");
      navigate("/dashboard");
    } catch (err: any) {
      setMsg(err.message || "Error de login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setTab("login")}
          className={`px-4 py-2 rounded ${tab === "login" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Login
        </button>
        <button
          onClick={() => setTab("register")}
          className={`px-4 py-2 rounded ${tab === "register" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Registro
        </button>
      </div>

      {msg && <div className="mb-4 text-sm">{msg}</div>}

      {tab === "register" ? (
        <form onSubmit={handleRegister} className="space-y-3">
          <input
            className="w-full border p-2 rounded"
            placeholder="Username"
            value={reg.username}
            onChange={(e) => setReg((s) => ({ ...s, username: e.target.value }))}
            required
          />
          <input
            className="w-full border p-2 rounded"
            type="email"
            placeholder="Email"
            value={reg.email}
            onChange={(e) => setReg((s) => ({ ...s, email: e.target.value }))}
            required
          />
          <input
            className="w-full border p-2 rounded"
            type="password"
            placeholder="Password"
            value={reg.password}
            onChange={(e) => setReg((s) => ({ ...s, password: e.target.value }))}
            required
          />
          <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">
            {loading ? "Registrando..." : "Registrarme"}
          </button>
          <p className="text-sm">
            ¿Ya tienes cuenta? <Link to="/login-register/login" className="text-blue-600 underline">Ir a Login</Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handleLogin} className="space-y-3">
          <input
            className="w-full border p-2 rounded"
            placeholder="Email o Username"
            value={log.usernameOrEmail}
            onChange={(e) => setLog((s) => ({ ...s, usernameOrEmail: e.target.value }))}
            required
          />
          <input
            className="w-full border p-2 rounded"
            type="password"
            placeholder="Password"
            value={log.password}
            onChange={(e) => setLog((s) => ({ ...s, password: e.target.value }))}
            required
          />
          <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
          <p className="text-sm">
            ¿No tienes cuenta? <Link to="/login-register/register" className="text-blue-600 underline">Crear cuenta</Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginRegister;
