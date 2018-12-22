const Sequelize = require('sequelize');
const sequelize = require('../../config/database');


const Comment = sequelize.define('Comment', {
  title: {
    type: Sequelize.STRING,
  },
  body: {
    type: Sequelize.TEXT,
  },
});

Comment.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());  
    return values;
};


module.exports = Comment;
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