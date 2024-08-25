import React from "react";
import Category from "./category/category";
import Container from "./post-search/container";

function Main() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-[100%] h-full bg-gray-100 flex flex-row">
        <div className="w-[30%] p-4 overflow-auto">
          <Category />
        </div>
        <div className="w-[70%] p-4 overflow-auto border border-black">
          <Container />
        </div>
      </div>
    </div>
  );
}

export default Main;
