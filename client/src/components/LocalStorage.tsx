import React, { useEffect } from "react";
import { useCategoryUserContext } from "../context/CategoryUser";

export const UserContextSaver: React.FC = () => {
  const { user } = useCategoryUserContext();
  const { categories } = useCategoryUserContext();

  useEffect(() => {
    if (user) {
      localStorage.setItem("userData", JSON.stringify(user));
      localStorage.setItem("categoryData", JSON.stringify(categories));
    }
  }, [user]);

  return null;
};
// **********************************************************************

export const UserContextLoader: React.FC = () => {
  const { setUser } = useCategoryUserContext();
  const { setCategories } = useCategoryUserContext();

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedCategories = localStorage.getItem("categoryData");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, [setUser]);

  return null;
};
