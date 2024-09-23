import React, { useEffect, useState } from "react";
import Category from "../components/HomePage/category/category";
import Container from "../components/HomePage/post-search/container-grid/container";
import Map from "../components/Map";
export const Home: React.FC = () => {
  const [id, setID] = useState("");

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100 ">
      <div className="w-full flex flex-col lg:hidden ">
        <div className="w-full p-4 bg-gray-200 ">
          <Category />
        </div>

        <div className="w-full p-4  ">
          <div className="h-[50vh] sm:h-[60vh] md:h-[70vh] ">
            <Map />
          </div>
        </div>

        <div className="w-full p-4">
          <Container />
        </div>
      </div>

      <div className="hidden lg:flex w-full ">
         {/* mit border */}
        {/* <div className="w-[30%] p-4 bg-gray-200  rounded-lg border-2 border-solid border-[#214256] mr-1"> */}
 {/* ohne border */}
        <div className="w-[30%] p-4 bg-gray-200 rounded-2xl   mr-1
        ">
          <Category />
        </div>
       {/* mit border */}
        {/* <div className="w-[70%] p-4  rounded-lg border-2 border-solid border-[#214256]"> */}
 {/* ohne border */}
        <div className="w-[70%] p-4 ">
          <Container />
        </div>
      </div>
    </div>
  );
};

export default Home;
