import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/auth/status", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(data.isAuthenticated))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) return <h2>Loading...</h2>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/cseatemp/" />;
};

export default ProtectedRoute;