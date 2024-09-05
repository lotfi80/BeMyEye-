import React, { useEffect, useState } from "react";
import TableView from "./Table/TableView";
import GetUsersPosts from "./GetUsersPosts";
import { getPostByUser } from "../../http/api";
import { IUser } from "../../interfaces/User";

const GetUsersWindow: React.FC = () => {
  const [postsVisible, setPostsVisible] = useState<boolean>(false);
  const [tableVisible, setTableVisible] = useState<boolean>(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [isZoomed, setIsZoomed] = useState<string | null>(null);

  const handleButtonViewPosts = async (user: IUser) => {
    setIsZoomed(null);
    try {
      const postsResponse = await getPostByUser(user._id);
      setPosts(postsResponse.posts);
      setPostsVisible(true);
      setTableVisible(false);
    } catch (error) {
      console.error("Ошибка загрузки постов: ", error);
    }
  };
  const handleButtonSendMessage = (user: IUser) => {
    setIsZoomed(null);
    console.log(`Send message to: ${user.username}`);
  };

  return (
    <div className="p-2 pt-10 text-xs">
      {tableVisible && (
        <TableView
          isZoomed={isZoomed}
          setIsZoomed={setIsZoomed}
          handleButtonViewPosts={handleButtonViewPosts}
          handleButtonSendMessage={handleButtonSendMessage}
        />
      )}
      {postsVisible && (
        <GetUsersPosts
          postsVisible={postsVisible}
          posts={posts}
          setPostsVisible={setPostsVisible}
          setTableVisible={setTableVisible}
        />
      )}
    </div>
  );
};

export default GetUsersWindow;
