import React from "react";
import { createContext, useState, ReactNode, useContext } from "react";
import { Categories } from "../types/types";
import { IUser } from "../interfaces/User";

interface ContextType {
  categories: Categories[];
  setCategories: (categories: Categories[]) => void;
  user: IUser | null;
  setUser: (user: IUser) => void;
}

interface MyProviderProps {
  children: ReactNode;
}

export const MyContext = createContext<ContextType | null>(null);

export const CategoryUserProvider: React.FC<MyProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [user, setUser] = useState<IUser | null>(null);
  return (
    <MyContext.Provider value={{ categories, setCategories, user, setUser }}>
      {children}
    </MyContext.Provider>
  );
};

export const useCategoryUserContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};
