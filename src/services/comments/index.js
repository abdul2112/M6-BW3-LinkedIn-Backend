import express from 'express';
import createError from 'http-errors';
import CommentsModel from './schema.js';

const commentsRouter = express.Router();

// - GET https://striveschool-api.herokuapp.com/api/posts/{id}/comment
// Retrieve the list of comments for a given post
// - POST https://striveschool-api.herokuapp.com/api/posts/{id}/comment
// Create a new comment for a given post
// - DELETE https://striveschool-api.herokuapp.com/api/posts/{id}/comment/{commentId}
// Deletes a given comment
// - PUT https://striveschool-api.herokuapp.com/api/posts/{id}/comment/{commentId}
// Edit a given comment


// ************* CRUD Endpoint *************
commentsRouter.post('/:postId/comment', async (req, res, next) => {
    try {
      const dbResponse = new CommentsModel(req.body);
      const { _id } = await dbResponse.save();
      res.status(201).send(_id);
    } catch (error) {
      console.log(error);
      next(createError(500, 'An error occurred while getting posts'));
    }
  });
  
  commentsRouter.get('/:postId/comment', async (req, res, next) => {
    try {
      // const dbResponse = await ProfilesModel.findById(req.params.id).populate({ path: "Experience" })
      const dbResponse = await CommentsModel.find({ profile: req.params.postId, });
      if (dbResponse) {
        res.send(dbResponse);
      } else {
        res.status(404).send(`${req.params.postId} not found!`);
      }
    } catch (error) {
      console.log(error);
      next(createError(500, 'An error occurred while getting posts'));
    }
  });
  
  commentsRouter.get('/:postId/comment/:commentId', async (req, res, next) => {
      try {
        const dbResponse = await CommentsModel.find({
          $and: [{ profile: req.params.postId }, { _id: req.params.commentId }],
        }).populate({ path: "profile" })
        if (dbResponse) {
          res.send(dbResponse[0]);
        } else {
          res.status(404).send(`${req.params.commentId} not found!`);
        }
      } catch (error) {
        console.log(error);
        next(createError(500, 'An error occurred while getting posts'));
      }
    }
  );
  
  commentsRouter.put(
    '/:postId/comment/:commentId',
    async (req, res, next) => {
      try {
        const dbResponse = await CommentsModel.findByIdAndUpdate(
          req.params.commentId,
          req.body,
          { new: true, runValidators: true }
        );
        res.send(dbResponse);
      } catch (error) {
        console.log(error);
        next(createError(500, 'An error occurred while getting posts'));
      }
    }
  );
  
  commentsRouter.delete(
    '/:postId/comment/:commentId',
    async (req, res, next) => {
      try {
        const dbResponse1 = await ProfilesModel.findById( req.params.postId );
        if (dbResponse1) {
          const dbResponse = await CommentsModel.findByIdAndDelete(
            req.params.commentId
          );
          if (dbResponse) {
            res.send('This experience is deleted ->' + dbResponse);
          } else {
            res.status(404).send(`${req.params.commentId} not found!`);
          }
        } else {
          res.status(404).send(`${req.params.postId} not found!`);
        }
      } catch (error) {
        console.log(error);
        next(createError(500, 'An error occurred while getting posts'));
      }
    }
  );
  
  
  export default commentsRouter;
  