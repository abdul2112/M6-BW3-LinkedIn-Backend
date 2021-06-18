import mongoose from 'mongoose';

// {
//   "_id": "5d84937322b7b54d848eb41b", //server generated
//   "createdAt": "2019-09-20T08:53:07.094Z", //server generated
//   "updatedAt": "2019-09-20T09:00:46.977Z", //server generated
//   "comment": "I totally agree with you! Great post!",
//   //user who posted it (as reference? nested? Your choice!)
//   //post (as reference? nested? your choice)
// }

const { Schema, model } = mongoose;

const CommentsSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  profile: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Profile',
  },
  post: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Post',
  },
},
  { timestamps: true }
);

export default model('Comment', CommentsSchema);
