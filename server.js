import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

import morgan from 'morgan';
import mongoose from 'mongoose';

import cookieParser from 'cookie-parser';

import cloudinary from 'cloudinary';

//securities
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

// custom import
// routers
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

//public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// middlewares
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
};

// app.use(express.static(path.resolve(__dirname, './public')))
app.use(express.static(path.resolve(__dirname, './client_FrontEnd/dist')))

app.use(cookieParser());
app.use(express.json());

app.use(helmet());
app.use(mongoSanitize());

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client_FrontEnd/dist', 'index.html'));
})

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
