const Sequelize = require('sequelize');
const db = require('../db');

const products_in_order = db.define('products_in_order', {
    quantity: Sequelize.INTEGER
});

module.exports = products_in_order;
