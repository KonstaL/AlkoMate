const publicRoutes = {
  'POST /user': 'UserController.register',
  'POST /register': 'UserController.register', // alias for POST /user
  'POST /login': 'UserController.login',
  'POST /validate': 'UserController.validate',
  'GET /users': 'UserController.getAll',


  'GET /beverages': 'BeverageController.getAll',
  'GET /beverages/:ean': 'BeverageController.getOne',
  'POST /beverages': 'BeverageController.addOne',
};

module.exports = publicRoutes;
