import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { activateUser } from "../http/api";

const ActivationSuccess: React.FC = () => {
  const { activationLink } = useParams<{ activationLink: string }>();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        if (activationLink) {
          await activateUser(activationLink);
        }
      } catch (error) {
        console.error("Activation failed:", error);
      }
    };

    activateAccount();
  }, [activationLink]);

  return (
    <div>
      <h1>Account Activation Successful!</h1>
      <p>
        Your account has been activated. You can now{" "}
        <a href="/completeRegistration">Complete your Registration</a>.
      </p>
    </div>
  );
};

export default ActivationSuccess;
