import React, { useEffect, useState } from "react";
import Category from "../components/HomePage/category/category";
import Container from "../components/HomePage/post-search/container-grid/container";

export const Home: React.FC = () => {
  const [id, setID] = useState("");

  // return (
  //   <div className="w-full h-[100vh] flex">
  //     <div className="w-[100%] h-full bg-gray-100 flex flex-row">
  //       <div className="w-[30%] h-[100vh] p-4 ">
  //         <Category /> 
  //       </div>
  //       <div className="w-[70%] h-[100vh] p-4 border overflow-auto border-black">
  //         <Container />
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="w-full min-h-screen flex bg-gray-100">
      <div className="w-full flex flex-grow">
        {/* Left Category Section */}
        <div className="w-[30%] p-4 bg-gray-200 flex flex-col">
          <Category />
        </div>

        {/* Right Grid Container Section */}
        <div className="w-[70%] p-4 border-l border-black">
          <Container />
        </div>
      </div>
    </div>
  );
};


export default Home;
