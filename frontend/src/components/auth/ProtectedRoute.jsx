import { Navigate } from "react-router-dom"
import { useState } from "react"
import ErrorPage from "../ErrorPage";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <ErrorPage />;
  }

  return children;
};

export default ProtectedRoute