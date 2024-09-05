import React, { useEffect, useState } from "react";
import { getUsers } from "../../../http/api";
import { IUser } from "../../../interfaces/User";

import TableHeadCell from "./TableHeadCell";

const Table: React.FC = () => {
  const [arrayAllUsers, setArrayAllUsers] = useState<IUser[] | void>([]);
  const [sortedUsers, setSortedUsers] = useState<IUser[] | void>([]);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("username");

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

  return (
    <div className="p-2 pt-10 text-xs">
      <table className="min-w-full divide-y divide-gray-400">
        <tbody className="bg-white divide-y divide-gray-200 ">
           <tr>
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
    </div>
  );
};

export default Table;
