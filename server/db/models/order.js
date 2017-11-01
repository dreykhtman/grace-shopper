const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
    placed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    timePlaced: {
        type: Sequelize.DATE
    },
    shippedDate: {
        type: Sequelize.DATE
    },
    deliveryDate: {
        type: Sequelize.DATE
    }
 });

 module.exports = Order;
