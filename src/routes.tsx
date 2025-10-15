import { Route, Routes } from "react-router-dom";
import LoginRegister from "./component/loginRegister/LoginRegister";
import Home from "./views/home/home";
import ProductsView from "./views/ProductsView";      // Dash ADMIN
import Dashboard from "./views/Dashboard";            // Dash USUARIO
import UserCatalog from "./views/UserCatalog";        // 🆕 Catálogo de usuario
import { PrivateRoute, AdminRoute } from "./routes/ProtectedRoutes";
import Layout from "./component/Layout";
import AuthLayout from "./component/AuthLayout";

const AppRoutes = () => (
  <Routes>
    {/*  Home: no tocar */}
    <Route path="/" element={<Home />} />

    {/*  Login/Register con su propio navbar/footer */}
    <Route element={<AuthLayout />}>
      <Route path="/login-register/:formType" element={<LoginRegister />} />
    </Route>

    {/*  Dash USUARIO con navbar/footer generales */}
    <Route element={<Layout />}>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/*  Catálogo de usuario (nuevo punto 2.3) */}
      <Route
        path="/catalog"
        element={
          <PrivateRoute>
            <UserCatalog />
          </PrivateRoute>
        }
      />
    </Route>

    {/*  Dash ADMIN (CRUD) con navbar/footer generales */}
    <Route element={<Layout />}>
      <Route
        path="/products"
        element={
          <AdminRoute>
            <ProductsView />
          </AdminRoute>
        }
      />
    </Route>

    {/*  Página no encontrada */}
    <Route
      path="*"
      element={
        <main className="p-6 text-center">
          <p>Página no encontrada</p>
          <a href="/" className="text-blue-600 underline">
            Ir al inicio
          </a>
        </main>
      }
    />
  </Routes>
);

export default AppRoutes;
