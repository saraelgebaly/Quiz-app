import React from "react";
import CookieServices from "../../../utils/Cookies";
import { Navigate} from "react-router-dom";

interface prop {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: prop) {
  
  const tokenAuth = CookieServices.get("accessToken");
  if (tokenAuth ) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default ProtectedRoute;
