import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategoryUserContext } from "../context/CategoryUser";
import { dataFormDatenGet } from "../http/api";
import { Autocomplete, LoadScript, Libraries } from "@react-google-maps/api";

const libraries: Libraries = ["places"];

const PostComponent: React.FC = () => {
  const { categories, setCategories } = useCategoryUserContext();
  const { user, setUser } = useCategoryUserContext();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [latitute, setLatitute] = useState<string>("");
  const [longtitute, setLongtitute] = useState<string>("");
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
      console.log(searchTerm);
    } else {
      console.log("Error");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/categories/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("address", searchTerm);
    formData.append("longtitute", longtitute);
    formData.append("latitute", latitute);

    formData.append("city", searchTerm);
    formData.append("street", street);
    formData.append("country", country);
    formData.append("category", selectedCategory);
    if (image) {
      formData.append("postImages", image);
    }

    const userID = user?._id;
    formData.append("userid", userID as string);

    await dataFormDatenGet(formData, "posts/create");
    navigate("/home");
  };

  if (loadingCategories) return <p>Lädt Kategorien...</p>;
  if (error) return <p>{error}</p>;
  const apiKey = "AIzaSyCq1RQazyFqWGNL-iwnAfZrEZbkUTJ-pqg";

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Erstelle einen neuen Post
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Beschreibung"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
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
              type="text"
              placeholder="adresse"
              // value={searchTerm}
              // onChange={(e) => setCity(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </Autocomplete>
        </LoadScript>

        <input
          type="text"
          placeholder="Straße"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Land"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
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
        <input
          type="file"
          multiple = {true}
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
