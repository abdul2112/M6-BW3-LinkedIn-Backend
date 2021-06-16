import express from 'express';
import ExperiencesModel from './schema.js';
import ProfilesModel from '../profiles/schema.js';
import { parseFile } from '../../utils/cloudinary.js';
// import { Transform } from "json2csv"
// import { pipeline } from "stream"
import { generateCSV } from "../../utils/csv.js";

const experiencesRouter = express.Router();

// ************* CSV Endpoint *************

experiencesRouter.get("/:userName/experiences/csv", async (req, res, next) => {
  try {
    const experiencesAsJSON = await ExperiencesModel.find({
      username: req.params.userName,
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
  '/:userName/experiences/:expId/picture',
  parseFile.single('picture'),
  async (req, res, next) => {
    try {
      // console.log(req.file);
      // console.log(req.file.path);
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

experiencesRouter.get('/:userName/experiences', async (req, res, next) => {
  try {
    const dbResponse = await ExperiencesModel.find({
      username: req.params.userName,
    });
    if (dbResponse) {
      res.send(dbResponse);
    } else {
      res.status(404).send(`${req.params.expId} not found!`);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

experiencesRouter.get(
  '/:userName/experiences/:expId',
  async (req, res, next) => {
    try {
      const dbResponse = await ExperiencesModel.find({
        $and: [{ username: req.params.userName }, { _id: req.params.expId }],
      });
      if (dbResponse) {
        res.send(dbResponse);
      } else {
        res.status(404).send(`${req.params.expId} not found!`);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

experiencesRouter.post('/:userName/experiences', async (req, res, next) => {
  try {
    const dbResponse1 = await ProfilesModel.find({
      username: req.params.userName,
    });
    if (dbResponse1.length > 0) {
      const dbResponse2 = new ExperiencesModel(req.body);
      const { _id } = await dbResponse2.save();
      res.status(201).send(_id);
    } else {
      res.status(404).send(`${req.params.userName} not found!`);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

experiencesRouter.put(
  '/:userName/experiences/:expId',
  async (req, res, next) => {
    try {
      const dbResponse1 = await ProfilesModel.find({
        username: req.params.userName,
      });
      if (dbResponse1.length > 0) {
        const dbResponse2 = await ExperiencesModel.findByIdAndUpdate(
          req.params.expId,
          req.body,
          { new: true, runValidators: true }
        );
        res.send(dbResponse2);
      } else {
        res.status(404).send(`${req.params.userName} not found!`);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

experiencesRouter.delete(
  '/:userName/experiences/:expId',
  async (req, res, next) => {
    try {
      const dbResponse1 = await ProfilesModel.find({
        username: req.params.userName,
      });
      if (dbResponse1.length > 0) {
        const dbResponse = await ExperiencesModel.findByIdAndDelete(
          req.params.expId
        );
        if (dbResponse) {
          res.send('This post is deleted ->' + dbResponse);
        } else {
          res.status(404).send(`${req.params.expId} not found!`);
        }
      } else {
        res.status(404).send(`${req.params.userName} not found!`);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);


export default experiencesRouter;
