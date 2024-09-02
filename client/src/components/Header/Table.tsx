import React, { useEffect, useState } from "react";
import { getUsers } from "../../http/api";
import { IUser } from "../../interfaces/User";
import {
  CategoryUserProvider,
  useCategoryUserContext,
} from "../../context/CategoryUser";

const Table: React.FC = () => {
  const [arrayAllUsers, setArrayAllUsers] = useState<IUser[] | void>([]);
  const [sortedUsers, setSortedUsers] = useState<IUser[] | void>([]);
  // const [user] = useCategoryUserContext();

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
    if (Array.isArray(arrayAllUsers)) {
      const sortedUsers = [...arrayAllUsers].sort((user1, user2) => {
        const name1 = user1.username || "";
        const name2 = user2.username || "";

        if (!name1 && name2) return 1;
        if (name1 && !name2) return -1;

        return name1.localeCompare(name2);
      });
      setSortedUsers(sortedUsers);
      console.log("Sorted users:", sortedUsers);
    }
  }, [arrayAllUsers]);

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
    <div className="p-6">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Avatar
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              UserName
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              First Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Birthday
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Country
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              City
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedUsers ? (
            sortedUsers.map((user: any) => (
              <tr key={user._id}>
                <td className="px-6 py-2 whitespace-nowrap">
                  <img
                    src={`${userImage(user)}`}
                    alt="avatar"
                    className="w-8 h-8 object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.privacy.email ? user.email : ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.privacy.firstname ? user.firstname : ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.privacy.lastname ? user.lastname : ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.privacy.birthdate ? formatDate(user.birthdate) : ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.privacy.country ? user.country : ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.privacy.city ? user.city : ""}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="px-6 py-4 text-center">
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
