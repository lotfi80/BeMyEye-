import React, { useEffect, useState } from "react";
import { useCategoryUserContext } from "../../../context/CategoryUser";

const CategoryList: React.FC = () => {
  const { categories, setCategories, selectedCategory, setSelectedCategory } =
    useCategoryUserContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        const newAccessToken = response.headers.get("x-access-token");
    console.log("Old Access Token:", localStorage.getItem("accessToken"));
    if (newAccessToken) {
      console.log("New Access Token received:", newAccessToken);
      localStorage.setItem("accessToken", newAccessToken);
    }
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, [setCategories]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col  p-4 sticky top-5 z--1000 rounded-lg border-2 border-solid border-[#2781b5]">
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      <div className="flex flex-wrap gap-5 justify-center">
        {categories.map((category) => (
       
          <div
  key={category._id}
  onClick={() => handleCategoryClick(category._id)}
  className={`button-category text- font-bold text-sm ${selectedCategory === category._id ? 'selected' : 'default'}`}
>
  {category.name}
</div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
