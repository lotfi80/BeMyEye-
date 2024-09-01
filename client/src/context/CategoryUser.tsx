import React, { Dispatch, SetStateAction } from "react";
import { createContext, useState, ReactNode, useContext } from "react";
import { Categories } from "../types/types";
import { IUser } from "../interfaces/User";
import { StreamState } from "http2";

interface ContextType {
  categories: Categories[];
  setCategories: (categories: Categories[]) => void;
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  registrationStatus: "none" | "registered";
  setRegistrationStatus: Dispatch<SetStateAction<"none" | "registered">>;
}

interface MyProviderProps {
  children: ReactNode;
}

export const MyContext = createContext<ContextType>({
  categories: [],
  setCategories: () => {},
  user: null,
  setUser: () => {},
  registrationStatus: "none",
  setRegistrationStatus: () => {},
});

export const CategoryUserProvider: React.FC<MyProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [user, setUser] = useState<IUser | null>(null);
  const [registrationStatus, setRegistrationStatus] = useState<
    "none" | "registered"
  >("none");
  return (
    <MyContext.Provider
      value={{
        categories,
        setCategories,
        user,
        setUser,
        registrationStatus,
        setRegistrationStatus,
      }}
    >
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
