import React, { useEffect, useState } from "react";

import Table from "./Table/Table";
import CloseButton from "../CloseButton";
import Permission from "../Permission";

interface PermissionProps {
  permission: boolean;
  setPermission: React.Dispatch<React.SetStateAction<boolean>>;
}
const GetUsers: React.FC<PermissionProps> = ({ permission, setPermission }) => {
  const [showPermission, setShowPermission] = useState(false);
  const [showTable, setShowTable] = useState(false);

  return (
    <>
      <div
        className={`bg-gray-200 text-black px-4 py-2 
         rounded-md hover:bg-black hover:text-white cursor-pointer`}
        onClick={(e) => {
          permission ? setShowTable(true) : setShowPermission(true);
        }}
      >
        Get Users
      </div>

      {showTable && (
        <>
          <div className="fixed mr-0 top-0 right-0 left-0 bottom-0 z-40 backdrop-blur-sm backdrop-brightness-50"></div>

          <div className="fixed mr-0 top-0 right-0 w-full h-full flex justify-center items-center z-50">
            <div className="w-3/4 h-3/4 bg-white p-5 shadow-md overflow-auto relative">
              <Table />
              <CloseButton setFunction={() => setShowTable(false)} />
            </div>
          </div>
        </>
      )}
      {showPermission && (
        <Permission
          showPermission={showPermission}
          setShowPermission={setShowPermission}
        />
      )}
    </>
  );
};

export default GetUsers;
