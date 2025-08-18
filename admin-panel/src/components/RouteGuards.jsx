import React from "react";

import { Navigate } from 'react-router-dom';

//privateRoute -> sir login hone ke baad access mile
export function PrivateRoute({ children }) {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export function PublicRoute({ children }) {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    return !isAuthenticated ? children : <Navigate to="/" />;
}