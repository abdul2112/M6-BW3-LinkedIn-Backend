import express from 'express';
import createError from 'http-errors';
import LikesModel from './schema.js';

const likesRouter = express.Router();

// - POST https://striveschool-api.herokuapp.com/api/posts/{id}/like
// Like the post for current user (each user can like only once per post)
// - DELETE https://striveschool-api.herokuapp.com/api/posts/{id}/like
// Remove the like for current user

// ************* Endpoints *************
likesRouter.post('/:postId/like/:profileId', async (req, res, next) => {
    try {
        const dbResponse = new LikesModel(req.body);
        const { _id } = await dbResponse.save();
        res.status(201).send(_id);
    } catch (error) {
        console.log(error);
        next(createError(500, 'An error occurred while getting posts'));
    }
});

likesRouter.delete(
    '/:postId/like/:profileId',
    async (req, res, next) => {
        try {
            const dbResponse = await LikesModel.findByIdAndDelete( req.params.profileId );

        } catch (error) {
            console.log(error);
            next(createError(500, 'An error occurred while getting posts'));
        }
    }
);

export default likesRouter;
