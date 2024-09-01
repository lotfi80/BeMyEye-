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
        if (activationLink) {
          await activateUser(activationLink);
          setRegistrationStatus("registered");

          // navigate(`/home`);
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
