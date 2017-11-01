const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router


router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})


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
