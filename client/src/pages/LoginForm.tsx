import React, { useState } from "react";
import { loginUser } from "../http/api";
import { useNavigate } from "react-router-dom";
import { useCategoryUserContext } from "../context/CategoryUser";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { user, setUser } = useCategoryUserContext();

  const handleSubmitClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const currentUser = await loginUser(email, password);
      setUser(currentUser);
      navigate(`/home`);
    } catch (error) {
      alert(error.message);
    }
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
      </form>
      <a className="button google" href={`http://localhost:5000/auth/google`}>
        Sign in with Google
      </a>
    </div>
  );
};

export default LoginForm;
