import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import mongoose from 'mongoose';
import experiencesRouter from './services/experiences/index.js';
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

server.use(cors());
server.use(express.json());
 


// ******** ROUTES ************
server.use('/api/profile', profilesRouter);
server.use('/api/profile', experiencesRouter);
server.use('/api/post', postsRouter);

// ******** ERROR MIDDLEWARES ************

server.use(notFoundErrorHandler);
server.use(badRequestErrorHandler);
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

  