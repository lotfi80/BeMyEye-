
///############################################################

// import React, { Dispatch, SetStateAction, createContext, useState, ReactNode, useContext } from "react";
// import { Categories } from "../types/types";
// import { IUser } from "../interfaces/User";

// interface ContextType {
//   categories: Categories[];
//   setCategories: (categories: Categories[]) => void;
//   user: IUser | null;
//   setUser: Dispatch<SetStateAction<IUser | null>>;
//   registrationStatus: "none" | "registered";
//   setRegistrationStatus: Dispatch<SetStateAction<"none" | "registered">>;
//   selectedCategory: string | null;
//   setSelectedCategory: Dispatch<SetStateAction<string | null>>;
//   selectedDistance: number | null;
//   setSelectedDistance: Dispatch<SetStateAction<number | null>>;
//   longFilter: number | null;
//   setLongFilter: Dispatch<SetStateAction<number | null>>;
//   latFilter: number | null;
//   setLatFilter: Dispatch<SetStateAction<number | null>>;
// }

// export const MyContext = createContext<ContextType>({
//   categories: [],
//   setCategories: () => {},
//   user: null,
//   setUser: () => {},
//   registrationStatus: "none",
//   setRegistrationStatus: () => {},
//   selectedCategory: null,
//   setSelectedCategory: () => {},
//   selectedDistance: null,
//   setSelectedDistance: () => {},
//   longFilter: null,
//   setLongFilter: () => {},
//   latFilter: null,
//   setLatFilter: () => {}
// });

// export const CategoryUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [categories, setCategories] = useState<Categories[]>([]);
//   const [user, setUser] = useState<IUser | null>(null);
//   const [registrationStatus, setRegistrationStatus] = useState<"none" | "registered">("none");
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
//   const [longFilter, setLongFilter] = useState<number | null>(null);
//   const [latFilter, setLatFilter] = useState<number | null>(null);

//   return (
//     <MyContext.Provider
//       value={{
//         categories,
//         setCategories,
//         user,
//         setUser,
//         registrationStatus,
//         setRegistrationStatus,
//         selectedCategory,
//         setSelectedCategory,
//         selectedDistance,
//         setSelectedDistance,  
//         longFilter,
//         setLongFilter,
//         latFilter,
//         setLatFilter   
        
//       }}
//     >
//       {children}
//     </MyContext.Provider>
//   );
// };

// export const useCategoryUserContext = () => useContext(MyContext);

import React, { Dispatch, SetStateAction } from "react";
import { createContext, useState, ReactNode, useContext } from "react";
import { Categories } from "../types/types";
import { IUser } from "../interfaces/User";
import { StreamState } from "http2";

interface ContextType {
  categories: Categories[];
  setCategories: (categories: Categories[]) => void;
  posts: any[];
  setPosts: (posts: any[]) => void;
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  registrationStatus: "none" | "registered";
  setRegistrationStatus: Dispatch<SetStateAction<"none" | "registered">>;
  selectedCategory: string | null;
  setSelectedCategory: Dispatch<SetStateAction<string | null>>;
  selectedDistance: number | null;
  setSelectedDistance: Dispatch<SetStateAction<number | null>>;
  longFilter: number | null;
  setLongFilter: Dispatch<SetStateAction<number | null>>;
  latFilter: number | null;
  setLatFilter: Dispatch<SetStateAction<number | null>>;
  zoomMap: number;
  setZoomMap: (zoomMap: number) => void;
}

interface MyProviderProps {
  children: ReactNode;
}

export const MyContext = createContext<ContextType>({
  categories: [],
  setCategories: () => {},
  posts: [],
  setPosts: () => {},
  user: null,
  setUser: () => {},
  registrationStatus: "none",
  setRegistrationStatus: () => {},
  selectedCategory: null,
  setSelectedCategory: () => {},
  selectedDistance: null,
  setSelectedDistance: () => {},
  longFilter: null,
  setLongFilter: () => {},
  latFilter: null,
  setLatFilter: () => {},
  zoomMap: 6,
  setZoomMap: () => {},
});

export const CategoryUserProvider: React.FC<MyProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [user, setUser] = useState<IUser | null>(null);
  const [registrationStatus, setRegistrationStatus] = useState<
    "none" | "registered"
  >("none");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  const [longFilter, setLongFilter] = useState<number | null>(null);
  const [latFilter, setLatFilter] = useState<number | null>(null);
  const [zoomMap, setZoomMap] = useState<number>(6);
  
  return (
    <MyContext.Provider
      value={{
        categories,
        setCategories,
        posts,
        setPosts,
        user,
        setUser,
        registrationStatus,
        setRegistrationStatus,
        selectedCategory,
        setSelectedCategory,
        selectedDistance,
        setSelectedDistance,
        longFilter,
        setLongFilter,
        latFilter,
        setLatFilter,
        zoomMap,
        setZoomMap,
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