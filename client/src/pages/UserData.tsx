import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCategoryUserContext } from "../context/CategoryUser";
import { userInContextUpdateRequest, getHash } from "../http/api";

const UserData = (): React.ReactNode => {
  const navigate = useNavigate();
  const { user, setUser } = useCategoryUserContext();
  let isPassword: Boolean = !!user?.password;
  let password: string = "";

  useEffect(() => {
    console.log("user", user);
  }, []);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    event.preventDefault();
    setUser(
      (prevUser) =>
        prevUser && {
          ...prevUser,
          [fieldName]: event.target.value,
        }
    );
  };
  // ********************************************************************************************************************

  // const handleOnChangePassword = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   event.preventDefault();
  //   event.target.value === password
  //     ? setUser(
  //         (prevUser) =>
  //           prevUser && {
  //             ...prevUser,
  //             password: event.,
  //           }
  //       )
  //     : console.log("Password is not confirmed)");
  // };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isPassword && user && password) {
      const hashPassword: string | void = await getHash(user._id, password);
      if (!hashPassword) {
        alert("Password is not confirmed");
        return;
      }
      setUser(
        (prevUser) =>
          prevUser && {
            ...prevUser,
            password: hashPassword,
          }
      );
    } else {
      alert("Password is not confirmed");
    }

    if (user) await userInContextUpdateRequest(user._id, user);
    console.log("User data submitted:", user);

    navigate("/home");
    // const form = event.target as HTMLFormElement;
    // const formData = new FormData();
    // formData.append("firstname", user?.firstname || "");
    // formData.append("lastname", user?.lastname || "");
    // formData.append("username", user?.username || "");
    // formData.append("birthdate", user?.birthdate?.toISOString().split('T')[0]  || "");
    // if (user?.profileimage) {
    //   formData.append("profileimage", user?.profileimage);
    // }
    // formData.append("country", user?.country || "");
    // formData.append("city", user?.city || "");
    // formData.append("street", user?.street || "");
    // const response = await dataFormDatenGet(formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Complete Your Profile
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="firstname">First Name:</label>
        <br />
        <input
          type="text"
          id="firstname"
          name="firstname"
          placeholder={`${user?.firstname}`}
          value={user?.firstname || ""}
          onChange={(e) => handleOnChange(e, "firstname")}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <br />
        <br />
        <label htmlFor="lastname">Last Name:</label>
        <br />
        <input
          type="text"
          id="lastname"
          name="lastname"
          placeholder={`${user?.lastname}`}
          value={user?.lastname || ""}
          onChange={(e) => handleOnChange(e, "lastname")}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <br />
        <br />
        <label htmlFor="username">Username:</label>
        <br />
        <input
          type="text"
          id="username"
          name="username"
          placeholder={`${user?.username}`}
          value={user?.username || ""}
          onChange={(e) => handleOnChange(e, "username")}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <br />
        <br />
        <label htmlFor="birthdate">Birthdate:</label>
        <br />
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          placeholder={`${user?.birthdate}`}
          value={
            user?.birthdate
              ? new Date(user.birthdate).toISOString().split("T")[0]
              : ""
          }
          onChange={(e) => {
            setUser(
              (prevUser) =>
                prevUser && {
                  ...prevUser,
                  birthdate: e.target.value ? new Date(e.target.value) : null,
                }
            );
          }}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <br />
        <br />
        <label htmlFor="profileimage">Profile Image URL:</label>
        <br />
        <input
          type="file"
          id="profileimage"
          name="profileimage"
          // onChange={(e) =>
          //   setProfileimage(e.target.files ? e.target.files[0] : null)}

          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <br />
        <br />
        <label htmlFor="country">Country:</label>
        <br />
        <input
          type="text"
          id="country"
          name="country"
          placeholder={`${user?.country}`}
          value={user?.country || ""}
          onChange={(e) => handleOnChange(e, "country")}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <br />
        <br />
        <label htmlFor="city">City:</label>
        <br />
        <input
          type="text"
          id="city"
          name="city"
          placeholder={`${user?.city}`}
          value={user?.city || ""}
          onChange={(e) => handleOnChange(e, "city")}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <br />
        <br />
        <label htmlFor="street">Street:</label>
        <br />
        <input
          type="text"
          id="street"
          name="street"
          placeholder={`${user?.street}`}
          value={user?.street || ""}
          onChange={(e) => handleOnChange(e, "street")}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <br />
        <br />
        {!isPassword && (
          <div>
            <label htmlFor="passCreate">Create password:</label>
            <input
              type="password"
              id="passCreate"
              name="passCreate"
              placeholder="min 6 signs"
              value={""}
              onChange={(e) => {
                (password = e.target.value), (isPassword = true);
              }}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="passCreate">Confirm password:</label>
            <input
              type="password"
              id="passConfirm"
              name="passConfirm"
              placeholder="min 6 signs"
              value={""}
              onChange={(e) => {
                e.target.value !== password
                  ? (isPassword = true)
                  : (isPassword = false);
              }}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default UserData;
