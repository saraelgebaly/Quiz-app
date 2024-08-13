import React, { useEffect, useState } from "react";
import CookieServices from "../../../utils/Cookies";
import { Navigate, Outlet } from "react-router-dom";
import { useLoginMutation } from "../../../Toolkit/Auth/authSlice";

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
