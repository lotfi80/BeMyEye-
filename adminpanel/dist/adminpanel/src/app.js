import express from 'express';
import AdminJS from 'adminjs';
import { buildAuthenticatedRouter } from '@adminjs/express';
import provider from 'src/admin/auth-provider.js';
import options from 'src/admin/options.js';
import initializeDb from 'src/db/index.js';
const port = process.env.PORT || 3000;
const start = async () => {
    const app = express();
    await initializeDb();
    const admin = new AdminJS(options);
    if (process.env.NODE_ENV === 'development') {
        admin.watch();
    }
    const router = buildAuthenticatedRouter(admin, {
        cookiePassword: process.env.COOKIE_SECRET,
        cookieName: 'adminjs',
        provider,
    }, null, {
        secret: process.env.COOKIE_SECRET,
        saveUninitialized: true,
        resave: true,
    });
    app.use(admin.options.rootPath, router);
    app.get('/', (req, res) => {
        res.send('Hello from AdminJS!');
    });
    app.listen(port, () => {
        console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
    });
};
start();
