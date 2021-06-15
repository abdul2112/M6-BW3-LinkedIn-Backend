import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import mongoose from 'mongoose';
import experiencesRouter from './services/experience/index.js';
import profilesRouter from './services/profiles/index.js';
import postsRouter from './services/posts/index.js';
import {
  badRequestErrorHandler,
  catchAllErrorHandler,
  notFoundErrorHandler,
} from './errorHandlers.js';

const server = express();

const port = process.env.PORT || 3001;

// ******** MIDDLEWARES ************

server.use(express.json());
server.use(cors());

// ******** ROUTES ************
server.use('/api/experiences', experiencesRouter);
server.use('/api/profiles', profilesRouter);
server.use('/api/posts', postsRouter);

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
