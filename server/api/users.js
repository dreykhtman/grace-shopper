const router = require('express').Router()
const { User, Order, Product, Products_in_order } = require('../db/models')
module.exports = router

router.get('/orders', (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    Order.findAll({ include: [{ model: Product }, { model: User, attributes: ['id', 'email', 'name', 'address'] }] })
      .then(orders => {
        res.json(orders)
      })
      .catch(next);
  } else if (req.user) {
    Order.findAll({ where: { userId: req.user.id } }, { include: [{ model: Product }, { model: User, attributes: ['id', 'email', 'name', 'address'] }] })
      .then(orders => {
        res.json(orders)
      })
      .catch(next);
    //res.json('permission denied!')
  }
});

// router.route('/:id/orders/:orderId/cart')
// .get((req, res, next) => {
//   Order.findById(+req.params.orderId, {
//     where: {
//       placed: false
//     }
//   })
//     .then(order => res.json(order))
//     .catch(next)
// })

router.param('orderId', (req, res, next, id) => {
  Order.findById(id, {
    include: { all: true }
  })
    .then(order => {
      if (req.user && (order.userId === id || req.user.isAdmin)) {
        req.order = order;
        next();
      } else { res.send('Permission denied, you can only view your own orders, users will be flagged upon requesting other orders.') }
    })
    .catch(err => console.error(err))
})
router.route('/:userId/orders/:orderId')
.get((req, res, next) => res.json(req.order))
.put((req, res, next) => {
  req.order.update({
    placed: req.body.placed,
    timePlaced: req.body.timePlaced,
    shippedDate: req.body.shippedDate,
    deliveryDate: req.body.deliveryDate
  })
    .then(updated => res.json(updated))
})
.delete((req, res, next) => {
  req.order.destroy()
    .then(rip => console.log('RIP:', rip))
})

router.route('/:userId/cart')
.get((req, res, next) => {
  User.findById(+req.params.userId, {
    where: {
      placed: false
    },
    include: [{
      all: true,
      nested: true
    }],
    exclude: ['cc', 'password', 'salt', 'googleId']
  })
    .then(foundUser => res.json(foundUser))
    .catch(next)
})

router.get('/:userId/orders', (req, res, next) => {
  if (req.user && (req.user.id === +req.params.userId || req.user.isAdmin)) {
    Order.findAll({ where: { userId: +req.params.userId }, include: [{ model: Product }] })
      .then(order => {
        res.json(order)
      })
      .catch(next)
  } else {
    res.status(403).send('Access denied!')
  }
});

router.get('/:userId', (req, res, next) => {
  // admin validation is temporarily disabled for testing

  // if (req.user && (req.user.id === +req.params.userId || req.user.isAdmin)) {
  User.findById(+req.params.userId, {
    attributes: {
      include: ['id', 'email', 'name', 'address'],
      exclude: ['password', 'salt', 'googleId']
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.status(404).end()
      }
    })
    .catch(next);
  // } else {
  //   res.status(403).json('Access denied!')
  // }
});

router.put('/:userId', (req, res, next) => {
  if (req.user && (req.user.id === +req.params.userId || req.user.isAdmin)) {
    User.findById(+req.params.userId)
      .then(user => user.update(req.body))
      .then(user => res.json(user))
      .catch(next);
  } else {
    res.status(403).json('Access denied!')
  }
});

router.delete('/:userId', (req, res, next) => {
  if (req.user && (req.user.id === +req.params.userId || req.user.isAdmin)) {
    User.destroy({ where: { id: +req.params.userId } })
      .then(() => res.status(204).end())
      .catch(next);
  } else {
    res.status(403).json('Access denied!')
  }
});

router.get('/', (req, res, next) => {
  if (req.user.isAdmin) {
    User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: {
        include: ['id', 'email', 'name', 'address'],
        exclude: ['cc', 'password', 'salt', 'googleId']
      }
    })
      .then(users => res.json(users))
      .catch(next)
  } else {
    res.status(403).json('Access denied!')
  }
});

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
});
