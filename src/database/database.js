const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test', 'root', 'kenedypirata001', {
   // host: '192.168.10.30',
    host: '190.83.119.122',
    dialect: 'mysql'
  });

  module.exports = {sequelize}