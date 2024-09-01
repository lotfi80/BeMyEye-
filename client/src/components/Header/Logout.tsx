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
      localStorage.removeItem("userData");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleLocation = (): void => {
    navigate("/location");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomeVonNath;
