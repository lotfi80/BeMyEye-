import { IUser } from '../models/user.js';
import { IPost } from '../models/Post.js';

const BASE_URL = 'http://localhost:5000/api';

// **********************************************************************
export const getUserDataByID = async (id: string): Promise<IUser | undefined> => {
  try {
    const response = await fetch(`http://localhost:5000/api/user/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const user: IUser = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
};

// **********************************************************************
export const fetchUser = async (): Promise<IUser | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const users: IUser = await response.json();
    return users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
};
// **************************************************************************
export const dataFormDatenGet = async (formData: FormData, pathEnd: string) => {
  try {
    const response = await fetch(`http://localhost:5000/${pathEnd}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: formData,
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      console.error('Server response error:', data);
      throw new Error('Failed to create form');
    }
    console.log('Form submitted successfully:', data);
  } catch (error) {
    console.error('Fehler beim Erstellen der Form:', error);
  }
};
// **********************************************************************
export const userInContextUpdateRequest = async (id: string, user: IUser): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:5000/api/user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(user),
      credentials: 'include',
    });
    const message = await response.json();
    if (!response.ok) {
      console.error('Server response error:', message);
      throw new Error('Failed to create form');
    }
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Invalid Data submitted');
  }
};

// **********************************************************************

export const getAllPosts = async (page: number = 1, limit: number = 9, categoryId?: string): Promise<any> => {
  try {
    let url = `http://localhost:5000/posts?page=${page}&limit=${limit}`;
    if (categoryId) {
      url += `&categoryId=${categoryId}`;
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const data = await response.json();
    console.log('API response:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return { posts: [] };
  }
};
// **********************************************************************
export const getPostByUser = async (userid: string): Promise<any> => {
  try {
    const response = await fetch(`http://localhost:5000/posts?userid=${userid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const data = await response.json();
    console.log('API response: users posts', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
};
// ****************************************************************
export const uploadProfileImage = async (id: string, formData: FormData): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:5000/api/user/${id}/upload-image`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: formData,
      credentials: 'include',
    });
    if (!response.ok) {
      console.error('Server response error:');
      throw new Error('Failed to upload profile image');
    }

    await response.json();

    console.log('Profile image uploaded successfully:');
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to upload profile image');
  }
};
// **********************************************************************
export const getHash = async (id: string, oldPassword: string, password: string): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:5000/api/passwordUpdate/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ oldPassword, password }),
      credentials: 'include',
    });
    // const hash = await response.json();

    if (!response.ok) {
      console.error('Server response error:');
      throw new Error('Failed to create form');
    }
    console.log('Password submitted successfully:');
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Invalid Data submitted');
  }
};
// **********************************************
export const getUsers = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/users', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    console.log('Users fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
};
// ***************************************************
export const deleteUser = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/user/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      credentials: 'include',
      // body: JSON.stringify(id),
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Failed to delete user:', error);
  }
};
// ************************************************
// Nath
export const getUsersPost = async (userid: string) => {
  try {
    const response = await fetch(`http://localhost:5000/posts/get/${userid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
};
// ****************************************************************
export const notifyFollowers = async (userId: string) => {
  try {
    const response = await fetch('http://localhost:5000/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({
        userId,
        message: `User ${userId} posted a new post`,
      }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    console.log('Notifications sent successfully');
  } catch (error) {
    console.error('Failed to notify followers:', error);
  }
};
// ****************************************************************
export const makeFollower = async (userId: string, followingId: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/user/${userId}/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ followingId }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to follow user');
    }

    console.log('User followed successfully');
  } catch (error) {
    console.error('Failed to follow user:', error);
  }
};
// ****************************************************************
export const getFollow_ = async (userId: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/user/${userId}/follow`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch followers');
    }

    const data = await response.json();
    console.log('Followers fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch followers:', error);
  }
};
// ****************************************************************
export const deleteFollower = async (userId: string, followingId: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/user/${userId}/follow`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ followingId }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to unfollow user');
    }

    console.log('User unfollowed successfully');
  } catch (error) {
    console.error('Failed to unfollow user:', error);
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
    const response = await fetch(`http://localhost:5000/messages/send/${senderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ recipients, message, subject, attachments }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to sent message');
    }

    console.log('Message sended successfully');
  } catch (error) {
    console.error('Failed to sent message:', error);
  }
};
// ****************************************************************
export const getUserInbox = async (userId: string) => {
  try {
    const response = await fetch(`http://localhost:5000/messages/user/${userId}/inbox`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch inbox');
    }

    const data = await response.json();
    console.log('Inbox fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch inbox:', error);
  }
};
// ****************************************************************
export const getUserSent = async (userId: string) => {
  try {
    const response = await fetch(`http://localhost:5000/messages/user/${userId}/sent`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch sent messages');
    }

    const data = await response.json();
    console.log('Sent messages fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch sent messages:', error);
  }
};
// ****************************************************************
export const markAsRead = async (messageId: string) => {
  try {
    const response = await fetch(`http://localhost:5000/messages/${messageId}/read`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to mark message as read');
    }

    console.log('Message marked as read successfully');
  } catch (error) {
    console.error('Failed to mark message as read:', error);
  }
};
// ****************************************************************
export const deleteMessage = async (messageId: string) => {
  try {
    const response = await fetch(`http://localhost:5000/messages/${messageId}/delete`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete message');
    }

    console.log('Message deleted successfully');
  } catch (error) {
    console.error('Failed to delete message:', error);
  }
};
// ***********************************************************
export const getUsersByField = async (field: string, value: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/user/${field}/${value}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    console.log('Users fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
};
// ****************************************************************
export const attachmentUpload = async (attachments: FormData) => {
  try {
    const response = await fetch(`http://localhost:5000/messages/attachment`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: attachments,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to upload attachments');
    }

    console.log('Attachments uploaded successfully');
    return await response.json();
  } catch (error) {
    console.error('Failed to upload attachments:', error);
  }
};
// ---------------------------------------------------
export const getPostByID = async (postId: string): Promise<IPost> => {
  try {
    const response = await fetch(`http://localhost:5000/posts/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }

    const data = await response.json();
    console.log('API response:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return {} as IPost;
  }
};
