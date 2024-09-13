import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { Database, Resource } from '@adminjs/mongoose';
import AdminJS from 'adminjs';

AdminJS.registerAdapter({ Database, Resource });

const initialize = async () => {
  const db = await mongoose.connect(`${process.env.MONGODB_URL}` as string);

  return { db };
};

export default initialize;
