import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ToastPortal from "./components/ToastPortal.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Tickets from "./pages/Tickets.jsx";

export default function App(){
  return (
    <>
      <ToastPortal />
      <ToastContainer
        position="bottom-left"
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
        role="alert"
      />
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/auth/login" element={<Login/>}/>
        <Route path="/auth/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path="/tickets" element={<ProtectedRoute><Tickets/></ProtectedRoute>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </>
  );
}
