const Sequelize = require('sequelize');
const db = require('../db');


const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/open-box.jpg' // removed public
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  getterMethods: {
    floatPrice(){
      return this.getDataValue('price') % 100;
    }
  },
  hooks: {
    beforeValidate(){
      //take the price and set it from 100.00 to 10000
      return this.price * 100
    }
  }
})

module.exports = Product;
