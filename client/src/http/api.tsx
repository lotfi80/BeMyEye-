import IUser from "../interfaces/User";
import { IPost } from "../interfaces/Post";
import { useCategoryUserContext } from "../context/CategoryUser";
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
        // credentials: "include",
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
        credentials: "include",
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
// ***************************************************************
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
// ****************************************************************
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
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }

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
      credentials: "include",
    });
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
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
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      credentials: "include",
    });
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
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
      credentials: "include",
    });
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    const data = await response.json();
    if (data.message === "Please fill all required fields") {
      console.log("Please fill all required fields");
      return { message: "Please fill all required fields" };
    } else if (data.message === "Please enter a valid street name and city") {
      console.log("Please enter a valid street name and city");
      return { message: "Please enter a valid street name and city" };
    } else if (data.message === "Please upload an image") {
      console.log("Please upload an image");
      return { message: "Please upload an image" };
    }

    console.log("Form submitted successfully:", data);
  } catch (error) {
    console.error("Fehler beim Erstellen der Form:", error);
  }
};
// **********************************************************************
export const deletePost = async (postId: string) => {
  try {
    const response = await fetch(`http://localhost:5000/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) {
      throw new Error(`Error deleting post: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error deleting post: ${error}`);
    throw error;
  }
};
//*********************************************************************
export const updatePost = async (postId: string, formData: FormData) => {
  try {
    console.log("formDataformData", formData);
    const response = await fetch(`http://localhost:5000/posts/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: formData,
      credentials: "include",
    });
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) {
      throw new Error(`Error updating post: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating post: ${error}`);
    throw error;
  }
};

// **********************************************************************
export const userInContextUpdateRequest = async (
  id: string,
  user: IUser
): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:5000/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(user),
      credentials: "include",
    });
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    const message = await response.json();
    if (!response.ok) {
      console.error("Server response error:", message);
      throw new Error("Failed to create form");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Invalid Data submitted");
  }
};

// **********************************************************************

export const getAllPosts = async (
  page: number = 1,
  limit: number = 9,
  categoryId?: string
): Promise<any> => {
  try {
    let url = `http://localhost:5000/posts?page=${page}&limit=${limit}`;
    if (categoryId) {
      url += `&categoryId=${categoryId}`;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      credentials: "include",
    });
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    console.log("API response:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return { posts: [] };
  }
};
// **********************************************************************
export const getPostByUser = async (userid: string): Promise<any> => {
  try {
    const response = await fetch(
      `http://localhost:5000/posts?userid=${userid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        credentials: "include",
      }
    );
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    console.log("API response: users posts", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
};
// ****************************************************************
export const uploadProfileImage = async (
  id: string,
  formData: FormData
): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/user/${id}/upload-image`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formData,
        credentials: "include",
      }
    );
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) {
      console.error("Server response error:");
      throw new Error("Failed to upload profile image");
    }

    await response.json();

    console.log("Profile image uploaded successfully:");
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to upload profile image");
  }
};
// **********************************************************************
export const getHash = async (
  id: string,
  oldPassword: string,
  password: string
): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/passwordUpdate/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ oldPassword, password }),
        credentials: "include",
      }
    );
    // const hash = await response.json();
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) {
      console.error("Server response error:");
      throw new Error("Failed to create form");
    }
    console.log("Password submitted successfully:");
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Invalid Data submitted");
  }
};
// **********************************************
export const getUsers = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      credentials: "include",
    });
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    console.log("Users fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};
// ***************************************************
export const deleteUser = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      credentials: "include",
      // body: JSON.stringify(id),
    });
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    console.log("User deleted successfully");
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};
// ************************************************
// Nath
export const getUsersPost = async (userid: string) => {
  try {
    const response = await fetch(`http://localhost:5000/posts/get/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      credentials: "include",
    });
    const newAccessToken = response.headers.get("x-access-token");
    console.log("Old Access Token:", localStorage.getItem("accessToken"));
    if (newAccessToken) {
      console.log("New Access Token received:", newAccessToken);
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
};
// ****************************************************************
export const notifyFollowers = async (userId: string) => {
  try {
    const response = await fetch("http://localhost:5000/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        userId,
        message: `User ${userId} posted a new post`,
      }),
      credentials: "include",
    });
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    console.log("Notifications sent successfully");
  } catch (error) {
    console.error("Failed to notify followers:", error);
  }
};
// ****************************************************************
export const makeFollower = async (userId: string, followingId: string) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/user/${userId}/follow`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ followingId }),
        credentials: "include",
      }
    );
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) {
      throw new Error("Failed to follow user");
    }

    console.log("User followed successfully");
  } catch (error) {
    console.error("Failed to follow user:", error);
  }
};
// ****************************************************************
export const getFollow_ = async (userId: string) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/user/${userId}/follow`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        credentials: "include",
      }
    );
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) {
      throw new Error("Failed to fetch followers");
    }

    const data = await response.json();
    console.log("Followers fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch followers:", error);
  }
};
// ****************************************************************
export const deleteFollower = async (userId: string, followingId: string) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/user/${userId}/follow`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ followingId }),
        credentials: "include",
      }
    );
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) {
      throw new Error("Failed to unfollow user");
    }

    console.log("User unfollowed successfully");
  } catch (error) {
    console.error("Failed to unfollow user:", error);
  }
};
// ****************************************************************
export const sendMessage = async (
  senderId: string,
  recipients: string[],
  message: string,
  subject: string,
  attachments: string[]
) => {
  try {
    const response = await fetch(
      `http://localhost:5000/messages/send/${senderId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ recipients, message, subject, attachments }),
        credentials: "include",
      }
    );
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) {
      throw new Error("Failed to sent message");
    }

    console.log("Message sended successfully");
  } catch (error) {
    console.error("Failed to sent message:", error);
  }
};
// ****************************************************************
export const getUserInbox = async (userId: string) => {
  try {
    const response = await fetch(
      `http://localhost:5000/messages/user/${userId}/inbox`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        credentials: "include",
      }
    );
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) {
      throw new Error("Failed to fetch inbox");
    }

    const data = await response.json();
    console.log("Inbox fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch inbox:", error);
  }
};
// ****************************************************************
export const getUserSent = async (userId: string) => {
  try {
    const response = await fetch(
      `http://localhost:5000/messages/user/${userId}/sent`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        credentials: "include",
      }
    );
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) {
      throw new Error("Failed to fetch sent messages");
    }

    const data = await response.json();
    console.log("Sent messages fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch sent messages:", error);
  }
};
// ****************************************************************
export const markAsRead = async (messageId: string) => {
  try {
    const response = await fetch(
      `http://localhost:5000/messages/${messageId}/read`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        credentials: "include",
      }
    );
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) {
      throw new Error("Failed to mark message as read");
    }

    console.log("Message marked as read successfully");
  } catch (error) {
    console.error("Failed to mark message as read:", error);
  }
};
// ****************************************************************
export const deleteMessage = async (messageId: string) => {
  try {
    const response = await fetch(
      `http://localhost:5000/messages/${messageId}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        credentials: "include",
      }
    );
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) {
      throw new Error("Failed to delete message");
    }

    console.log("Message deleted successfully");
  } catch (error) {
    console.error("Failed to delete message:", error);
  }
};
// ***********************************************************
export const getUsersByField = async (field: string, value: string) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/user/${field}/${value}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        credentials: "include",
      }
    );
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    console.log("Users fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};
// ****************************************************************
export const attachmentUpload = async (attachments: FormData) => {
  try {
    const response = await fetch(`http://localhost:5000/messages/attachment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: attachments,
      credentials: "include",
    });
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) {
      throw new Error("Failed to upload attachments");
    }

    console.log("Attachments uploaded successfully");
    return await response.json();
  } catch (error) {
    console.error("Failed to upload attachments:", error);
  }
};

