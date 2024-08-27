import React from "react";
import { createContext, useState, ReactNode, useContext } from "react";
import { Categories } from "../types/types";

interface ContextType {
  categories: Categories[];
  setCategories: (categories: Categories[]) => void;
  // user: User | null;
}
interface MyProviderProps {
  children: ReactNode;
}

export const MyContext = createContext<ContextType | null>(null);

export const ContextProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Categories[]>([]);
  return (
    <MyContext.Provider value={{ categories, setCategories }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};
