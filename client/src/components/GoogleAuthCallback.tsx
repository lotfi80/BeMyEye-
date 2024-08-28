import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { googleLogin } from "../http/api";
import { useCategoryUserContext } from "../context/CategoryUser";

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const { user, setUser } = useCategoryUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await googleLogin();
        if (currentUser) {
          setUser(currentUser);
        } else console.log(`No data found`);

        navigate("/home");
      } catch (e) {
        console.error(e);
        navigate("/error");
      }
    };

    fetchData();
  }, []);

  return <div>Processing Google Login...</div>;
};

export default GoogleAuthCallback;
