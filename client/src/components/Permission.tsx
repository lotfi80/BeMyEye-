import React from "react";
import CloseButton from "./MyCloseButton";
import { Link } from "react-router-dom";
import Blind from "./Blind";

interface PermissionProps {
  showPermission: boolean;
  setShowPermission: React.Dispatch<React.SetStateAction<boolean>>;
}

const Permission: React.FC<PermissionProps> = ({
  showPermission,
  setShowPermission,
}) => {
  if (!showPermission) return null;
  return (
    <>
      <Blind />

      <div className="modalWindowPermission">
        <p>You do not have permission</p>
        <p>to view this page.</p>
        please login or register
        <CloseButton setFunction={() => setShowPermission(false)} />
        <div className="buttonGroup">
          <button onClick={() => setShowPermission(false)}>
            <Link to={`/register`}>Register</Link>
          </button>
          <button onClick={() => setShowPermission(false)}>
            <Link to={`/login`}>Login</Link>
          </button>
        </div>
      </div>
    </>
  );
};
export default Permission;
