const Sequelize = require('sequelize');
const db = require('../db');


const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: '/public/images/open-box.jpg'
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Product;
