const Beverage = require('../models/Beverage');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const BeverageController = () => {
    
  const getAll = async (req, res) => {
    try {
      const beverages = await Beverage.findAll();

      return res.status(200).json({ beverages });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  return {
    getAll,
  };
};

module.exports = BeverageController;
