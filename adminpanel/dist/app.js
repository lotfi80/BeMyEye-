import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import options from './admin/options.js';
const port = process.env.PORT || 3000;
const app = express();
AdminJS.registerAdapter(AdminJSMongoose);
const start = async () => {
    await mongoose
        .connect(`${process.env.MONGODB_URL}`)
        .then(() => {
        console.log('Database connected');
    })
        .catch((err) => {
        console.error('Database connection error:', err);
    });
    const admin = new AdminJS(options);
    console.log('AdminJS initialized');
    if (process.env.NODE_ENV === 'development') {
        admin.watch();
    }
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
