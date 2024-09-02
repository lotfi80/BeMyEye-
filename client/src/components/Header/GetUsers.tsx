import React, { useEffect, useState } from "react";

import Table from "./Table";

const GetUsers: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <div
        className={`bg-gray-200 text-black px-4 py-2 
         rounded-md hover:bg-black hover:text-white cursor-pointer`}
        onClick={() => {
          setIsClicked(!isClicked);
        }}
      >
        Get Users
      </div>
      {isClicked && (
        <>
          <div className="fixed mr-0 top-0 right-0 left-0 bottom-0 bg-black opacity-80 z-40 "></div>

          <div className="fixed mr-0 top-0 right-0 w-full h-full flex justify-center items-center z-50">
            <div className="w-3/4 h-3/4 bg-white p-5 shadow-md overflow-auto">
              <Table />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GetUsers;
