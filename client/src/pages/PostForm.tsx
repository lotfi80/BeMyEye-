import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCategoryUserContext } from "../context/CategoryUser";
import { dataFormDatenGet, getPostByID } from "../http/api";
import { Autocomplete, LoadScript, Libraries } from "@react-google-maps/api";

const libraries: Libraries = ["places"];

const PostComponent: React.FC = () => {
  const { id } = useParams();
  const autocompleteRef = useRef(null);
  const { categories, setCategories } = useCategoryUserContext();
  const { user, setUser } = useCategoryUserContext();
  const [address, setAddress] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // const [city, setCity] = useState<string>("");
  // const [street, setStreet] = useState<string>("");
  // const [country, setCountry] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [latitute, setLatitute] = useState<string>("");
  const [longtitute, setLongtitute] = useState<string>("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorAddress, setErrorAddress] = useState("");
  const [errorCategory, setErrorCategory] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const latitute = place.geometry?.location?.lat();
      const longtitute = place.geometry?.location?.lng();
      setLatitute(latitute?.toString() || "");
      setLongtitute(longtitute?.toString() || "");
      console.log(place, " hello place");
      console.log(
        place.geometry?.location?.lat(),
        place.geometry?.location?.lng()
      );
      console.log(place.name);
      setSearchTerm(place.formatted_address || "");
      setAddress(place.formatted_address || "");
      console.log(searchTerm);
    } else {
      console.log("Error");
    }
  };

  const navigate = useNavigate();

  useEffect (() => {
    const fetOnePost = async () => {
      if (id) {
        const data = await getPostByID(id);
        setTitle(data.title);
        setDescription(data.description);
        setSelectedCategory(data.category);
        setAddress(data.address);
      }
    }
    fetOnePost();
  }, [id])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/categories/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Netzwerkantwort war nicht ok");
        }
        const data = await response.json();
        setCategories(data);
        setLoadingCategories(false);
      } catch (error) {
        setError("Fehler beim Abrufen der Kategorien");
        setLoadingCategories(false);
      }
    };

    if (categories.length === 0) {
      fetchCategories();
    } else {
      setLoadingCategories(false);
    }
  }, [categories, setCategories]);

  const handleInputAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("address", searchTerm);
    formData.append("longtitute", longtitute);
    formData.append("latitute", latitute);

    // formData.append("city", searchTerm);
    // formData.append("street", street);
    // formData.append("country", country);
    formData.append("category", selectedCategory);
    if (image) {
      formData.append("postImages", image);
    }

    const userID = user?._id;
    formData.append("userid", userID as string);
    setErrorTitle("");
    setErrorDescription("");
    setErrorAddress("");
    setErrorCategory("");
    setErrorImage("");

    const data = await dataFormDatenGet(formData, "posts/create");
    if (data?.message === "Please fill all required fields") {
      if (!title)
        setErrorTitle("Bitte füllen Sie alle erforderlichen Felder aus");
      if (!description)
        setErrorDescription("Bitte füllen Sie alle erforderlichen Felder aus");
      console.log(`das ist die data 15/09 ${JSON.stringify(data)}`);
      return;
    } else if (data?.message === "Please enter a valid street name and city") {
      setErrorAddress(
        "Bitte geben Sie einen gültigen Straßennamen und eine gültige Stadt ein"
      );
      console.log(`das ist die data 15/09 ${JSON.stringify(data)}`);
      return;
    } else if (data?.message === "Please upload an image") {
      setErrorImage("Bitte laden Sie ein Bild hoch für ihren Post");
      console.log(`das ist die data 15/09 ${JSON.stringify(data)}`);
      return;
    }
    console.log(`das ist die data 15/09 ${JSON.stringify(data)}`);
    navigate("/home");
  };

  if (loadingCategories) return <p>Lädt Kategorien...</p>;
  if (error) return <p>{error}</p>;
  const apiKey = "AIzaSyCq1RQazyFqWGNL-iwnAfZrEZbkUTJ-pqg";

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Erstelle einen neuen Post test
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold text-lg mb-2"
          >
            Post Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errorTitle && (
            <p className="text-red-500 text-sm mt-1">{errorTitle}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 font-semibold text-lg mb-2"
          >
            Post Description
          </label>
          <textarea
            id="description"
            placeholder="Beschreibung"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          {errorDescription && (
            <p className="text-red-500 text-sm mt-1">{errorDescription}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-gray-700 font-semibold text-lg mb-2"
          >
            Post Adresse and City
          </label>
          <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
            <Autocomplete
              onLoad={onLoad}
              onPlaceChanged={onPlaceChanged}
              options={{
                fields: ["formatted_address", "geometry", "name"],
                componentRestrictions: { country: "de" },
              }}
            >
              <input
                // ref={autocompleteRef}
                type="text"
                id="address"
                placeholder="adresse"
                value={address}
                onChange={handleInputAddressChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </Autocomplete>
          </LoadScript>
          {errorAddress && (
            <p className="text-red-500 text-sm mt-1">{errorAddress}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-gray-700 font-semibold text-lg mb-2"
          >
            Post Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Kategorie auswählen
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errorCategory && (
            <p className="text-red-500 text-sm mt-1">{errorCategory}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-gray-700 font-semibold text-lg mb-2"
          >
            Post Image
          </label>
          <input
            type="file"
            id="image"
            multiple={true}
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errorImage && (
            <p className="text-red-500 text-sm mt-1">{errorImage}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Post erstellen
        </button>
      </form>
    </div>
  );
};

export default PostComponent;
