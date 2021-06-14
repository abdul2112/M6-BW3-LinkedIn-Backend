import express from 'express';
import ExperiencesSchema from './schema.js'

const experiencesRouter = express.Router();

experiencesRouter.get("/", async (req, res, next) => {
    try {
        const dbResponse = await ExperiencesSchema.find().populate({ path: "profile", select: "username name surname" });
        res.send(dbResponse)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

experiencesRouter.get("/:id", async (req, res, next) => {
    try {
        const dbResponse = await ExperiencesSchema.findById(req.params.id).populate({ path: "profile", select: "username name surname" });
        if (dbResponse) {
            res.send(dbResponse)
        } else {
            res.status(404).send(`${req.params.id} not found!`)
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
})

experiencesRouter.post("/", async (req, res, next) => {
    try {
        const dbResponse = new ExperiencesSchema(req.body)
        const { _id } = await dbResponse.save()

        res.status(201).send(_id)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

experiencesRouter.put("/:id", async (req, res, next) => {
    try {
        const dbResponse = await ExperiencesSchema.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.send(dbResponse)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

experiencesRouter.delete("/:id", async (req, res, next) => {
    try {
        const dbResponse = await ExperiencesSchema.findByIdAndDelete(req.params.id)
        if (dbResponse) {
            res.status(204).send()
        } else {
            res.status(404).send(`${req.params.id} not found!`)
        }
        console.log(dbResponse)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

export default experiencesRouter;
