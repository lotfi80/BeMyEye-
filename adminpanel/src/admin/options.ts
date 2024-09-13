import { AdminJSOptions } from 'adminjs';

import componentLoader from './component-loader.js';
import { userOptions } from './modelsOptions/userOptions.js';
import { postOptions } from './modelsOptions/postOptions.js';
import { messageOptions } from './modelsOptions/messageOptions.js';
import { commentsOptions } from './modelsOptions/commentsOptions.js';
import User from '../../../server/models/user-model.js';
import Post from '../../../server/models/Post.js';
import Message from '../../../server/models/Message.js';
import PostComment from '../../../server/models/PostComments.js';

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
    { resource: User },
    { resource: Post, options: postOptions, navigation: postNavigation },
    { resource: Message, options: messageOptions },
    { resource: PostComment, options: commentsOptions },
  ],
  // databases: [],
};

export default options;
