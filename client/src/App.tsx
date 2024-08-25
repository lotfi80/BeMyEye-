import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import ActivationSuccess from "./pages/ActivationSuccess";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import { HomePage } from "./pages/HomePage";
import { Privacy } from "./pages/Privacy";
import { Location } from "./pages/Location";
import TermOfService from "./pages/TermOfService";
import UserData from "./pages/UserData";
import { fetchUser } from "./http/api";
import { IUser } from "./interfaces/User";
import { GoogleAuthCallback } from "./components/GoogleAuthCallback";
import { Error } from "./pages/Error";

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
      <Routes>
        <Route path="/" element={<RegisterForm />} index />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/activate/:activationLink"
          element={<ActivationSuccess />}
        />
        <Route path="/home" element={<HomePage />} />
        <Route path="/location" element={<Location />} />

        <Route path="/userdata/:id" element={<UserData />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/term" element={<TermOfService />} />
        <Route path="/token-receive" element={<GoogleAuthCallback />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
