import express from 'express';
import ExperiencesSchema from './schema.js'
import ProfilesModel from '../profiles/schema.js'

const experiencesRouter = express.Router();

experiencesRouter.get("/:userName/experiences", async (req, res, next) => {
    try {
        const dbResponse = await ExperiencesSchema.find({ username: req.params.userName })
        if (dbResponse) {
            res.send(dbResponse)
        } else {
            res.status(404).send(`${req.params.expId} not found!`)
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
})

experiencesRouter.get("/:userName/experiences/:expId", async (req, res, next) => {
    try {
        const dbResponse = await ExperiencesSchema.find({ $and: [{ username: req.params.userName }, { _id: req.params.expId }] })
        if (dbResponse) {
            res.send(dbResponse)
        } else {
            res.status(404).send(`${req.params.expId} not found!`)
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
})

experiencesRouter.post("/:userName/experiences", async (req, res, next) => {
    try {
        const dbResponse1 = await ProfilesModel.find({ username: req.params.userName })
        if (dbResponse1.length > 0) {
            const dbResponse2 = new ExperiencesSchema(req.body)
            const { _id } = await dbResponse2.save()
            res.status(201).send(_id)
        } else {
            res.status(404).send(`${req.params.userName} not found!`)
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
})


experiencesRouter.put("/:userName/experiences/:expId", async (req, res, next) => {
    try {
        const dbResponse1 = await ProfilesModel.find({ username: req.params.userName })
        if (dbResponse1.length > 0) {
            const dbResponse2 = await ExperiencesSchema.findByIdAndUpdate(req.params.expId, req.body, { new: true, runValidators: true })
            res.send(dbResponse2)
        } else {
            res.status(404).send(`${req.params.userName} not found!`)
        }

    } catch (error) {
        console.log(error)
        next(error)
    }
})

experiencesRouter.delete("/:userName/experiences/:expId", async (req, res, next) => {
    try {
        const dbResponse1 = await ProfilesModel.find({ username: req.params.userName })
        if (dbResponse1.length > 0) {
            const dbResponse = await ExperiencesSchema.findByIdAndDelete(req.params.expId)
            if (dbResponse) {
                res.status(204).send()
            } else {
                res.status(404).send(`${req.params.expId} not found!`)
            }
        } else {
            res.status(404).send(`${req.params.userName} not found!`)
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
})

export default experiencesRouter;
