import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../http/api";
import "./HomePage.css";

const getEmailFromLocalStorage = (): string | null => {
  return localStorage.getItem("userEmail");
};

interface Product {
  id: string;
  name: string;
  articel: string;
  price: number;
}

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const email: string | null = getEmailFromLocalStorage();

  const handleRegister = (): void => {
    navigate("/");
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
      <main>{/* Addlogic to display prime */}</main>
    </div>
  );
};
