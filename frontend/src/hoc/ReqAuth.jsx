import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ReqAuth = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth.data);
  const location = useLocation();

  console.log("reqAuth", isAuth);
  if (isAuth) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};
