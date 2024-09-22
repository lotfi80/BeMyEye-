import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { fetchUser } from "./http/api";

import ActivationSuccess from "./pages/ActivationSuccess";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import { Privacy } from "./pages/Privacy";
// import { Location } from "./pages/Location";
import TermOfService from "./pages/TermOfService";
import UserData from "./pages/UserData";
import GoogleAuthCallback from "./components/GoogleAuthCallback";
import { Error } from "./pages/Error";
import { CategoryUserProvider } from "./context/CategoryUser";
import Header from "./components/Header/main";
import Home from "./pages/Home";
// import PostWindow from "./pages/PostWindow";
import Footer from "./components/Footer";
import PostForm from "./pages/PostForm";
import WriteMessage from "./components/Header/WriteMessage";
import { UserContextSaver, UserContextLoader } from "./components/LocalStorage";

const App: React.FC = () => {
  return (
    <Router>
      <CategoryUserProvider>
        <UserContextLoader />
        <UserContextSaver />
        <div className="bg-white h-screen w-full relative">
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

            <Route path="/posts" element={<PostForm />} />
            <Route path="/posts/:id" element={<PostForm />} />

            <Route path="/privacy" element={<Privacy />} />
            <Route path="/term" element={<TermOfService />} />
            <Route path="/tokenReceive" element={<GoogleAuthCallback />} />
            <Route path="/error" element={<Error />} />
          </Routes>
          <Footer />
        </div>
      </CategoryUserProvider>
    </Router>
  );
};

export default App;
