const router = require('express').Router()
const { Order, Product, User, Products_in_order } = require('../db/models')
module.exports = router;

// this is an admin route

router.get('/', (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    Order.findAll({ include: [{ model: Product}, {model: User, attributes: ['id', 'email', 'name', 'address']}]})
    .then(orders => {
        res.json(orders)
    })
    .catch(next);
  } else {res.json('permission denied!')}
});

router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId, {include: {all: true}})
  .then(order => {
    res.json(order)
  })
  .catch(next)
});
