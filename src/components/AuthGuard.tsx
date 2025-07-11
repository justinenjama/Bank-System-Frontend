import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";
import Spinner from "./Spinner";

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: string;
}

const AuthGuard = ({ children, requiredRole }: AuthGuardProps) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
