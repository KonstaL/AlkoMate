const Beverage = require('../models/Beverage');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const BeverageController = () => {
    
  const getAll = async (req, res) => {
    try {
      const beverages = await Beverage.findAll();

      res.status(200).json({ beverages });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getOne = async (req, res) => {
    try {
      const beverage = await Beverage.findByPk(req.params.ean);

      if (beverage) {
        beverage.increment('views');
        return res.status(200).json(beverage);
      }
      return res.status(404).json({}); 
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const addOne = async (req, res) => {
    try {
      console.log('body', req.body);
      const beverage = req.body;
    
      if (isValidBeverage(beverage)) {
        const resBeverage = await Beverage.create(beverage);
        return res.status(201).json(resBeverage); 
      }
      return res.status(400).json({msg: 'Not a valid beverage'}); 
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: 'Beverage already in database' });
    }
  }



  const isValidBeverage = (beverage) => {
    //Check if EAN is valid and so on
    const nameValid = !!beverage.name && beverage.name !== '';
    const brandValid = !!beverage.brand && beverage.brand !== '' 
    const sizeValid = !!beverage.size && Number(beverage.size) != NaN;
    const strengthValid = !!beverage.strength && Number(beverage.strength) != NaN;
    
    return nameValid && brandValid && sizeValid && strengthValid;
  }


  return {
    getAll,
    getOne,
    addOne,
  };
};

module.exports = BeverageController;
