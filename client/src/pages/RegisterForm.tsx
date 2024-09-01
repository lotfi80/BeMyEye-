import React, { useState } from "react";
import { registerUser } from "../http/api";
import { useNavigate } from "react-router-dom";
import "../css/styleregister.css"
const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmitClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await registerUser(email, password);
      alert(
        "Registration successful! Please check your email to activate your account."
      );
      // navigate("/UserData");
    } catch (error) {
      alert(error.message);
    }
  };

  return (

    <div className="register-container">
    <h1 className="register-title">BeMyEye</h1>
    <form onSubmit={handleSubmitClick}>
      <div className="form-group">
        <label>Email:</label>
        <input
          className="form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Confirm Password:</label>
        <input
          className="form-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-button">
        Register
      </button>
    </form>
    <a
      className="button google"
      href={`http://localhost:5000/auth/google/register`}
    >
      Register with Google
    </a>
  </div>
);
};

    // <div>
    //   <h1>Register</h1>
    //   <form onSubmit={handleSubmitClick}>
    //     <div>
    //       <label>Email:</label>
    //       <input
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label>Password:</label>
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label>Confirm Password:</label>
    //       <input
    //         type="password"
    //         value={confirmPassword}
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <button type="submit">Register</button>
    //   </form>
    //   <a
    //     className="button google"
    //     href={`http://localhost:5000/auth/google/register`}
    //   >
    //     Register with Google
    //   </a>
    // </div>


export default RegisterForm;
