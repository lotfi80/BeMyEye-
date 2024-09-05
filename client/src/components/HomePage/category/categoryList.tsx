
import React, { useEffect, useState } from 'react';
import { useCategoryUserContext } from '../../../context/CategoryUser';

const CategoryList: React.FC = () => {
  const { categories, setCategories, selectedCategory, setSelectedCategory } = useCategoryUserContext();
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
    <div className="flex flex-wrap gap-4 p-4">
      {categories.map((category) => (
        <div
          key={category._id}
          onClick={() => handleCategoryClick(category._id)}
          className={`bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-black hover:text-white cursor-pointer transition-colors ${
            selectedCategory === category._id ? "bg-black text-white" : ""
          }`}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
