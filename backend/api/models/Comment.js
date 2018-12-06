// const mongoose = require('mongoose');
// const findOrCreate = require('mongoose-find-or-create');

// const commentSchema = new mongoose.Schema({
//   text: String,
//   date: Date,
//   rating: Number,
//   author: {
//     id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//     },
//     username: String,
//   },
// });
// commentSchema.plugin(findOrCreate);
// module.exports = mongoose.model('Comment', commentSchema);