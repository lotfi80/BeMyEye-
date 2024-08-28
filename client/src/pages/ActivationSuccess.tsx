import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { activateUser, getUserIdByActivationLink } from "../http/api";

const ActivationSuccess = () => {
  const { activationLink } = useParams<{ activationLink: string }>();
  const [currentUserID, setCurrentUserID] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        if (activationLink) {
          await activateUser(activationLink);

          const userID = await getUserIdByActivationLink(activationLink);
          if (!userID) {
            throw new Error("User ID not found");
          }
          setCurrentUserID(userID.toString());
          console.log("User ID:", userID);

          navigate(`/home`);
        }
      } catch (error) {
        console.error("Error in account activation process:", error);
      }
    };

    activateAccount();
  }, [activationLink, navigate]);

  return <div>Activating...</div>;
};

export default ActivationSuccess;
