import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../http/api";
import { useCategoryUserContext } from "../../../context/CategoryUser";

const Logout: React.FC = () => {
  const { user, setUser } = useCategoryUserContext();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem("userData");
      navigate("/home");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
