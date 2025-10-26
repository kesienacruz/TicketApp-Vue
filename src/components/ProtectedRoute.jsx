import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({children}){
  const { user, hydrated, requireSessionExpired } = useAuth();
  const [shouldRedirect,setShouldRedirect]=useState(false);

  useEffect(()=>{
    if(hydrated && !user){
      requireSessionExpired();
      setShouldRedirect(true);
    }
  },[hydrated,user,requireSessionExpired]);

  if(!hydrated) return null;
  if(shouldRedirect){
    return <Navigate to="/auth/login" replace />;
  }
  return children;
}
