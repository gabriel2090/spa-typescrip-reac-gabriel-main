import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) return <p>Cargando...</p>;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login-register/login");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Hola, {user.username}</h1>
      <p className="text-sm">Rol: {user.role}</p>

      {user.role === "admin" && (
        <Link
          to="/products"
          className="inline-block bg-blue-600 text-white px-3 py-2 rounded"
        >
          Ir a Productos (CRUD)
        </Link>
      )}

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-2 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Dashboard;

