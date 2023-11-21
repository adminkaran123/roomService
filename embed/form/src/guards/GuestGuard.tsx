import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userState } from "../redux/slices/userSlice";

// hooks

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const userRef = useSelector(userState);
  const {
    user: { isLoggedIn },
  } = userRef;

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}
