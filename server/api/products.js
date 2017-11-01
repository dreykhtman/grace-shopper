const router = require('express').Router()
const {Product} = require('../db/models')
const {Review} = require('../db/models')
module.exports = router

router.param('productId', (req, res, next, id) => {
  //const id = +req.params.productId;
  Product.findById(id, {
    include: {model: Review}
  })
  .then(product => {
    req.product = product
    //console.log('found a product! req.product:', req.product)
    next();
  })
  .catch(err => console.error(err))
})

router.get('/:productId/reviews', (req, res, next) => {
  // Review.findAll({
  //   where: {productId: req.product.id}
  // })
  //   .then(products => res.json(products))
  //   .catch(next)
  console.log(req.product)
  res.json(req.product.reviews)
})

router.route('/:productId')
.get((req, res, next) => {
  res.json(req.product)
})
//.put((req, res, next) => {})
//.delete((req, res, next) => {})

router.get('/', (req, res, next) => {
  Product.findAll()
  .then(products => res.json(products))
  .catch(next)
})
