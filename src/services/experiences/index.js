import express from 'express';
import ExperiencesModel from './schema.js';
import ProfilesModel from '../profiles/schema.js';
import { parseFile } from '../../utils/cloudinary.js';
import { generateCSV } from "../../utils/csv.js";

const experiencesRouter = express.Router();

// ************* CSV Endpoint *************

experiencesRouter.get("/:profileId/experiences/csv", async (req, res, next) => {
  try {
    const experiencesAsJSON = await ExperiencesModel.find({
      profile: req.params.profileId,
    });
    if (experiencesAsJSON.length > 0) {
      const fields = ["username", "image", "role", "company", "startDate", "endDate", "description", "area"]
      const csvBuffer = generateCSV(fields, experiencesAsJSON);
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="experiences.csv"'
      );
      res.send(csvBuffer);
    } else {
      res.status(404).send({ message: "there is no one here." });
    }
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// ************* Picture Endpoint *************

experiencesRouter.post(
  '/:profileId/experiences/:expId/picture',
  parseFile.single('pic'),
  async (req, res, next) => {
    try {

// experiencesRouter.post( '/:profileId/experiences/:expId/picture', parseFile.single('picture'),
//   async (req, res, next) => {
//     try {
      console.log(req.file);
      console.log(req.file.path);
      // res.send(req.file);
      const dbResponse = await ExperiencesModel.findOneAndUpdate(
        { _id: req.params.expId },
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

// ************* CRUD Endpoint *************

experiencesRouter.post('/:profileId/experiences', async (req, res, next) => {
  try {
    const dbResponse = new ExperiencesModel(req.body);
    const { _id } = await dbResponse.save();
    res.status(201).send(_id);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

experiencesRouter.get('/:profileId/experiences', async (req, res, next) => {
  try {
    // const dbResponse = await ProfilesModel.findById(req.params.id).populate({ path: "Experience" })
    const dbResponse = await ExperiencesModel.find({ profile: req.params.profileId, });
    if (dbResponse) {
      res.send(dbResponse);
    } else {
      res.status(404).send(`${req.params.profileId} not found!`);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

experiencesRouter.get('/:profileId/experiences/:expId', async (req, res, next) => {
    try {
      const dbResponse = await ExperiencesModel.find({
        $and: [{ profile: req.params.profileId }, { _id: req.params.expId }],
      });
      if (dbResponse) {
        res.send(dbResponse[0]);
      } else {
        res.status(404).send(`${req.params.expId} not found!`);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

experiencesRouter.put(
  '/:profileId/experiences/:expId',
  async (req, res, next) => {
    try {
      const dbResponse = await ExperiencesModel.findByIdAndUpdate(
        req.params.expId,
        req.body,
        { new: true, runValidators: true }
      );
      res.send(dbResponse);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

experiencesRouter.delete(
  '/:profileId/experiences/:expId',
  async (req, res, next) => {
    try {
      const dbResponse1 = await ProfilesModel.findById( req.params.profileId );
      if (dbResponse1) {
        const dbResponse = await ExperiencesModel.findByIdAndDelete(
          req.params.expId
        );
        if (dbResponse) {
          res.send('This experience is deleted ->' + dbResponse);
        } else {
          res.status(404).send(`${req.params.expId} not found!`);
        }
      } else {
        res.status(404).send(`${req.params.profileId} not found!`);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);


export default experiencesRouter;
