import React, { useEffect, useState } from "react";
import IUser from "../../../interfaces/User";
import { useMediaQuery } from "react-responsive";

import TableHeadCell from "./TableHeadCell";
import { TableSortLabel, Box } from "./TableSortLabel";
import { useCategoryUserContext } from "../../../context/CategoryUser";
import { getFollow_ } from "../../../http/api";
import WriteMessage from "../WriteMessage";
import UserCard from "./UserCard";

interface props {
  isZoomed: string | null;
  setIsZoomed: React.Dispatch<React.SetStateAction<string | null>>;
  handleButtonViewPosts: (user: IUser) => void;
  handleButtonFollow: (accountOwner: IUser | null, user: IUser) => void;
  handleButtonUnFollow: (accountOwner: IUser | null, user: IUser) => void;
  isSearchActive: boolean;
  allUsers: Array<IUser>;
  tableVisible: boolean;
  searchResults: Array<Partial<IUser>>;
  currentUser: IUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const TableView: React.FC<props> = ({
  isZoomed,
  setIsZoomed,
  handleButtonViewPosts,
  handleButtonFollow,
  handleButtonUnFollow,
  isSearchActive,
  allUsers,
  tableVisible,
  searchResults,
  setCurrentUser,
  currentUser,
}) => {
  const [sortedUsers, setSortedUsers] = useState<IUser[]>([]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("username");
  const { user: accountOwner } = useCategoryUserContext();
  const [isFollowed, setIsFollowed] = useState<boolean | undefined>(false);
  const [letterVisible, setLetterVisible] = useState<boolean>(false);
  const [letterVisibleID, setLetterVisibleID] = useState<string | null>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  //Sort Data by
  useEffect(() => {
    console.log("isFollowed", isFollowed);
  }, [isFollowed]);

  useEffect(() => {
    const sortData = () => {
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
    setOrder(isAsc ? "desc" : "asc");
  };
  // ****************************************************************
  const handleZoomClick = async (user: IUser) => {
    if (accountOwner) {
      try {
        const data = await getFollow_(accountOwner._id);
        const following = data?.following.some((u) => u._id === user._id);
        setIsFollowed(following);
      } catch (error) {
        console.log(error);
      }
    }

    setCurrentUser(user);
    setIsZoomed((prevId) => (prevId === user._id ? null : user._id));
    setTimeout(() => {
      const row = document.querySelector(`[data-user-id='${user._id}']`);
      if (row) {
        row.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };

  const handleButtonSendMessage = (user: IUser) => {
    setIsZoomed(null);
    setCurrentUser(user);
    setLetterVisibleID(user._id);
    setLetterVisible(true);
  };

  // ***  ****************************************************************
  const arrayForTable = isSearchActive
    ? searchResults.slice(0)
    : sortedUsers.slice(0);
  // *********************************************************************
  // {isMobile ? (

  if (!tableVisible) {
    return null;
  }

  return (
    <div className="cntner">
      {isMobile ? (
        arrayForTable ? (
          arrayForTable.map((user: any, index: number) => (
            <UserCard
              key={user._id}
              user={user}
              isFollowed={isFollowed}
              setIsFollowed={setIsFollowed}
              handleButtonFollow={handleButtonFollow}
              accountOwner={accountOwner}
              handleButtonUnFollow={handleButtonUnFollow}
              letterVisible={letterVisible && letterVisibleID === user._id}
              setLetterVisible={setLetterVisible}
              handleButtonViewPosts={handleButtonViewPosts}
              handleButtonSendMessage={handleButtonSendMessage}
              currentUser={currentUser}
              setIsZoomed={setIsZoomed}
            />
          ))
        ) : (
          <p>No users found</p>
        )
      ) : (
        <table>
          <thead>
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

          <tbody>
            {arrayForTable ? (
              arrayForTable.map((user: any, index: number) => (
                <>
                  {isZoomed === user._id || (
                    <tr key={user._id} onClick={() => handleZoomClick(user)}>
                      <td>
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
                        {user.privacy.birthdate
                          ? formatDate(user.birthdate)
                          : ""}
                      </td>
                      <td>{user.privacy.country ? user.country : ""}</td>
                      <td>{user.privacy.city ? user.city : ""}</td>
                    </tr>
                  )}

                  {isZoomed === user._id && (
                    <tr
                      data-user-id={user._id}
                      onClick={(e) => {
                        setIsZoomed((prevId) =>
                          prevId === user._id ? null : user._id
                        );
                      }}
                    >
                      <UserCard
                        user={user}
                        isFollowed={isFollowed}
                        setIsFollowed={setIsFollowed}
                        handleButtonFollow={handleButtonFollow}
                        accountOwner={accountOwner}
                        handleButtonUnFollow={handleButtonUnFollow}
                        letterVisible={letterVisible}
                        setLetterVisible={setLetterVisible}
                        handleButtonViewPosts={handleButtonViewPosts}
                        handleButtonSendMessage={handleButtonSendMessage}
                        currentUser={currentUser}
                        setIsZoomed={setIsZoomed}
                      />
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
    </div>
  );
};

export default TableView;
