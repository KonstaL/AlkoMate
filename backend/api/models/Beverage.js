const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'beverages';

const Beverage = sequelize.define('Beverage', {
  ean: {
    type: Sequelize.STRING,
    unique: true,
  },
  name: Sequelize.STRING,
  brand: Sequelize.STRING,
  size: Sequelize.INTEGER,
  strength: Sequelize.INTEGER,

  country: Sequelize.STRING,
  views: Sequelize.BIGINT,
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, { tableName });

// eslint-disable-next-line
Beverage.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = Beverage;



// let drinkSchema = new mongoose.Schema({
//   originalId: String,
//   name: String,
//   brand: String,
//   size: String,
//   price: Number,
//   literPrice: Number,
//   type: String,
//   beerType: String,
//   country: String,
//   description: String,
//   packaging: String,
//   strength: Number,
//   imageUrl: String,
//   views: { default: 0, type: Number },
//   ratings: [],
//   comments: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Comment'
//     }
//   ]
// });

// drinkSchema.plugin(findOrCreate);
// // TODO: change this.imageUrl getter to automatically generate the url if none is found instead of virtual field
// drinkSchema.virtual('formattedImageUrl').get(function() {
//   if (this.imageUrl !== undefined && this.imageUrl !== null)
//     return this.imageUrl;

//   let url = `https://images.alko.fi/images/cs_srgb,f_auto,t_medium/cdn/${
//     this.originalId
//   }/${this.name}.jpg`;
//   url = url.replace(/ /g, '-');
//   this.imageUrl = url.replace(/'/g, '');
//   return this.imageUrl;
// });

// drinkSchema.virtual('avarageRating').get(function() {
//   if (this.ratings.length === 0) return 0;
// //   let total = 0;
//   for (let i = 0; i < this.ratings.length; i++) {
//     total += this.ratings[i];
//   }
//   return total / this.ratings.length;
// });

// drinkSchema.set('toObject', { virtuals: true });
// drinkSchema.set('toJSON', { virtuals: true });

// module.exports = mongoose.model('Drink', drinkSchema);