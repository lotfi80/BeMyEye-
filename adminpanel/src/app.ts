import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';

import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import { buildAuthenticatedRouter } from '@adminjs/express';

import User from './models/user.js';

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

  const admin = new AdminJS(options);

  if (process.env.NODE_ENV === 'development') {
    admin.watch();
  }

  const router = buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: process.env.COOKIE_SECRET,
      cookieName: 'adminjs',
      provider,
    },
    null,
    {
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: true,
      resave: true,
    }
  );

  app.use(admin.options.rootPath, router);

  app.get('/', (req, res) => {
    res.send('Hello from AdminJS!');
  });

  app.listen(port, () => {
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
  });
};

start();
