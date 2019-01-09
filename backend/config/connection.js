var parse = require('pg-connection-string').parse;

const development = {
  database: 'alkomate',
  username: 'alkomate',
  password: 'alkomate',
  host: 'localhost',
  dialect: 'postgres',
};

const testing = {
  database: 'databasename',
  username: 'username',
  password: 'password',
  host: 'localhost',
  dialect: 'sqlite' || 'mysql' || 'postgres',
};

let production = {};
if(process.env.DATABASE_URL) {
  const parsedData = parse(process.env.DATABASE_URL);
  
  production = {
    database: parsedData.database,
    username: parsedData.user,
    password: parsedData.password,
    host: parsedData.host,
    dialect: 'postgres',
  };
  
}
module.exports = {
  development,
  testing,
  production,
};
