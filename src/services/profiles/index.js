import express from 'express';
import { parseFile } from '../../utils/cloudinary.js';
import ProfilesModel from './schema.js';

const profilesRouter = express.Router();

profilesRouter.get('/', async (req, res, next) => {
  try {
    const dbResponse = await ProfilesModel.find({});
    res.send(dbResponse);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

profilesRouter.get('/:id', async (req, res, next) => {
  try {
    const dbResponse = await ProfilesModel.findById(req.params.id);
    if (dbResponse) {
      res.send(dbResponse);
    } else {
      res.status(404).send(`${req.params.id} not found!`);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

profilesRouter.post('/', async (req, res, next) => {
  try {
    const dbResponse = new ProfilesModel(req.body);
    const { _id } = await dbResponse.save();

    res.status(201).send(_id);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

profilesRouter.post(
  '/:id/picture',
  parseFile.single('pic'),
  async (req, res, next) => {
    try {
      // console.log(req.file);
      // console.log(req.file.path);
      // res.send(req.file);
      const dbResponse = await PostModel.findOneAndUpdate(
        { id: req.params.id },
        { image: req.file.path },
        {
          runValidators: true,
          new: true,
        }
      );
      res.send(dbResponse);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

profilesRouter.put('/:id', async (req, res, next) => {
  try {
    const dbResponse = await ProfilesModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.send(dbResponse);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

profilesRouter.put(
  '/:id/image',
  parseFile.single('image'),
  async (req, res, next) => {
    try {
      console.log(req.file);
      console.log(req.file.path);
      res.send(req.file);
      let dbResponse = await ProfilesModel.findOneAndUpdate(
        { id: req.params.id },
        { image: req.file.path }
      );
      res.send(dbResponse);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

profilesRouter.delete('/:id', async (req, res, next) => {
  try {
    const dbResponse = await ProfilesModel.findByIdAndDelete(req.params.id);
    if (dbResponse) {
      console.log(dbResponse);
      res.status(204).send();
    } else {
      res.status(404).send(`${req.params.id} not found!`);
    }
    console.log(dbResponse);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default profilesRouter;
