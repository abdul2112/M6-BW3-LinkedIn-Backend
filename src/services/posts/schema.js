import mongoose from 'mongoose';

// {
//     "_id": "5d93ac84b86e220017e76ae1", //server generated
//     "text": "this is a text 12312 1 3 1",  <<--- THIS IS THE ONLY ONE YOU'LL BE SENDING!!!
//     "username": "admin",
//     "user": {
//         "_id": "5d84937322b7b54d848eb41b", //server generated
//         "name": "Diego",
//         "surname": "Banovaz",
//         "email": "diego@strive.school",
//         "bio": "SW ENG",
//         "title": "COO @ Strive School",
//         "area": "Berlin",
//         "image": ..., //server generated on upload, set a default here
//         "username": "admin",
//         "createdAt": "2019-09-20T08:53:07.094Z", //server generated
//         "updatedAt": "2019-09-20T09:00:46.977Z", //server generated
//     }
//     "createdAt": "2019-10-01T19:44:04.496Z", //server generated
//     "updatedAt": "2019-10-01T19:44:04.496Z", //server generated
//     "image": ... //server generated on upload, set a default here
// }

const { Schema, model } = mongoose;

const PostsSchema = new mongoose.Schema({
  text: {
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
    default: 'https://placeholdit.com/150x150',
  },
  profile: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Profile',
  },
});

export default model('Post', PostsSchema);
