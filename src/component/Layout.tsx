// src/component/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/nav/navbar";     // tu navbar principal
import Footer from "../component/FOOTER/footer"; // tu footer principal

const Layout: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
