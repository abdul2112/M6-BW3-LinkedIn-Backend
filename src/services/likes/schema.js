import mongoose from 'mongoose';

// {
//   "_id": "5d925e677360c41e0046d1f5",  //server generated
//   //user who liked it (as reference? nested? Your choice!)
//   //post liked (as reference? nested? Your choice!)
//   "createdAt": "2019-09-30T19:58:31.019Z",  //server generated
//   "updatedAt": "2019-09-30T19:58:31.019Z",  //server generated
// }   

const { Schema, model } = mongoose;

const LikesSchema = new mongoose.Schema({
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

export default model('Like', LikesSchema);
