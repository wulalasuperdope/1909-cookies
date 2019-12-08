const Sequelize = require('sequelize');

const connection = new Sequelize(process.env.DB_URI || 'postgres://localhost:5432/1909-cookies', {
  logging: false,
});

module.exports = connection;
