// const router = require('express').Router()
//const { Order, Product, User, Products_in_order } = require('../db/models')
//module.exports = router;

// router.param('orderId', (req, res, next, id) => {
//   Order.findById(id, {
//     include: { all: true }
//   })
//     .then(order => {
//       if (req.user && (order.userId === id || req.user.isAdmin)) {
//         req.order = order;
//         next();
//       } else { res.send('Permission denied, you can only view your own orders, users will be flagged upon requesting other orders.') }
//     })
//     .catch(err => console.error(err))
// })

// router.route('/:orderId')
//   .get((req, res, next) => res.json(req.order))
//   .put((req, res, next) => {
//     req.order.update({
//       placed: req.body.placed,
//       timePlaced: req.body.timePlaced,
//       shippedDate: req.body.shippedDate,
//       deliveryDate: req.body.deliveryDate
//     })
//       .then(updated => res.json(updated))
//   })
//   .delete((req, res, next) => {
//     req.order.destroy()
//       .then(rip => console.log('RIP:', rip))
//   })

// router.route('/:orderId/cart')
//   .get((req, res, next) => {
//     Order.findById(+req.params.orderId, {
//       where: {
//         placed: false
//       }
//     })
//       .then(order => res.json(order))
//       .catch(next)
//   })
// .put((req, res, next) => {
//   req.order.update({
//     placed: req.body.placed,
//     timePlaced: req.body.timePlaced,
//     shippedDate: req.body.shippedDate,
//     deliveryDate: req.body.deliveryDate
//   })
//     .then(updated => res.json(updated))
// })
// .delete((req, res, next) => {
//   req.order.destroy()
//     .then(rip => console.log('RIP:', rip))
// })


//ADD TO ADMIN ROUTE
// router.get('/', (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     Order.findAll({ include: [{ model: Product }, { model: User, attributes: ['id', 'email', 'name', 'address'] }] })
//       .then(orders => {
//         res.json(orders)
//       })
//       .catch(next);
//   } else if (req.user) {
//     Order.findAll({ where: { userId: req.user.id } }, { include: [{ model: Product }, { model: User, attributes: ['id', 'email', 'name', 'address'] }] })
//       .then(orders => {
//         res.json(orders)
//       })
//       .catch(next);
//     //res.json('permission denied!')
//   }
// });

