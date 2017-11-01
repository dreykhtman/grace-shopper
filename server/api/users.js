const router = require('express').Router()
const { User, Order, Product } = require('../db/models')
module.exports = router


router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'name', 'address', 'cc']
  })
    .then(users => res.json(users))
    .catch(next)
});


router.get('/:id/orders', (req, res, next) => {
  if (req.user && (req.user.id === +req.params.id || req.user.isAdmin)) {
    User.findById(+req.params.id, { include: [{ all: true, nested: true }] })
      .then(user => {
        res.json(user)
      })
      .catch(next)
  } else {
    res.json('Access denied!')
  }
});


router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, {
    attributes: ['id', 'email', 'name', 'address', 'cc']
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.status(404).end()
      }
    })
    .catch(next);
});


router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
});


router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.update(req.body))
    .then(user => res.json(user))
    .catch(next);
});


router.delete('/:id', (req, res, next) => {
  if (req.user && (req.user.id === +req.params.id || req.user.isAdmin)) {
    User.destroy({ where: { id: req.params.id } })
      .then(() => res.status(204).end())
      .catch(next);
  } else {
    res.json('Access denied!')
  }
});
