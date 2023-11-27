import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

import morgan from 'morgan';
import mongoose from 'mongoose';

// custom import
// routers
import jobRouter from './routes/jobRouter.js';

// middlewares
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { validateTest } from './middleware/validationMiddleware.js';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.post('/api/v1/test', validateTest, (req, res) => {
  const { name } = req.body;
  res.json({ message: `hello ${name}` })
});

app.use('/api/v1/jobs', jobRouter)

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
