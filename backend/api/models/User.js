const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');

const sequelize = require('../../config/database');

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'users';

const User = sequelize.define('User', {
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
}, { hooks, tableName });

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
