const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
    placed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    timePlaced: {
        type: Sequelize.DATE
    },
    shippedDate: {
        type: Sequelize.DATE
    },
    subtotal: {
      type: Sequelize.FLOAT,
      defaultValue: null
    }
 });

 module.exports = Order;
