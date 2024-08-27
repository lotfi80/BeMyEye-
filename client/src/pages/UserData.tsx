import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dataFormDatenGet, getUserIDByToken } from "../http/api";
import { useParams } from "react-router-dom";
import { IUser } from "../interfaces/User";
import { useCategoryUserContext } from "../context/CategoryUser";

const UserData: React.FC = () => {
  const navigate = useNavigate();
  const {user, setUser} = useCategoryUserContext();
  const { id } = useParams<{ id: string | undefined }>();
  useEffect(() => {
    const fetchUser = async () => {
      const userId = await getUserIDByToken();
      if (!userId) {
        console.error("User ID not found");
        return;
      }
      const user = await dataFormDatenGet<IUser>(`api/userProfile/${userId}`);
      if (user) {
        setFirstname(user.firstname);
        setLastname(user.lastname);
        setUsername(user.username);
        setBirthdate(user.birthdate);
        setCountry(user.country);
        setCity(user.city);
        setStreet(user.street);
      }
    };
    if (id) {
      fetchUser();
    } else {
      console.error("User ID is missing.");
    }
  }, []);

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("");
  const [profileimage, setProfileimage] = React.useState<File | null>(null);
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [street, setStreet] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    console.log("handleSubmit");
    event.preventDefault();
    // const form = event.target as HTMLFormElement;
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("username", username);
    formData.append("birthdate", birthdate);
    if (profileimage) {
      formData.append("profileimage", profileimage);
    }
    formData.append("country", country);
    formData.append("city", city);
    formData.append("street", street);

    if (id) {
      await dataFormDatenGet(formData, `api/userProfile/${id}`);
    } else {
      console.error("User ID is missing.");
    }
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
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
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
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
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
          onChange={(e) =>
            setProfileimage(e.target.files ? e.target.files[0] : null)
          }
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
          value={country}
          required
          onChange={(e) => setCountry(e.target.value)}
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
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
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
          value={street}
          required
          onChange={(e) => setStreet(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <br />
        <br />

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
