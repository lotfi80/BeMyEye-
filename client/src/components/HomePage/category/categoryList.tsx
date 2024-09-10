import React, { useEffect, useState } from "react";
import { useCategoryUserContext } from "../../../context/CategoryUser";

const CategoryList: React.FC = () => {
  const { categories, setCategories } = useCategoryUserContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        console.log(response);
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        setError("Fehler beim Abrufen der Kategorien");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Lädt...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col gap-4 p-4 border">
      {categories.map((category) => (
        <div
          key={category._id}
          className="bg-white text-sm font-semibold leading-6 px-4 py-2 rounded-md hover:bg-[#38b5ff]  hover:text-white cursor-pointer transition-colors"
          
        >
          {category.name}
        </div>
      ))}
      
    </div>
  );
};

export default CategoryList;
