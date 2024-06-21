// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Pharmacien from "../Pages/Pharmacien";
import NotFound from "../Pages/NotFound";
import Login from "../Pages/Login";
import Layout from "../Layouts/Layout";
import Signup from "../Pages/Signup";
import Buying from "../Pages/Buying";
import Paiment from "../Pages/Paiment";
import Users from "../Pages/Users";
import Pharmacies from "../Pages/Pharmacies";
import Medicaments from "../Pages/Medicaments";
import Contact from "../Pages/Contact";
import AdminDashboard from "../Pages/admin/AdminDashboard";
import ProtectedRoute from "../components/protected_routes/ProtectedRoute";
import GuestRoute from "../components/protected_routes/GuestRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },

      {
        path: "signup",
        element: (
          <GuestRoute>
            <Signup />
          </GuestRoute>
        ),
      },
      {
        path: "buying",
        element: (
          <ProtectedRoute>
            <Buying />
          </ProtectedRoute>
        ),
      },
      {
        path: "paiment",
        element: <Paiment />,
      },
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "Pharmacien",
        element: <Pharmacien />,
      },
      {
        path: "pharmacies",
        element: <Pharmacies />,
      },
      {
        path: "meds/page/:page",
        element: <Medicaments />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
