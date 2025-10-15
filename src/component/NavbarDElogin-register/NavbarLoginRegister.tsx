import React from "react";
import { Link } from "react-router-dom";

const NavbarLoginRegister: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-white py-4 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold hover:text-blue-300">
          MyApp
        </Link>

        {/* Enlaces */}
        <div className="flex gap-4 items-center">
          <Link
            to="/"
            className="hover:text-blue-400 text-sm transition-colors duration-200"
          >
            Inicio
          </Link>
          <Link
            to="/login-register/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
          >
            Acceso
          </Link>
          <Link
            to="/login-register/register"
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
          >
            Registro
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLoginRegister;
