import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import mongoose from 'mongoose';
import experiencesRouter from './services/experiences/index.js';
import profilesRouter from './services/profiles/index.js';
import postsRouter from './services/posts/index.js';
import likesRouter from './services/likes/index.js';

import {
  badRequestErrorHandler,
  catchAllErrorHandler,
  notFoundErrorHandler,
} from './errorHandlers.js';

const server = express();

const port = process.env.PORT || 3001;

// ******** MIDDLEWARES ************

const whitelist = [
  process.env.FRONTEND_DEV_URL,
  process.env.FRONTEND_CLOUD_URL,
];
const corsOptions = {
  origin: (origin, next) => {
    // if (whiteList.includes(origin))
    if (whitelist.indexOf(origin) !== -1) {
      // origin allowed
      next(null, true);
    } else {
      // origin not allowed
      const error = new Error('Not allowed by cors!');
      error.status = 403;
      next(error);
    }
  },
};

server.use(cors());
server.use(cors(corsOptions));

// server.use(cors());
server.use(express.json());

// ******** ROUTES ************
server.use('/api/profile', profilesRouter);
server.use('/api/profile', experiencesRouter);
server.use('/api/posts', postsRouter);
server.use('/api/likes', likesRouter);

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
    console.log('Connected to Mongodb 🌵');
    server.listen(port, () => {
      console.log('Server listening on port', port, '✅');
    });
  })
  .catch((err) => console.log(err));
