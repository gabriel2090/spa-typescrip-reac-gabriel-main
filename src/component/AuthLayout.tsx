import React from "react";
import { Outlet } from "react-router-dom";
import NavbarLoginRegister from "./NavbarDElogin-register/NavbarLoginRegister";

// Footer minimal para auth (si ya tienes uno, puedes importarlo en su lugar)
const FooterAuth: React.FC = () => (
  <footer className="bg-gray-900 text-gray-300 py-4 mt-10">
    <div className="max-w-6xl mx-auto px-4 text-center text-sm">
      © {new Date().getFullYear()} MyApp · Acceso y registro
    </div>
  </footer>
);

const AuthLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarLoginRegister />
      <main className="flex-1">
        <Outlet />
      </main>
      <FooterAuth />
    </div>
  );
};

export default AuthLayout;