export const fetchOnePost = async (selectedPost) => {
  try {
    let postComments;
    let postLikes;
    const response = await fetch(
      `http://localhost:5000/posts/${selectedPost.postid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        credentials: "include",
      }
    );
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) throw new Error("Failed to fetch post");
    const data = await response.json();
    // setPost(data);
    if (data.postcomments) {
      const res = await fetch(
        `http://localhost:5000/posts/comment/get?postid=${data._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch comments");
      postComments = await res.json();
      // setComments(postComments);
    }
    if (data.postlikes) {
      const res = await fetch(`http://localhost:5000/posts/${data._id}/like`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch likes");
      postLikes = await res.json();
      // setComments(postComments);
    }
    return { data, postComments, postLikes };
  } catch (error) {
    console.error(error);
  }
};

// ****************************************************************

export const createPostComment = async (user, selectedPost, comment) => {
  try {
    const response = await fetch(`http://localhost:5000/posts/comment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: user?._id,
        postid: selectedPost.postid,
        content: comment,
      }),
    });
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) throw new Error("Failed to add comment");
    return await response.json();
  } catch (error) {
    console.error("Failed to create comment:", error);
  }
};

// ****************************************************************

export const updatePostComment = async (commentId, comment) => {
  try {
    const response = await fetch(
      `http://localhost:5000/posts/comment/update/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: comment }),
      }
    );
    if (!response.ok) throw new Error("Failed to update comment");
    return await response.json();
  } catch (error) {
    console.error("Failed to update comment:", error);
  }
}

//************************************************************

export const deletePostComment = async (commentId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/posts/comment/delete/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) throw new Error("Failed to delete comment");
    return await response.json();
  } catch (error) {
    console.error("Failed to delete comment:", error);
  }
}


//*****************************************************************

export const createPostLike = async (user, selectedPost) => {
  try {
    console.log("User ID:", user?._id);
    console.log("Post ID:", selectedPost.postid);
    const response = await fetch(`http://localhost:5000/posts/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: user?._id,
        postid: selectedPost.postid,
      }),
    });
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) throw new Error("Failed to add like");
    return await response.json();
  } catch (error) {
    console.error("Failed to create like:", error);
  }
};

// ****************************************************************

export const deletePostLike = async (user, selectedPost) => {
  try {
    const response = await fetch(`http://localhost:5000/posts/like`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: user?._id,
        postid: selectedPost.postid,
      }),
    });
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) throw new Error("Failed to delete like");
    return await response.json();
  } catch (error) {
    console.error("Failed to delete like:", error);
  }
};

// ****************************************************************

export const getPostByID = async (postId: string): Promise<IPost> => {
  try {
    const response = await fetch(
      `http://localhost:5000/posts/getby/${postId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        credentials: "include",
      }
    );
    const newAccessToken = response.headers.get("x-access-token");
    console.log(newAccessToken);
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }

    const data = await response.json();

    console.log("API response:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return {} as IPost;
  }
};
