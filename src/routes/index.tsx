import { Navigate, useRoutes } from "react-router-dom";
import Layout from "../layouts/Layouts";
// components

import Dashboard from "../pages/Dashboard";
import StepFormListing from "../pages/stepForm/StepFormListing";
import SubmissonsListing from "../pages/submissions/SubmissonsListing";
import FormBuilder from "../pages/stepForm/StepFormDetails";
import Login from "../pages/Login/Login";
import GuestGuard from "../guards/GuestGuard";
import Pricing from "../pages/Pricing";
import Success from "../pages/InfoPages/Sucess";
import OnBoard from "../pages/InfoPages/OnBoard";
import Account from "../pages/Profile";

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
          path: "admin-login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "reset",
          element: <Login />,
        },
        {
          path: "forgot",
          element: <Login />,
        },
        {
          path: "signup",
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
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "account",
          element: <Account />,
        },
        {
          path: "forms/form-builder",
          element: <FormBuilder />,
        },
        {
          path: "forms",
          element: <StepFormListing />,
        },
        {
          path: "submissons",
          element: <SubmissonsListing />,
        },
        {
          path: "form-builder/:formId",
          element: <FormBuilder />,
        },
        {
          path: "pricing",
          element: <Pricing />,
        },
      ],
    },
    {
      path: "pricing",
      element: <Pricing />,
    },
    { path: "success", element: <Success /> },
    { path: "onboard", element: <OnBoard /> },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
export default Router;
