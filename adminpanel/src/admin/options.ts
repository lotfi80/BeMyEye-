import { AdminJSOptions } from 'adminjs';

import componentLoader from './component-loader.js';
import { userOptions } from './modelsOptions/userOptions.js';
import { postOptions } from './modelsOptions/postOptions.js';
import { messageOptions } from './modelsOptions/messageOptions.js';
import { commentsOptions } from './modelsOptions/commentsOptions.js';
import { postImageOptions } from './modelsOptions/postImageOptions.js';
import { categoryOptions } from './modelsOptions/categoryOptions.js';

import User from '../models/user.js';
import Message from '../models/Message.js';
import { PostComment } from '../models/PostComments.js';
import { Post } from '../models/Post.js';
import { PostImage } from '../models/PostImages.js';
import { Category } from '../models/Categories.js';

const usersNavigation = {
  name: 'Users',
  icon: 'User',
};
const postNavigation = {
  name: 'Post',
  icon: 'User',
};

const options: AdminJSOptions = {
  // componentLoader,
  rootPath: '/admin',
  resources: [
    { resource: User, options: userOptions, navigation: usersNavigation },
    { resource: Post, options: postOptions, navigation: postNavigation },
    { resource: Message, options: messageOptions },
    { resource: PostComment, options: commentsOptions },
    { resource: PostImage, options: postImageOptions },
    { resource: Category, options: categoryOptions },
  ],
  // databases: [],
};

export default options;
