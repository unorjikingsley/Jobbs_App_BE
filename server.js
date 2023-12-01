import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

import morgan from 'morgan';
import mongoose from 'mongoose';

import cookieParser from 'cookie-parser';

// custom import
// routers
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

// middlewares
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Resources not found' })
})

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000

try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('mongodb is connected');
  app.listen(port, () => {
    console.log(`listening on port ${port}...`)
  });
} catch (error) {
  console.log('MongoDB connection error:', error);
  process.exit(1);
};
