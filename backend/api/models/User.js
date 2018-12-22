const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');
const sequelize = require('../../config/database');
const Beverage = require('./Beverage');
const Comment = require('./Comment');

const tableName = 'users';
const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  },
};


const User = sequelize.define('User', {
  userName: {
    type: Sequelize.STRING,
    unique: true,
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  gender:{
    type:   Sequelize.ENUM,
    values: ['female', 'male', 'other']
  },
  country: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  }
  // TODO: Birhday, last known location, 
}, { hooks, tableName });

User.belongsToMany(Beverage, { as: 'drankBeverages', through: 'drank_beverages'});
User.belongsToMany(Beverage, { as: 'likedBeverages', through: 'liked_beverages'});
User.belongsToMany(User, { as: 'friends', through: 'user_friends'});
User.hasMany(Comment, { as: 'comments'});

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;

  return values;
};

module.exports = User;







// var mongoose = require('mongoose'),
//   passportLocalMongoose = require('passport-local-mongoose');
// const findOrCreate = require('mongoose-find-or-create');

// // var userSchema = new mongoose.Schema({
// //     username: {type: String, unique:true, required: true},
// //     email: String,
// //     password: String,
// //     points: Number,
// //     resetPasswordToken: String,
// //     resetPasswordExpires: Date,
// //     isAdmin: {type: Boolean, value: false}
// // });

// let userSchema = new mongoose.Schema({
//   name: String,
//   userId: String,
//   updatedAt: { type: Date, default: Date.now }
// });

// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

// module.exports = mongoose.model('User', userSchema);
