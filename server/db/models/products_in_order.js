const Sequelize = require('sequelize');
const db = require('../db');

const Products_in_order = db.define('products_in_order', {
    quantity: Sequelize.INTEGER,
    purchasePrice: Sequelize.FLOAT
});

module.exports = Products_in_order;
