import { AuthTokens } from "../interfaces/AuthToken";
import { IUser } from "../interfaces/User";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000/api";
// Функция для выполнения запросов с аутентификацией
type FetchOptions = RequestInit & {
  headers?: { [key: string]: string };
};
// **********************************************************************
export const fetchWithAuth = async (
  url: string,
  options: FetchOptions = {}
) => {
  let accessToken: string | null | undefined =
    localStorage.getItem("accessToken");

  const makeRequest = async (): Promise<Response> => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      accessToken = await refreshToken();

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return response;
  };
  return makeRequest();
};
// **********************************************************************
export const registerUser = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/registration`, {
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
// export const googleRegistration = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {

//   }

// };
// **********************************************************************
export const activateUser = async (activationLink: string): Promise<any> => {
  // Use 'any' to capture any type of response for debugging
  try {
    console.log(`Sending request to: ${BASE_URL}/activate/${activationLink}`);
    const response = await fetch(`${BASE_URL}/activate/${activationLink}`, {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Response status:", response.status);
      console.error("Response text:", await response.text());
      throw new Error(`Activation failed: ${response.statusText}`);
    }
    console.log("Activation successful");
    // const jsonData = await response.json();
    // console.log("Response data:", jsonData);
    // return jsonData;
  } catch (error) {
    console.error("Error during activation:", error);
    throw new Error("An error occurred during account activation");
  }
};
// **************************************************************************
export const completeRegistrationFunction = async (
  id: string,
  formData: Record<string, any>
) => {
  try {
    const response = await fetch(`${BASE_URL}/complete-registration/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Activation failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred during registration");
  }
};
// ***************************************************************************
export const loginUser = async (
  email: string,
  password: string
): Promise<AuthTokens> => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data: AuthTokens = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred during login");
  }
};
// **********************************************************************
export const googleLogin = async (): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/get-tokens`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tokens");
    }

    const data: AuthTokens = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("userEmail", data.email);
  } catch (error) {
    console.error("Google login failed:", error);
  }
};
// **********************************************************************
export const logout = async (): Promise<void> => {
  try {
    const response = await fetch("http://localhost:5000/api/logout", {
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
export const refreshToken = async (): Promise<string | undefined> => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }
  try {
    const response = await fetch("http://localhost:5000/api/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data: AuthTokens | undefined = await response.json();
    if (data) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      console.log("Tokens refreshed successfully");
      return data.accessToken;
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
  }
};
// **********************************************************************
export const fetchUser = async (): Promise<IUser | undefined> => {
  try {
    const response = await fetch("http://localhost:5000/api/users", {
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
// **************************************************
export const getUserIdByActivationLink = async (
  activationLink: string
): Promise<string | undefined> => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/user/${activationLink}`,
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
// **********************************************************************
