import express from 'express';
import createError from 'http-errors';
import PostModel from './schema.js';
const postsRouter = express.Router();

// POSTS:
// - GET https://yourapi.herokuapp.com/api/posts/
// Retrieve posts
// - POST https://yourapi.herokuapp.com/api/posts/
// Creates a new post
// - GET https://yourapi.herokuapp.com/api/posts/{postId}
// Retrieves the specified post
// - PUT https://yourapi.herokuapp.com/api/posts/{postId}
// Edit a given post
// - DELETE https://yourapi.herokuapp.com/api/posts/{postId}
// Removes a post

postsRouter
  .post('/', async (req, res, next) => {
    try {
      const dbResponse = new PostModel(req.body);
      console.log(req.body);
      const { _id } = await dbResponse.save();
      res.status(201).send(_id);
    } catch (error) {
      console.log(error);
      next(createError(500, 'An error occurred while posting'));
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const dbResponse = await PostModel.find();
      console.log(req.body);
      res.status(201).send(dbResponse);
    } catch (error) {
      console.log(error);
      next(createError(500, 'An error occurred while getting posts'));
    }
  });

postsRouter
  .get('/:postId', async (req, res, next) => {
    try {
      // const id = req.params.postId;
      const dbResponse = await PostModel.findById(req.params.postId);
      console.log(req.body);
      res.send(dbResponse);
    } catch (error) {
      console.log(error);
      next(createError(500, 'An error occurred while getting post'));
    }
  })
  .put('/:postId', async (req, res, next) => {
    try {
      const dbResponse = await PostModel.findByIdAndUpdate(
        req.params.postId,
        req.body,
        {
          runValidators: true,
          new: true,
        }
      );
      if (dbResponse) {
        res.send(dbResponse);
      } else {
        next(createError(404, `post with id ${req.params.postId} not found`));
      }
    } catch (error) {
      console.log(error);
      next(createError(500, 'An error occurred while updating post'));
    }
  })
  .delete('/:postId', async (req, res, next) => {
    try {
      const dbResponse = await PostModel.findByIdAndDelete(req.params.postId);
      if (dbResponse) {
        // res.send('Post has been DELETED');
        res.send('This post is deleted ->' + dbResponse);
      } else {
        next(createError(404, `post with id ${req.params.postId} not found`));
      }
    } catch (error) {
      console.log(error);
      next(createError(500, 'An error occurred while deleting post'));
    }
  });

// - POST https://yourapi.herokuapp.com/api/posts/{postId}
// Add an image to the post under the name of "post"
postsRouter.post('/:postId', async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(createError(500, 'An error occurred.....blogs'));
  }
});

export default postsRouter;
