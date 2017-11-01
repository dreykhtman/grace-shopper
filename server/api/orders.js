const router = require('express').Router()
const { Order } = require('../db/models')
module.exports = router;

// this is an admin route

router.get('/', (req, res, next) => {
    Order.findAll({ include: [{ all: true }]})
    .then(orders => {
        res.json(orders)
    })
    .catch(next);
});
