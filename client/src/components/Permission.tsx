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

      <div
        className={`
        fixed top-1/2 left-1/2 
        w-1/4 h-1/4
        transform -translate-x-1/2 -translate-y-1/2

        z-50 
        border-2 border-solid border-red-600 
        bg-white text-center p-2
        flex flex-col justify-evenly items-center
      `}
      >
        <p className="text-xl pt-5">You do not have permission</p>
        <p className="text-xl ">to view this page.</p>
        please login or register
        <CloseButton setFunction={() => setShowPermission(false)} />
        <div className={"flex flex-row gap-24"}>
          <button
            className="bg-red-400 text-white px-2 py-1 rounded-md mt-2 w-20"
            onClick={() => setShowPermission(false)}
          >
            <Link to={`/register`}>Register</Link>
          </button>
          <button
            className="bg-red-400 text-white px-2 py-1 rounded-md mt-2 w-20"
            onClick={() => setShowPermission(false)}
          >
            <Link to={`/login`}>Login</Link>
          </button>
        </div>
      </div>
    </>
  );
};
export default Permission;
