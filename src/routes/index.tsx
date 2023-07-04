import { lazy, Suspense } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";

import Layout from "../layouts/Layouts";
// components

import Dashboard from "../pages/Dashboard";

// ----------------------------------------------------------------------

const Router = () =>
  useRoutes([
    // Main Routes
    {
      path: "*",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
export default Router;
