import React, { useEffect, useState } from "react";
import Category from "./category/category";
import Container from "./post-search/container";
import { getUserIDByToken, fetchUser } from "../../http/api";

function Main() {
  const [id, setID] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userID = await getUserIDByToken();
        setID(userID);
        const userData = await fetchUser();
        console.log("userData", userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, []);

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
