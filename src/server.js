import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import mongoose from 'mongoose';
import experiencesRouter from './services/experience';
import profilesRouter from './services/profiles';
import postsRouter from './services/posts';
import {
  badRequestErrorHandler,
  catchAllErrorHandler,
  notFoundErrorHandler,
} from '../errorHandlers';

const server = express();

const port = process.env.PORT || 3001;

// ******** MIDDLEWARES ************

server.use(express.json());
server.use(cors());

// ******** ROUTES ************
server.use('/experiences', experiencesRouter);
server.use('/profiles', profilesRouter);
server.use('/posts', postsRouter);

// ******** ERROR MIDDLEWARES ************

server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(catchAllErrorHandler);

console.table(listEndpoints(server));

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB 🌵');
    server.listen(port, () => {
      console.log('Server listening on port', port, '✅');
    });
  })
  .catch((err) => console.log(err));
