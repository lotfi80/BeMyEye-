import { AuthTokens } from "../interfaces/AuthToken";
import { User } from "../interfaces/User";

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
): Promise<AuthTokens> => {
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

    const data: AuthTokens = await response.json();

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred during registration");
  }
};
// **********************************************************************
export const activateUser = async (
  activationLink: string
): Promise<Response> => {
  try {
    const response = await fetch(`${BASE_URL}/activate/${activationLink}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Activation failed: ${response.statusText}`);
    }

    return await response.json();
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

    const data: AuthTokens = await response.json();

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred during login");
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
export const fetchUser = async (): Promise<User | undefined> => {
  try {
    const response = await fetch("http://localhost:5000/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const users: User = await response.json();
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};
