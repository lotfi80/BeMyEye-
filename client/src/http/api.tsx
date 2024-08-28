import { AuthTokens } from "../interfaces/AuthToken";
import { IUser } from "../interfaces/User";

const BASE_URL = "http://localhost:5000/api";

// **********************************************************************
export const registerUser = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:5000/auth/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred during registration");
  }
};
// **********************************************************************

export const activateUser = async (activationLink: string): Promise<any> => {
  try {
    console.log(
      `Sending request to: http://localhost:5000/auth/activate/${activationLink}`
    );
    const response = await fetch(
      `http://localhost:5000/auth/activate/${activationLink}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      console.error("Response status:", response.status);
      throw new Error(`Activation failed: ${response.statusText}`);
    }
    console.log("Activation successful");
  } catch (error) {
    console.error("Error during activation:", error);
    throw new Error("An error occurred during account activation");
  }
};

// **********************************************************************
export const getUserIdByActivationLink = async (
  activationLink: string
): Promise<string | undefined> => {
  try {
    const response = await fetch(
      `http://localhost:5000/auth/user/${activationLink}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch user by activation link:", error);
  }
};
// ***************************************************************************
export const loginUser = async (
  email: string,
  password: string
): Promise<IUser> => {
  try {
    const response = await fetch(`http://localhost:5000/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorMessage = await response.text();

      console.error(`Login failed: ${errorMessage}`);
      throw new Error("Login failed");
    }

    const data = await response.json();

    if (data.tokens) {
      localStorage.setItem("accessToken", data.tokens.accessToken);
      localStorage.setItem("refreshToken", data.tokens.refreshToken);
      alert("Login successful!");
    } else {
      console.log("No tokens found in response");
    }

    return data.user;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred during login");
  }
};
// **********************************************************************
export const googleLogin = async (): Promise<IUser | void> => {
  try {
    const response = await fetch(`http://localhost:5000/auth/tokenReceive`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tokens");
    }

    const data = await response.json();
    if (data.tokensAndID) {
      localStorage.setItem("accessToken", data.tokensAndID.accessToken);
      localStorage.setItem("refreshToken", data.tokensAndID.refreshToken);
      alert("Login successful!");
    } else {
      console.log("No tokens found in response");
    }

    return data.currentUser;
  } catch (error) {
    console.error("Google login failed:", error);
  }
};
// **********************************************************************
export const logout = async (): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:5000/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userEmail");
    console.log("Logged out successfully");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

// **********************************************************************
export const getUserDataByID = async (
  id: string
): Promise<IUser | undefined> => {
  try {
    const response = await fetch(`http://localhost:5000/api/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const user: IUser = await response.json();
    return user;
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};

// **********************************************************************
export const fetchUser = async (): Promise<IUser | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "GET",
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      // },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const users: IUser = await response.json();
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};
// **************************************************************************
export const dataFormDatenGet = async (formData: FormData, pathEnd: string) => {
  try {
    const response = await fetch(`http://localhost:5000/${pathEnd}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("Server response error:", data);
      throw new Error("Failed to create form");
    }
    console.log("Form submitted successfully:", data);
  } catch (error) {
    console.error("Fehler beim Erstellen der Form:", error);
  }
};
