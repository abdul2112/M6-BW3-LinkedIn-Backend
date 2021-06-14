import mongoose from 'mongoose';

// {
//     "_id": "5d925e677360c41e0046d1f5",  //server generated
//     "role": "CTO",
//     "company": "Strive School",
//     "startDate": "2019-06-16T22:00:00.000Z",
//     "endDate": "2019-06-16T22:00:00.000Z", //could be null
//     "description": "Doing stuff here and there",
//     "area": "Berlin",
//     "username": "admin",
//     "createdAt": "2019-09-30T19:58:31.019Z",  //server generated
//     "updatedAt": "2019-09-30T19:58:31.019Z",  //server generated
//     "image": ... //server generated on upload, set a default here
// }

const { Schema, model } = mongoose;

const ExperiencesSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  startDate: {
    type: Number,
    required: true,
  },
  endDate: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default model('Experience', ExperiencesSchema);
