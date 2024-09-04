import React, { useEffect, useState } from "react";
// import Category from "../components/HomePage/category/category";
import Container from "../components/HomePage/post-search/container-grid/container";

export const Home: React.FC = () => {
  const [id, setID] = useState("");

  return (
    <div className="w-full h-screen flex">
      <div className="w-[100%] h-full bg-gray-100 flex flex-row">
        <div className="w-[30%] p-4 overflow-auto">
          {/* Category raus genommen da es nicht mehr existiert wird mit map ersetzt*/}
          {/* <Category /> */} 
        </div>
        <div className="w-[70%] p-4 overflow-auto border border-black">
          <Container />
        </div>
      </div>
    </div>
  );
};

export default Home;
