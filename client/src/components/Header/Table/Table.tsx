import React, { useEffect, useState } from "react";
import { getUsers } from "../../../http/api";
import { IUser } from "../../../interfaces/User";

import TableHeadCell from "./TableHeadCell";
import { TableSortLabel, Box } from "./TableSortLabel";
import { Button } from "./Button";
import { getPostByUser } from "../../../http/api";
import GetUsersPosts from "../GetUsersPosts";

const Table: React.FC = () => {
  const [arrayAllUsers, setArrayAllUsers] = useState<IUser[] | void>([]);
  const [sortedUsers, setSortedUsers] = useState<IUser[] | void>([]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("username");
  const [isZoomed, setIsZoomed] = useState<string | null>(null);
  const [postsVisible, setPostsVisible] = useState<boolean>(false);
  const [tableVisible, setTableVisible] = useState<boolean>(true);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getUsers();
        setArrayAllUsers(allUsers);
      } catch (e) {
        console.error(e);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const sortData = () => {
      const sorted = arrayAllUsers?.slice().sort((a, b) => {
        if (!a[orderBy] && b[orderBy]) return 1;
        if (a[orderBy] && !b[orderBy]) return -1;
        if (!a[orderBy] && !b[orderBy]) return 0;
        if (typeof a[orderBy] === "string" && typeof b[orderBy] === "string")
          if (order === "asc") {
            return a[orderBy].localeCompare(b[orderBy]);
          }
        return b[orderBy].localeCompare(a[orderBy]);
      });
      setSortedUsers(sorted);
    };

    sortData();
  }, [arrayAllUsers, order, orderBy]);

  function userImage(user: any): string {
    const userImage = user?.profileimage?.includes("http")
      ? user?.profileimage
      : `http://localhost:5000/${user?.profileimage}`;
    return userImage;
  }

  function formatDate(dateString: any): string {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  const headCells = [
    {
      id: "profileimage",
      label: "avatar",
    },
    {
      id: "username",
      label: "username",
    },
    {
      id: "email",
      label: "email",
    },
    {
      id: "firstname",
      label: "first name",
    },
    {
      id: "lastname",
      label: "last name",
    },
    {
      id: "birthdate",
      label: "birthday",
    },
    {
      id: "country",
      label: "country",
    },
    {
      id: "city",
      label: "city",
    },
  ];

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrderBy(property);
    console.log(isAsc);
    console.log(order);
    setOrder(isAsc ? "desc" : "asc");
    console.log(property);
    console.log(order);
  };

  const handleButtonViewPosts = async (property: any) => {
    setIsZoomed(null);
    const posts = await getPostByUser(property._id);
    setPosts(posts.posts);
    setPostsVisible(true);
    setTableVisible(false);
  };
  const handleButtonSendMessage = (property: string) => {
    setIsZoomed(null);
  };

  return (
    <div className="p-2 pt-10 text-xs">
      {tableVisible && (
        <table className="min-w-full divide-y divide-gray-400">
          <thead className="bg-gray-100">
            <tr>
              {headCells.map((headCell) => (
                <TableHeadCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id ? true : false}
                    direction={orderBy === headCell.id ? order : "asc"}
                    createSortHandler={() => handleRequestSort(headCell.id)}
                  >
                    {orderBy === headCell.id ? (
                      <Box>
                        {order === "desc" ? (
                          <img
                            src="arrow-down-solid.svg"
                            alt=""
                            style={{ visibility: "visible" }}
                          />
                        ) : (
                          <img
                            src="arrow-up-solid.svg"
                            alt=""
                            style={{ visibility: "visible" }}
                          />
                        )}
                      </Box>
                    ) : null}
                    <span>{headCell.label}</span>
                  </TableSortLabel>
                </TableHeadCell>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedUsers ? (
              sortedUsers.map((user: any) => (
                <>
                  <tr
                    key={user._id}
                    className={`hover:bg-gray-200 ${
                      isZoomed === user._id
                        ? "h-16 align-top bg-gray-200 text-lg leading-10"
                        : "h-8 align-middle"
                    }`}
                    onClick={(e) =>
                      setIsZoomed((prevId) =>
                        prevId === user._id ? null : user._id
                      )
                    }
                  >
                    <td className="py-1">
                      <img
                        src={`${userImage(user)}`}
                        alt="avatar"
                        className="w-8 h-8 object-cover"
                      />
                    </td>
                    <td>{user.username}</td>
                    <td>{user.privacy.email ? user.email : ""}</td>
                    <td>{user.privacy.firstname ? user.firstname : ""}</td>
                    <td>{user.privacy.lastname ? user.lastname : ""}</td>
                    <td>
                      {user.privacy.birthdate ? formatDate(user.birthdate) : ""}
                    </td>
                    <td>{user.privacy.country ? user.country : ""}</td>
                    <td>{user.privacy.city ? user.city : ""}</td>
                  </tr>
                  {isZoomed === user._id && (
                    <tr>
                      <td colSpan={8} className="p-4 bg-gray-200">
                        <div className="flex flex-row justify-center gap-x-32">
                          <Button
                            onClick={() => {
                              handleButtonViewPosts(user);
                            }}
                            text="View Posts"
                          ></Button>
                          <Button
                            onClick={() => {
                              handleButtonSendMessage(user);
                            }}
                            text="Send Message"
                          ></Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))
            ) : (
              <tr>
                <td colSpan={8} className=" py-4 text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <GetUsersPosts
        postsVisible={postsVisible}
        posts={posts}
        setPostsVisible={setPostsVisible}
        setTableVisible={setTableVisible}
      />
    </div>
  );
};

export default Table;
