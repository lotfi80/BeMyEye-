import express from 'express';
import connectDB from './src/libs/db';
import dotenv from 'dotenv';
import userRoute from './src/routes/auth';
import authRouter from './src/routes/auth';
// import { authorizeJwt } from './src/middleware/authorization';
import cookieparser from 'cookie-parser';



dotenv.config();

const PORT = process.env.PORT || 3002;
const app = express();
app.use(express.json());
app.use(cookieparser());

app.use('/auth', authRouter);
// app.use('/user', userRoute);


(async () => {
    await connectDB();
  
    app.listen(PORT, () => {
      console.log(`The server 🙈 is listening on port ${PORT}`);
    //   console.log(`Visit ${clientUrl} in your browser`);
    });
  })();