import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../http/api";

import Main from "../components/HomePage/main";

const getEmailFromLocalStorage = (): string | null => {
  return localStorage.getItem("userEmail");
};

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = (): void => {
    navigate("/register");
  };

  const handleLogin = (): void => {
    navigate("/login");
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleLocation = (): void => {
    navigate("/location");
  };

  return (
    <div>
      <header>
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleLocation}>Meine Location</button>
      </header>
      <Main />
    </div>
  );
};

export default Home;
