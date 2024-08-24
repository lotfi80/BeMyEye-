import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { activateUser } from "../http/api";
import { getUserIdByActivationLink } from "../services/findUserByLink";

const ActivationSuccess: React.FC = () => {
  const { activationLink } = useParams<{ activationLink: string }>();
  const [currentUserID, setCurrentUserID] = useState<string>("");

  useEffect(() => {
    const activateAccount = async () => {
      try {
        console.log("Activation link:", activationLink);
        if (activationLink) {
          await activateUser(activationLink);
          console.log("Activation successful");

          const userID = await getUserIdByActivationLink(activationLink);
          if (!userID) {
            throw new Error("User ID not found");
          }
          setCurrentUserID(userID.toString());
          console.log("User ID:", userID);
        }
      } catch (error) {
        console.error("Error in account activation process:", error);
      }
    };

    activateAccount();
  }, [activationLink]);

  // return <div>Invalid activation link</div>; //
  //////////////////////////////////////

  return (
    <div>
      <h1>Account Activation Successful!</h1>
      <p>
        Your account has been activated. You can now{" "}
        <a href={`/userdata/${currentUserID}`}>Complete your Registration </a>.
      </p>
    </div>
  );
};

export default ActivationSuccess;
