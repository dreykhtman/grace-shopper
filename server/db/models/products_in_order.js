const Sequelize = require('sequelize');
const db = require('../db');

const Products_in_order = db.define('products_in_order', {
    quantity: Sequelize.INTEGER
});

module.exports = Products_in_order;
