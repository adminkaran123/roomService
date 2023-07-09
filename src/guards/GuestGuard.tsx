import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// hooks

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const isAuthenticated = false;

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
