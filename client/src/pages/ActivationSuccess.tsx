import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { activateUser, getUserIdByActivationLink } from "../http/api";
import { useCategoryUserContext } from "../context/CategoryUser";

const ActivationSuccess = () => {
  const { activationLink } = useParams<{ activationLink: string }>();
  const navigate = useNavigate();
  const { registrationStatus, setRegistrationStatus } =
    useCategoryUserContext();

  useEffect(() => {
    if (registrationStatus) {
      console.log(registrationStatus, "registerStatus");
      navigate(`/home`);
    }
  }, [registrationStatus, navigate]);

  useEffect(() => {
    const activateAccount = async () => {
      try {
        console.log("Activation Link:", activationLink);
        if (activationLink) {
          await activateUser(activationLink);
          setRegistrationStatus("registered");
          // navigate(`/homactivated successfully!e`);
        }
      } catch (error) {
        console.error("Error in account activation process:", error);
      }
    };

    console.log("Account ", registrationStatus);
    activateAccount();
  }, [activationLink, navigate]);

  return <div>Activating...</div>;
};

export default ActivationSuccess;
