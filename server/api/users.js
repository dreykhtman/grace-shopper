const router = require('express').Router()
const { User, Order, Product } = require('../db/models')
module.exports = router


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


router.get('/:id/orders', (req, res, next) => {
  if (req.user && (req.user.id === +req.params.id || req.user.isAdmin)) {
    User.findById(+req.params.id, {
      attributes: {
        include: [{ all: true, nested: true }],
        // exclude: ['password', 'salt', 'googleId'] do we need this here?
      }
    })
      .then(user => {
        res.json(user)
      })
      .catch(next)
  } else {
    res.status(403).json('Access denied!')
  }
});


router.get('/:id', (req, res, next) => {
  // admin validation is temporarily disabled for testing

  // if (req.user && (req.user.id === +req.params.id || req.user.isAdmin)) {
  User.findById(req.params.id, {
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


router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
});


router.put('/:id', (req, res, next) => {
  if (req.user && (req.user.id === +req.params.id || req.user.isAdmin)) {
    User.findById(req.params.id)
      .then(user => user.update(req.body))
      .then(user => res.json(user))
      .catch(next);
  } else {
    res.status(403).json('Access denied!')
  }
});


router.delete('/:id', (req, res, next) => {
  if (req.user && (req.user.id === +req.params.id || req.user.isAdmin)) {
    User.destroy({ where: { id: req.params.id } })
      .then(() => res.status(204).end())
      .catch(next);
  } else {
    res.status(403).json('Access denied!')
  }
});
