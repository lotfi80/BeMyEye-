import React, { useEffect, useState } from "react";
import Category from "../components/HomePage/category/category";
import Container from "../components/HomePage/post-search/container-grid/container";
import Map from "../components/Map";
export const Home: React.FC = () => {
  const [id, setID] = useState("");

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      <div className="w-full flex flex-col lg:hidden">
        <div className="w-full p-4 bg-gray-200">
          <Category />
        </div>

        <div className="w-full p-4">
          <div className="h-[50vh] sm:h-[60vh] md:h-[70vh]">
            <Map />
          </div>
        </div>

        <div className="w-full p-4">
          <Container />
        </div>
      </div>

      <div className="hidden lg:flex w-full">
        <div className="w-[30%] p-4 bg-gray-200">
          <Category />
        </div>

        <div className="w-[70%] p-4 border-l border-black">
          <Container />
        </div>
      </div>
    </div>
  );
};

export default Home;
