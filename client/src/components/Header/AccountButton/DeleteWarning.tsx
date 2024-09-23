import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../http/api";
import { useCategoryUserContext } from "../../../context/CategoryUser";
import Blind from "../../Blind";

interface deleteUserProps {
  warning: boolean;
  setWarning: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteWarning: React.FC<deleteUserProps> = ({ warning, setWarning }) => {
  const { user, setUser } = useCategoryUserContext();
  const navigate = useNavigate();

  const handleDelete = async (): Promise<void> => {
    if (warning) {
      try {
        if (!user) {
          return;
        }
        await deleteUser(user?._id);
        setUser(null);
        localStorage.removeItem("userData");
        navigate("/home");
      } catch (error) {
        console.error("Deleting failed", error);
      }
    }
  };

  if (!warning) {
    return null;
  }
  return (
    <>
      <Blind />
      <div className="fixed top-0 left-0 w-full h-full  bg-opacity-0 z-50">
        <div
          className=" fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
           bg-white text-left rounded-sm w-1/4
           z-50"
        >
          <div className="p-5 bg-white">
            <div
              className="flex ml-auto mr-auto bg-red-300 flex-shrink-0 justify-center align-middle
              w-9 h-9 rounded-full"
            >
              <svg
                aria-hidden="true"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                width="24"
                height="24"
                color="#DC2626"
              >
                <path
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                ></path>
              </svg>
            </div>
            <div className="mt-2 text-center">
              <span className="text-black text-xs font-bold">
                Desactivate account
              </span>
              <p className="text-gray-400 mt-1 text-xs">
                Are you sure you want to deactivate your account? All of your
                data will be permanently removed. This action cannot be undone.
              </p>
            </div>
            <div className="m-1">
              <button
                className="inline-flex py-1 px-2 bg-red-400 text-white
                text-sm font-semibold justify-center w-full rounded-sm border 
                border-transparent shadow-sm"
                type="button"
                onClick={handleDelete}
              >
                Desactivate
              </button>
              <button
                className="inline-flex mt-2 py-1 px-2 bg-white text-black
                text-sm font-semibold justify-center w-full rounded-sm border 
                border-transparent shadow-sm"
                type="button"
                onClick={() => {
                  setWarning(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DeleteWarning;
