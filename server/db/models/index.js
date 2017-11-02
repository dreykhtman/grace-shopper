const User = require('./user');
const Review = require('./review');
const Product = require('./product');
const Products_in_order = require('./products_in_order');
const Order = require('./order');
const db = require('../db.js');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Review.belongsTo(User);
Review.belongsTo(Product);

User.hasMany(Review);
Product.hasMany(Review);

Order.belongsTo(User);
User.hasMany(Order);

// const ProductsInOrder = db.define('products_in_order', {
//   quantity: Sequelize.INTEGER
// });
Order.belongsToMany(Product, { through: Products_in_order });
Product.belongsToMany(Order, { through: Products_in_order });


module.exports = {
  User,
  Product,
  Products_in_order,
  Review,
  Order,
  db
}
