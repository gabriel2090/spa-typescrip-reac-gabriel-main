import { Route, Routes } from "react-router-dom";
import LoginRegister from "./component/loginRegister/LoginRegister";
import Home from "./views/home/home";
import ProductsView from "./views/ProductsView";
import Dashboard from "./views/Dashboard";
import { PrivateRoute, AdminRoute } from "./routes/ProtectedRoutes";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login-register/:formType" element={<LoginRegister />} />
    <Route path="/dashboard" element={
      <PrivateRoute><Dashboard /></PrivateRoute>
    } />
    <Route path="/products" element={
      <AdminRoute><ProductsView /></AdminRoute>
    } />
    <Route path="*" element={<main className="p-6 text-center">
      <p>Página no encontrada</p><a href="/" className="text-blue-600 underline">Ir al inicio</a>
    </main>} />
  </Routes>
);

export default AppRoutes;
