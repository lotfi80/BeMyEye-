import React, { useEffect, useState } from "react";
import TableView from "./Table/TableView";
import GetUsersPosts from "./GetUsersPosts";
import { getUsersPost } from "../../../http/api";
import { IUser } from "../../../interfaces/User";
import { Search } from "../../searchBar/Search";
import { getUsers } from "../../../http/api";

const GetUsersWindow: React.FC = () => {
  const [postsVisible, setPostsVisible] = useState<boolean>(false);
  const [tableVisible, setTableVisible] = useState<boolean>(true);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [isZoomed, setIsZoomed] = useState<string | null>(null);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [writeInSearchBarResults, setWriteInSearchBarResults] = useState<
    string[] | null
  >([]);
  const [searchResults, setSearchResults] = useState<Partial<IUser>[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getUsers();
        setAllUsers(allUsers);
      } catch (e) {
        console.error(e);
      }
    };
    fetchUsers();
  }, []);

  const handleButtonViewPosts = async (user: IUser) => {
    setIsZoomed(null);
    try {
      const postsResponse = await getUsersPost(user._id);
      setPosts(postsResponse);
      setPostsVisible(true);
      setTableVisible(false);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleButtonSendMessage = (user: IUser) => {
    setIsZoomed(null);
  };

  return (
    <div className="p-2 pt-10 text-xs">
      <>
        <Search
          setIsSearchActive={setIsSearchActive}
          isSearchActive={isSearchActive}
          allUsers={allUsers}
          setWriteInSearchBarResults={setWriteInSearchBarResults}
          writeInSearchBarResults={writeInSearchBarResults}
          setSearchResults={setSearchResults}
          postVisible={postsVisible}
        />

        <TableView
          tableVisible={tableVisible}
          allUsers={allUsers}
          isZoomed={isZoomed}
          setIsZoomed={setIsZoomed}
          handleButtonViewPosts={handleButtonViewPosts}
          handleButtonSendMessage={handleButtonSendMessage}
          isSearchActive={isSearchActive}
          searchResults={searchResults}
        />
      </>

      {postsVisible && (
        <GetUsersPosts
          posts={posts}
          postsVisible={postsVisible}
          setPostsVisible={setPostsVisible}
          setTableVisible={setTableVisible}
        />
      )}
    </div>
  );
};

export default GetUsersWindow;
