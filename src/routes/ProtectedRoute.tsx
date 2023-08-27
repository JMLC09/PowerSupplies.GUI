import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
  isProtected: boolean;
  allowedRoles?: string[];
  element: React.ReactNode;
}
const ProtectedRoute = ({
  isProtected,
  allowedRoles,
  element,
}: ProtectedRouteProps) => {
  const auth = useContext(AuthContext);
  if (isProtected && !auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (
    isProtected &&
    allowedRoles &&
    !allowedRoles.some((role) => auth.user.roles.includes(role)) &&
    !allowedRoles.includes("ALL")
  ) {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

export default ProtectedRoute;
