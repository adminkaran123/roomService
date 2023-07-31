import { Navigate, useRoutes } from "react-router-dom";
import Layout from "../layouts/Layouts";
// components

import Dashboard from "../pages/Dashboard";
import FormBuilder from "../pages/FormBuilder";
import Login from "../pages/Login/Login";
import GuestGuard from "../guards/GuestGuard";
import LayoutBuilder from "../components/LayoutBuilder/LayoutBuilder";

// ----------------------------------------------------------------------

const Router = () =>
  useRoutes([
    {
      path: "/",
      children: [
        {
          path: "",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "connect",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "set-password",
          element: <Login />,
        },
      ],
    },
    // Main Routes
    {
      path: "*",
      element: <Layout />,
      children: [
        {
          path: "dashbaord",
          element: <Dashboard />,
        },
        {
          path: "form-builder",
          element: <FormBuilder />,
        },
        // {
        //   path: "form-builder",
        //   element: <LayoutBuilder />,
        // },
      ],
    },
    {
      path: "form-builder",
      element: <FormBuilder />,
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
export default Router;
