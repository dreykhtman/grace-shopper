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
  } else if (req.user) {
    Order.findAll({where: {userId: req.user.id}}, { include: [{ model: Product}, {model: User, attributes: ['id', 'email', 'name', 'address']}]})
    .then(orders => {
        res.json(orders)
    })
    .catch(next);
    //res.json('permission denied!')
  }
});

router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId, {include: {all: true}})
  .then(order => {
    if (req.user && (order.userId === req.user.id || req.user.isAdmin) ) {
      res.json(order)
    } else {res.send('Permission denied, you can only view your own orders, users will be flagged upon requesting other orders.')}
  })
  .catch(next)
});
