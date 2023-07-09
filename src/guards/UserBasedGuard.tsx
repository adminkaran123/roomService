import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// hooks
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

type UserBasedGuardProps = {
  children: ReactNode;
  allowedUsers: string[];
};

export default function UserBasedGuard({
  children,
  allowedUsers,
}: UserBasedGuardProps) {
  const { user } = useAuth();

  if (!allowedUsers.includes(user?.role || '')) {
    return <Navigate to="/404" />;
  }
  return <>{children}</>;
}
