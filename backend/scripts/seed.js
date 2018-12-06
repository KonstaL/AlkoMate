// const mongoose = require('mongoose');
// const Drinks = require('./models/Drink');
// const fs = require('fs');
// const node_xj = require('xls-to-json-lc');

// const request = require('request');
// const XLSX = require('xlsx');

// const URL =
//   'https://www.alko.fi/INTERSHOP/static/WFS/Alko-OnlineShop-Site/-/Alko-OnlineShop/fi_FI/Alkon%20Hinnasto%20Tekstitiedostona/alkon-hinnasto-tekstitiedostona.xls';

// var file = './output.json',
//   juomaData = [];

// function autoUpdate() {
//   seedDB();
//   setInterval(seedDB, 2 * 24 * 60 * 1000);
// }

// function seedDB() {
//   // Download the newest alko data
//   request(URL, { encoding: null }, function(err, res, data) {
//     if (err || res.statusCode !== 200) return;
//     let workbook = XLSX.read(data, { type: 'buffer' });

//     // Returns a array where the 4th row's values are set as keyvalues to the rest of the data
//     let drinks = XLSX.utils.sheet_to_json(
//       workbook.Sheets[workbook.SheetNames[0]],
//       { raw: true, range: 3 }
//     );

//     // remove previous data from DB
//     Drinks.remove({}, function(err) {
//       if (err) {
//         console.log(err);
//         console.log('Error while deleting drinks');
//       } else {
//         console.log('Drinks removed!');

//         //Loop over the array and ADD each item
//         drinks.forEach(function(drink) {
//           if (
//             drink['Hinnastojärjestyskoodi'] !== '002' &&
//             drink['Hinnastojärjestyskoodi'] !== '710'
//           ) {
//             drink = toLowerCaseKeys(drink);
//             drink = convertToCents(drink);
//             drink = addDrinkType(drink);
//             drink = toTranslatedKeys(drink);

//             Drinks.create(drink, function(err, mongooseDrink) {
//               if (err) {
//                 console.log(drink);

//                 console.log(err);
//               } else {
//                 //SAVE each item
//                 mongooseDrink.save();
//               }
//             });
//           }
//         });
//       }
//     });
//   });
// }

// function addDrinkType(drink) {
//   switch (drink['hinnastojärjestyskoodi']) {
//     case 'S90':
//       drink.type = 'spirit';
//       break;
//     case 'S30':
//       drink.type = 'spirit';
//       break;
//     case '415':
//       drink.type = 'spirit';
//       break;
//     case 'S20':
//       drink.type = 'brandy';
//       break;
//     case 'S10':
//       drink.type = 'other wine';
//       break;
//     case 'H40':
//       drink.type = 'white wine';
//       break;
//     case 'H30':
//       drink.type = 'rosé wine';
//       break;
//     case 'H20':
//       drink.type = 'red wine';
//       break;
//     case 'S40':
//       drink.type = 'liqueur';
//       break;
//     case 'S50':
//       drink.type = 'sparkling wine';
//       break;
//     case 'S60':
//       drink.type = 'sparkling wine';
//       break;
//     case 'S70':
//       drink.type = 'sparkling wine';
//       break;
//     case 'S80':
//       drink.type = 'sparkling wine';
//       break;
//     case '110':
//       drink.type = 'red wine';
//       break;
//     case '130':
//       drink.type = 'white wine';
//       break;
//     case '600':
//       drink.type = 'beer';
//       break;
//     default:
//       drink.type = 'none';
//       break;
//   }
//   return drink;
// }

// //convert to cents for better mongoose usability
// //The cents are rounded to prevent quirky decimal behaviour
// function convertToCents(drink) {
//   drink.hinta = Math.round(drink.hinta * 100);
//   drink.litrahinta = Math.round(drink.litrahinta * 100);
//   return drink;
// }

// //Returns a new obj where the given obj keys are lowercased
// function toLowerCaseKeys(obj) {
//   return Object.keys(obj).reduce(function(accum, key) {
//     accum[key.toLowerCase()] = obj[key];
//     return accum;
//   }, {});
// }

// function toTranslatedKeys(drink) {
//   let newObj = {};

//   // Map needed finnish keys to equivalent english keys in the new obj
//   Object.keys(drink).forEach(key => {
//     switch (key) {
//       case 'numero':
//         newObj.originalId = drink.numero;
//         break;
//       case 'nimi':
//         newObj.name = drink.nimi;
//         break;
//       case 'valmistaja':
//         newObj.brand = drink.valmistaja;
//         break;
//       case 'pullokoko':
//         newObj.size = drink.pullokoko;
//         break;
//       case 'hinta':
//         newObj.price = drink.hinta;
//         break;
//       case 'litrahinta':
//         newObj.literPrice = drink.litrahinta;
//         break;
//       case 'oluttyyppi':
//         newObj.beerType = drink.oluttyyppi;
//         break;
//       case 'valmistusmaa':
//         newObj.country = drink.valmistusmaa;
//         break;
//       case 'luonnehdinta':
//         newObj.description = drink.luonnehdinta;
//         break;
//       case 'pakkaustyyppi':
//         newObj.packaging = drink.pakkaustyyppi;
//         break;
//       case 'alkoholi-%':
//         newObj.strength = drink['alkoholi-%'];
//         break;
//       case 'type':
//         newObj.type = drink.type;
//         break;
//       default:
//         break;
//     }
//   });
//   return newObj;
// }

// module.exports = autoUpdate;
