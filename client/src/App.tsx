import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { fetchUser } from "./http/api";

import ActivationSuccess from "./pages/ActivationSuccess";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import { Privacy } from "./pages/Privacy";
import { Location } from "./pages/Location";
import TermOfService from "./pages/TermOfService";
import UserData from "./pages/UserData";
import { IUser } from "./interfaces/User";
import { GoogleAuthCallback } from "./components/GoogleAuthCallback";
import { Error } from "./pages/Error";
// ////
import { CategoryUserProvider } from "./context/CategoryUser";
// ////
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import PostComponent from "./components/PostComponent";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user: IUser | undefined = await fetchUser();
        setIsAuthenticated(!!user);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <Router>
      <CategoryUserProvider>
        <div className="bg-white h-screen w-full">
          <Header />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterForm />} index />
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/activate/:activationLink"
              element={<ActivationSuccess />}
            />
            <Route path="/profile/:id" element={<UserData />} />

            <Route path="/posts" element={<PostComponent />} />
            <Route path="/location" element={<Location />} />

            <Route path="/privacy" element={<Privacy />} />
            <Route path="/term" element={<TermOfService />} />
            <Route path="/token-receive" element={<GoogleAuthCallback />} />
            <Route path="/error" element={<Error />} />
          </Routes>
          <Footer />
        </div>
      </CategoryUserProvider>
    </Router>
  );
};

export default App;
