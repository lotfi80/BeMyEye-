import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { googleLogin } from "../http/api";

export const GoogleAuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        await googleLogin();
        navigate("/home");
      } catch (e) {
        console.error(e);
        navigate("/error");
      }
    };

    fetchTokens();
  }, [navigate]);

  return <div>Processing Google Login...</div>;
};
