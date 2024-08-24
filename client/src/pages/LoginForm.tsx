import React, { useState } from "react";
import { loginUser } from "../http/api";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmitClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { accessToken, refreshToken } = await loginUser(email, password);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userEmail", email);
      alert("Login successful!");
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = "/auth/google";
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmitClick}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <a
          className="button google"
          href="api/auth/google"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </a>
      </form>
    </div>
  );
};

export default LoginForm;
