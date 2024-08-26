import React, { useEffect, useState } from "react";
import { useMyContext } from "../context/context";
import { getUserIDByToken } from "../http/api";

const PostComponent: React.FC = () => {
  const { categories, setCategories } = useMyContext();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/categories", {
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

    // Wenn die Kategorien im Kontext leer sind, lade sie
    if (categories.length === 0) {
      fetchCategories();
    } else {
      setLoadingCategories(false);
    }
  }, [categories, setCategories]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const userId = await getUserIDByToken();
    if (!userId) {
      console.error("User ID not found");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("city", city);
    formData.append("street", street);
    formData.append("country", country);
    formData.append("category", selectedCategory);
    if (image) {
      formData.append("image", image);
    }
    formData.append("userid", userId);
    try {
      const response = await fetch("http://localhost:5000/posts/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formData,
      });
      const data = await response.json();
      console.log("Post erfolgreich erstellt:", data);
    } catch (error) {
      console.error("Fehler beim Erstellen des Posts:", error);
    }
  };

  if (loadingCategories) return <p>Lädt Kategorien...</p>;
  if (error) return <p>{error}</p>;

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
        <input
          type="text"
          placeholder="Stadt"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
