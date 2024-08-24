import express from 'express';
import connectDB from './src/libs/db';
import dotenv from 'dotenv';
import userRoute from './src/routes/userRoutes';
import authRouter from './src/routes/auth';
import categoryRouter from './src/routes/categories';
import {authorizeJwt} from './src/middelware/authorization';
import cookieparser from 'cookie-parser';
import cors from 'cors';



dotenv.config();

const PORT = process.env.PORT || 3002;
const app = express();
app.use(express.json());
app.use(cookieparser());

app.use(cors({
  origin: 'http://localhost:5174', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true 
}));

app.use('/auth', authRouter  );
app.use('/user', authorizeJwt , userRoute);
app.use('/categories',/*authorizeJwt,*/ categoryRouter);


(async () => {
    await connectDB();
  
    app.listen(PORT, () => {
      console.log(`The server 🙈 is listening on port ${PORT}`);
    //   console.log(`Visit ${clientUrl} in your browser`);
    });
  })();