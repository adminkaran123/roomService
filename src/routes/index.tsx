import { Navigate, useRoutes } from "react-router-dom";

import Layout from "../layouts/Layouts";
// components

import Dashboard from "../pages/Dashboard";
import FormBuilder from "../pages/FormBuilder";

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
        {
          path: "form-builder",
          element: <FormBuilder />,
        },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
export default Router;
