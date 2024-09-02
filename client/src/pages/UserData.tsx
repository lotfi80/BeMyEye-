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
  const [galleryImage, setGalleryImage] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [sex, setSex] = useState<number | undefined>(undefined);

  console.log("user.profileImage", user?.profileimage);
  useEffect(() => {
    if (user?.sex !== undefined) {
      setSex(user?.sex);
    }
  }, [user]);

  useEffect(() => {
    console.log("galleryImage updated", galleryImage);
    if (user && galleryImage) {
      setUser({
        ...user,
        profileimage: galleryImage,
      });
    }
  }, [galleryImage]);

  const validImages = [
    "http://localhost:5000/profileImages/avatar-default.svg",
    "http://localhost:5000/profileImages/diverse.png",
    "http://localhost:5000/profileImages/man.jpg",
    "http://localhost:5000/profileImages/woman.jpg",
  ];

  let defaultImage: string;
  switch (user?.sex) {
    case 0:
      defaultImage = "http://localhost:5000/profileImages/diverse.png";
      break;
    case 1:
      defaultImage = "http://localhost:5000/profileImages/woman.jpg";
      break;
    case 2:
      defaultImage = "http://localhost:5000/profileImages/man.jpg";
      break;
    default:
      defaultImage = "http://localhost:5000/profileImages/avatar-default.svg";
  }

  const profileImage =
    user?.profileimage && validImages.includes(user.profileimage)
      ? defaultImage
      : `http://localhost:5000/${user?.profileimage}`;
  console.log("profileImage", profileImage);
  console.log("userprofileImage", user?.profileimage);

  const avatar = profileImage || defaultImage;
  console.log("avatar", avatar);

  const imageUrl = image
    ? URL.createObjectURL(image)
    : galleryImage
    ? `http://localhost:5000/${galleryImage}`
    : avatar;

  console.log("imageUrl", imageUrl);

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
  const handleAvatarButton = (
    event: React.MouseEvent<HTMLButtonElement>,
    img: string
  ) => {
    event.preventDefault();
    setGalleryImage(img);
    setUser((prevUser) => {
      if (prevUser) {
        return {
          ...prevUser,
          profileimage: img,
        };
      }
      return prevUser;
    });
    console.log("galleryImage", img);
    console.log("user.profileimage", img);
  };

  const handleOnRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    sex: number
  ) => {
    setSex(sex);
    setUser(
      (prevUser) =>
        prevUser && {
          ...prevUser,
          sex: sex,
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

        // if (user) {
        //   const updatedUser = await getUserDataByID(user._id);
        //   updatedUser && setUser(updatedUser);
        // }
      }

      if (galleryImage && user) {
        console.log("galleryImage", galleryImage);
        console.log(user);
        const currentUser = await userInContextUpdateRequest(user._id, user);
        console.log("Updated user:", currentUser);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Invalid Data submitted");
    }
    // path anpassen wie du im backened hast
    


    if (user) {
      const updatedUser = await getUserDataByID(user._id);
      console.log("updatedUser2", updatedUser);
      updatedUser && setUser(updatedUser);
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
        <label htmlFor="sex" className="block mb-2">
          Sex:
        </label>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <input
              className="mr-2"
              type="radio"
              id="female"
              name="sex"
              value="w"
              checked={sex === 1}
              onChange={(e) => {
                handleOnRadioChange(e, 1);
              }}
            />
            <label htmlFor="female">w</label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="male"
              name="sex"
              value="m"
              className="mr-2"
              checked={sex === 2}
              onChange={(e) => {
                handleOnRadioChange(e, 2);
              }}
            />
            <label htmlFor="male">m</label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="diverse"
              name="sex"
              value="d"
              className="mr-2"
              checked={sex === 0}
              onChange={(e) => {
                handleOnRadioChange(e, 0);
              }}
            />
            <label htmlFor="diverse">d</label>
          </div>
        </div>
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
        <div className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <label htmlFor="profileimage">Profile Image URL:</label>
          <br />
          <input
            type="file"
            id="profileimage"
            name="profileimage"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <br />
          <br />
          {/* ************************************************* */}
          <label htmlFor="gallerySelect">
            Or pick an avatar from our gallery:
          </label>
          <div className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <button
              className="w-24 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={(e) =>
                handleAvatarButton(e, "profileImages/avatar1.jpg")
              }
            >
              <img
                src="http://localhost:5000/profileImages/avatar1.jpg"
                alt="avatar1"
              />
            </button>
            <button
              onClick={(e) =>
                handleAvatarButton(e, "profileImages/avatar2.jpg")
              }
              className="w-24 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src="http://localhost:5000/profileImages/avatar2.jpg"
                alt="avatar2"
              />
            </button>
            <button
              onClick={(e) =>
                handleAvatarButton(e, "profileImages/avatar3.jpg")
              }
              className="w-24 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src="http://localhost:5000/profileImages/avatar3.jpg"
                alt="avatar3"
              />
            </button>
            <button
              onClick={(e) =>
                handleAvatarButton(e, "profileImages/avatar4.jpg")
              }
              className="w-24 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src="http://localhost:5000/profileImages/avatar4.jpg"
                alt="avatar4"
              />
            </button>
            <button
              onClick={(e) =>
                handleAvatarButton(e, "profileImages/avatar5.jpg")
              }
              className="w-24 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src="http://localhost:5000/profileImages/avatar5.jpg"
                alt="avatar5"
              />
            </button>
            <button
              onClick={(e) =>
                handleAvatarButton(e, "profileImages/avatar6.jpg")
              }
              className="w-24 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src="http://localhost:5000/profileImages/avatar6.jpg"
                alt="avatar6"
              />
            </button>
            <button
              onClick={(e) =>
                handleAvatarButton(e, "profileImages/avatar7.jpg")
              }
              className="w-24 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src="http://localhost:5000/profileImages/avatar7.jpg"
                alt="avatar7"
              />
            </button>
            <button
              onClick={(e) =>
                handleAvatarButton(e, "profileImages/avatar8.jpg")
              }
              className="w-24 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src="http://localhost:5000/profileImages/avatar8.jpg"
                alt="avatar8"
              />
            </button>
            <button
              onClick={(e) =>
                handleAvatarButton(e, "profileImages/avatar9.jpg")
              }
              className="w-24 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src="http://localhost:5000/profileImages/avatar9.jpg"
                alt="avatar9"
              />
            </button>
            <button
              onClick={(e) =>
                handleAvatarButton(e, "profileImages/avatar10.jpg")
              }
              className="w-24 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src="http://localhost:5000/profileImages/avatar10.jpg"
                alt="avatar10"
              />
            </button>
            <button
              onClick={(e) =>
                handleAvatarButton(e, "profileImages/avatar11.jpg")
              }
              className="w-24 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src="http://localhost:5000/profileImages/avatar11.jpg"
                alt="avatar11"
              />
            </button>
            <button
              onClick={(e) =>
                handleAvatarButton(e, "profileImages/avatar12.jpg")
              }
              className="w-24 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src="http://localhost:5000/profileImages/avatar12.jpg"
                alt="avatar12"
              />
            </button>
            <button
              onClick={(e) =>
                handleAvatarButton(e, "profileImages/avatar13.jpg")
              }
              className="w-24 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src="http://localhost:5000/profileImages/avatar13.jpg"
                alt="avatar13"
              />
            </button>
            <button
              onClick={(e) =>
                handleAvatarButton(e, "profileImages/avatar14.jpg")
              }
              className="w-24 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src="http://localhost:5000/profileImages/avatar14.jpg"
                alt="avatar14"
              />
            </button>
            <button
              onClick={(e) =>
                handleAvatarButton(e, "profileImages/avatar15.jpg")
              }
              className="w-24 px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src="http://localhost:5000/profileImages/avatar15.jpg"
                alt="avatar15"
              />
            </button>
          </div>
        </div>
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
