import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import AdminJS, { Dashboard } from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { componentLoader } from './admin/component-loader.js';
import { Components } from './admin/component-loader.js';

import options from './admin/options.js';
import { Label } from '@adminjs/design-system';

const port = process.env.PORT || 3000;
const app = express();

AdminJS.registerAdapter(AdminJSMongoose);

const start = async (): Promise<void> => {
  await mongoose
    .connect(`${process.env.MONGODB_URL}`)
    .then(() => {
      console.log('Database connected');
    })
    .catch((err) => {
      console.error('Database connection error:', err);
    });

  const adminJsOptions = {
    ...options,
    componentLoader,
    dashboard: {
      component: Components.Dashboard,
    },
    branding: {
      companyName: 'BeMyEye',
    },
    pages: {
      user: {
        label: 'UserCard Page',
        component: Components.UserPage,
        handler: async (req, res, context) => {
          res.send('Custom Page Content');
        },
        navigation: {
          name: 'UserCard',
          Label: 'User Card',
          icon: 'Document',
        },
      },
    },
  };
  const admin = new AdminJS(adminJsOptions);
  admin.watch();
  console.log('AdminJS initialized');

  // if (process.env.NODE_ENV === 'development') {
  //   admin.watch();
  // }

  // const router = buildAuthenticatedRouter(
  //   admin,
  //   {
  //     cookiePassword: process.env.COOKIE_SECRET,
  //     cookieName: 'adminjs',
  //     provider,
  //   },
  //   null,
  //   {
  //     secret: process.env.COOKIE_SECRET,
  //     saveUninitialized: true,
  //     resave: true,
  //   }
  // );
  const adminRouter = AdminJSExpress.buildRouter(admin);

  app.use(admin.options.rootPath, adminRouter);

  app.get('/', (req, res) => {
    res.send('Hello from AdminJS!');
  });

  app.listen(port, () => {
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
  });
};

start();
