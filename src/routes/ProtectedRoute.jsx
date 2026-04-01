import { Navigate } from "react-router-dom";
import { AUTH_PATH, LOGIN_PATH } from "./path";

const ProtectedRoute = ({ children }) => {

  return <>{children}</>;
};

export default ProtectedRoute;

