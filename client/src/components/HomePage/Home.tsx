import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../http/api";
import { useCategoryUserContext } from "../../context/CategoryUser";

const getEmailFromLocalStorage = (): string | null => {
  return localStorage.getItem("userEmail");
};

const HomeVonNath: React.FC = () => {
  const { user, setUser } = useCategoryUserContext();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      setUser(null);
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
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleLocation}>Meine Location</button>
      </header>
    </div>
  );
};

export default HomeVonNath;
