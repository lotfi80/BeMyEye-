import React, { useEffect, useState } from "react";
import { IUser } from "../../../../interfaces/User";

import TableHeadCell from "./TableHeadCell";
import { TableSortLabel, Box } from "./TableSortLabel";
import { Button } from "./Button";

import "./userCard.css";

interface props {
  isZoomed: string | null;
  setIsZoomed: React.Dispatch<React.SetStateAction<string | null>>;
  handleButtonSendMessage: (user: IUser) => void;
  handleButtonViewPosts: (user: IUser) => void;
  isSearchActive: boolean;
  allUsers: Array<IUser>;
  tableVisible: boolean;
  searchResults: Array<Partial<IUser>>;
}

const TableView: React.FC<props> = ({
  isZoomed,
  setIsZoomed,
  handleButtonViewPosts,
  handleButtonSendMessage,
  isSearchActive,
  allUsers,
  tableVisible,
  searchResults,
}) => {
  const [sortedUsers, setSortedUsers] = useState<IUser[]>([]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("username");

  //Sort Data by
  useEffect(() => {
    const sortData = () => {
      console.log(allUsers, "allusers: ");
      const sorted = allUsers?.slice().sort((a, b) => {
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
  }, [allUsers, order, orderBy]);
  // ****************************************************************
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
  // ****************************************************************
  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrderBy(property);
    console.log(isAsc);
    console.log(order);
    setOrder(isAsc ? "desc" : "asc");
    console.log(property);
    console.log(order);
  };

  // ***  ****************************************************************
  console.log("sortedUsers", sortedUsers);
  const arrayForTable = isSearchActive
    ? searchResults.slice(0)
    : sortedUsers.slice(0);
  // *********************************************************************
  if (!tableVisible) {
    return null;
  }
  return (
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
                        src="/arrow-down-solid.svg"
                        alt=""
                        style={{ visibility: "visible" }}
                      />
                    ) : (
                      <img
                        src="/arrow-up-solid.svg"
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
        {arrayForTable ? (
          arrayForTable.map((user: any, index: number) => (
            <>
              {isZoomed === user._id || (
                <tr
                  key={user._id}
                  className={`hover:bg-gray-200 "h-8 align-middle"
               `}
                  onClick={(e) => {
                    setIsZoomed((prevId) =>
                      prevId === user._id ? null : user._id
                    );
                    setTimeout(() => {
                      const row = document.querySelector(
                        `[data-user-id='${user._id}']`
                      );
                      if (row) {
                        row.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }
                    }, 100);
                  }}
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
              )}

              {isZoomed === user._id && (
                <tr
                  data-user-id={user._id}
                  onClick={(e) =>
                    setIsZoomed((prevId) =>
                      prevId === user._id ? null : user._id
                    )
                  }
                >
                  <td colSpan={8} className="p-4 bg-gray-200 w-full ">
                    <div className="userCard">
                      <img src={`${userImage(user)}`} alt="avatar" />
                      <p className="name">{user.username}</p>
                      <p className="address">
                        {user.privacy.city ? user.city : ""},{" "}
                        {user.privacy.country ? user.country : ""}
                      </p>
                      <div className="data">
                        <p>{user.privacy.email ? user.email : ""}</p>
                        <br />
                        <p>
                          {user.privacy.firstname ? user.firstname : ""}{" "}
                          {user.privacy.lastname ? user.lastname : ""}
                        </p>
                        <br />
                        <p>
                          {user.privacy.birthdate
                            ? formatDate(user.birthdate)
                            : ""}
                        </p>
                      </div>
                      <div className="button viewPosts">
                        <Button
                          onClick={() => handleButtonViewPosts(user)}
                          text="View Posts"
                        ></Button>
                      </div>
                      <div className="button sendMessage">
                        <Button
                          onClick={() => handleButtonSendMessage(user)}
                          text="Send Message"
                        ></Button>
                      </div>
                      <div className="button follow">
                        <Button
                          onClick={() => handleButtonSendMessage(user)}
                          text="Follow"
                        ></Button>
                      </div>
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
  );
};

export default TableView;
