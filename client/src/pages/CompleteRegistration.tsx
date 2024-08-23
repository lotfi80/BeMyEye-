import React from "react";
import { useNavigate } from "react-router-dom";

export const CompleteRegistration: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    navigate("/home");
  };

  return (
    <div>
      <h1>Complete Your Profile</h1>
      <h2>Email: user@example.com</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">First Name:</label>
        <br />
        <input type="text" id="firstname" name="firstname" required />
        <br />
        <br />

        <label htmlFor="lastname">Last Name:</label>
        <br />
        <input type="text" id="lastname" name="lastname" required />
        <br />
        <br />

        <label htmlFor="username">Username:</label>
        <br />
        <input type="text" id="username" name="username" required />
        <br />
        <br />

        <label htmlFor="birthdate">Birthdate:</label>
        <br />
        <input type="date" id="birthdate" name="birthdate" required />
        <br />
        <br />

        <label htmlFor="profileimage">Profile Image URL:</label>
        <br />
        <input type="text" id="profileimage" name="profileimage" />
        <br />
        <br />

        <label htmlFor="country">Country:</label>
        <br />
        <input type="text" id="country" name="country" required />
        <br />
        <br />

        <label htmlFor="city">City:</label>
        <br />
        <input type="text" id="city" name="city" required />
        <br />
        <br />

        <label htmlFor="street">Street:</label>
        <br />
        <input type="text" id="street" name="street" />
        <br />
        <br />

        <input type="submit" value="Complete Profile" />
      </form>
    </div>
  );
};
