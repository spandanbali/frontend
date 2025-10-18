import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const isLoggedIn = !!localStorage.getItem("token"); // check if user is logged in

  return (
    <Router>
      <Routes>
        {/* Default route "/" */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />}
        />

        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
