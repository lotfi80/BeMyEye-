import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategoryUserContext } from "../context/CategoryUser";
import {
  userInContextUpdateRequest,
  getHash,
  uploadProfileImage,
  getUserDataByID,
} from "../http/api";

const UserData: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useCategoryUserContext();
  const [image, setImage] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [inputVisible, setInputVisible] = useState<boolean>(false);

  console.log("user.profileImage", user?.profileimage);
  useEffect(() => {
    console.log("User data updated:", user);
  }, [user]);

  const profileImage = user?.profileimage
    ? `http://localhost:5000/${user.profileimage}`
    : null;
  console.log("profileImage", profileImage);
  const defaultImage =
    "http://localhost:5000/profileImages/avatar-default-svgrepo-com.svg";
  const avatar = profileImage || defaultImage;
  console.log("avatar", avatar);
  const imageUrl = image ? URL.createObjectURL(image) : avatar;

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setUser(
      (prevUser) =>
        prevUser && {
          ...prevUser,
          [fieldName]: event.target.value,
        }
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if ((password || confirmPassword || oldPassword) && user) {
      if (password === confirmPassword) {
        if (user.hasPassword && oldPassword) {
          await getHash(user._id, oldPassword, password);
        } else if (!user.hasPassword) {
          await getHash(user._id, oldPassword, password);
          user.hasPassword = true;
        } else {
          alert("Enter your password");
          return;
        }
      } else {
        alert("Passwords do not match");
        return;
      }
    }

    if (user) {
      await userInContextUpdateRequest(user._id, user);
      console.log("User data submitted:", user);
    }

    try {
      if (image && user) {
        const formData = new FormData();
        formData.append("profileimage", image);

        await uploadProfileImage(user._id, formData);

        if (user) {
          const updatedUser = await getUserDataByID(user._id);
          updatedUser && setUser(updatedUser);
        }
        console.log("Profile image uploaded successfully.");
        console.log("Profile image uploaded successfully:", image);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Invalid Data submitted");
    }

    navigate("/home");
  };
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <img
        src={imageUrl}
        alt="Profile Image"
        className="w-32 h-32 object-cover rounded-full"
      />
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
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
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
        {!user?.hasPassword && (
          <div>
            <label htmlFor="passCreate">Create password:</label>
            <input
              type="password"
              id="passCreate"
              name="passCreate"
              placeholder="min 6 signs"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="passConfirm">Confirm password:</label>
            <input
              type="password"
              id="passConfirm"
              name="passConfirm"
              placeholder="min 6 signs"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {user?.hasPassword && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setInputVisible(true);
            }}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Change password
          </button>
        )}

        {inputVisible && (
          <div>
            <label htmlFor="oldPass">Enter your password:</label>
            <input
              type="password"
              id="oldPass"
              name="oldPass"
              placeholder="enter your password"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="passCreate">New password:</label>
            <input
              type="password"
              id="passCreate"
              name="passCreate"
              placeholder="min 6 signs"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label htmlFor="passConfirm">Confirm password:</label>
            <input
              type="password"
              id="passConfirm"
              name="passConfirm"
              placeholder="min 6 signs"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
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

        <button
          type="button"
          onClick={() => navigate("/home")}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
export default UserData;
