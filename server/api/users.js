const router = require('express').Router()
const { User, Order, Product } = require('../db/models')
module.exports = router


router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'name', 'address']
  })
    .then(users => res.json(users))
    .catch(next)
});

router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId, { attributes: ['id', 'email', 'name', 'address']})
    .then(user => res.json(user))
    .catch(next)
});

router.post('/', (req, res, next) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    cc: req.body.cc,
    isAdmin: req.body.isAdmin
  })
  .then(newUser => {
    res.json(newUser)
  })
  .catch(next)
});

router.put('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
  .then(user => {
    user.update({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      cc: req.body.cc,
      isAdmin: req.body.isAdmin
    })
    .then(updatedUser => {
      res.json(updatedUser)
    })
  })
  .catch(next)
});

router.delete('/:userId', (req, res, next) => {
  const id = req.params.userId;
  User.destroy({ where: { id }})
    .then(() => {
      res.json('user deleted')
    })
  .catch(next)
});

router.get('/:id/orders', (req, res, next) => {
  User.findById(+req.params.id, {include: [{ all: true, nested: true }]})
  .then(user => {
    res.json(user)
  })
  .catch(next)
});


router.get('/:id', (req, res, next) => {
  let id = req.params.id;

  User.findById(id, {
    attributes: ['id', 'email', 'name', 'address', 'cc']
  })
    .then(user => res.json(user))
    .catch(next);
});


router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
});


router.put('/:id', (req, res, next) => {
  let id = req.params.id;

  User.findById(id)
    .then(user => user.update(req.body))
    .then(user => res.json(user))
    .catch(next);
});


router.delete('/:id', (req, res, next) => {
  let id = req.params.id;

  User.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});

// if(req.user && (req.quser.id = req.params.id || req.user.isAdmin))
