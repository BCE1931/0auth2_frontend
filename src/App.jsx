import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./COMPONENTS/Register";
import Login from "./COMPONENTS/Login";
import Home from "./COMPONENTS/Home";
import Middle from "./COMPONENTS/Middle";
import Intro from "./QRAPHQL/Intro";
import Add from "./QRAPHQL/Add";
import Updateprice from "./QRAPHQL/Updateprice";
import All from "./QRAPHQL/All";
import Register2 from "./COMPONENTS/Register2";
import Resetpwd from "./COMPONENTS/Resetpwd";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated() ? <Navigate to="/home" replace /> : <Register />
        }
      />

      <Route
        path="/login"
        element={
          isAuthenticated() ? <Navigate to="/home" replace /> : <Login />
        }
      />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/intro"
        element={
          <ProtectedRoute>
            <Intro />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add"
        element={
          <ProtectedRoute>
            {" "}
            <Add />{" "}
          </ProtectedRoute>
        }
      />

      <Route
        path="/update"
        element={
          <ProtectedRoute>
            <Updateprice />
          </ProtectedRoute>
        }
      />

      <Route
        path="/all"
        element={
          <ProtectedRoute>
            <All />
          </ProtectedRoute>
        }
      />

      <Route path="/middle" element={<Middle />} />

      <Route path="/register2" element={<Register2 />} />

      <Route path="/reset" element={<Resetpwd />} />
    </Routes>
  );
};

export default App;
