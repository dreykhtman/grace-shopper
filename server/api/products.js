const router = require('express').Router()
const { Product, Review, Products_in_order, Order } = require('../db/models')
module.exports = router

router.param('productId', (req, res, next, id) => {
  Product.findById(id, {
    include: { model: Review }
  })
    .then(product => {
      req.product = product
      next();
    })
    .catch(err => console.error(err))
})

router.route('/:productId/cart')
.post((req, res, next) => {
  if (req.user) {
    Order.findOrCreate({
      where: {
        userId: +req.body.userId,
        placed: false
      }
    })
    .spread((order, created) => {
      return Products_in_order.create({
        quantity: req.body.quantity,
        purchasePrice: req.body.price,
        productId: req.body.productId,
        orderId: order.id
      })
    })
    .then(created => res.json(`Created order: ${created}`))
    .catch(next);
  }
})
.put( (req, res, next) => {
  if (req.user) {
    Products_in_order.findOne({
      where: { orderId: +req.body.orderId, productId: req.body.productId}
    })
    .then(prodInOrder => prodInOrder.update({quantity: req.body.quantity}))
    .then(updated => console.log(`Updated order: ${updated}`))
  }
})
.delete((req, res, next) => {
  if (req.user && req.user.isAdmin) {
    req.product.destroy()
      .then(() => res.json(`Successfully deleted order`))
  } else { res.status(401).send('Must be an admin to delete order.') }
})

//.all before requests will find by id and attach to the req
router.route('/:productId/reviews/:reviewId')
  .all((req, res, next) => {
    Review.findById(+req.params.reviewId)
      .then(review => {
        req.review = review
        next();
      })
      .catch(err => console.error(err))
  })
  .get((req, res, next) => {
    res.json(req.review);
  })
  .put((req, res, next) => {
    if (req.user && (req.user.id === req.review.userId || req.user.isAdmin)) {
      req.review.update({
        text: req.body.text,
        rating: req.body.rating,
        userId: req.body.userId,
        productId: req.body.productId
      })
        .then(updatedReview => res.json(`Succesfully updated: ${updatedReview}`))
    }
  })
  .delete((req, res, next) => {
    if (req.user && (req.user.id === req.review.userId || req.user.isAdmin)) {
      req.review.destroy()
        .then(() => res.json(`Succesfully deleted`))
    }
  })

router.route('/:productId/reviews')
  .get((req, res, next) => {
    res.json(req.product.reviews)
  })
  .post((req, res, next) => {
    Review.create({
      text: req.body.text,
      rating: req.body.rating,
      userId: req.body.userId,
      productId: req.body.productId
    })
      .then(review => res.json(`Created review: ${review}`))
      .catch(next)
  })
// .delete((req, res, next) => {
//   //only admins or self will delete reviews (MUST BE DONE ON USER SIDE)
// })

router.route('/:productId')
  .get((req, res, next) => {
    res.json(req.product)
  })
  .put((req, res, next) => {
    if (req.user && req.user.isAdmin) {
      req.product.update({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        image: req.body.image,
        category: req.body.category
      })
        .then(updated => res.json(`Updated product: ${updated}`))
    } else {
      res.status(401).send('Must be an admin to update product.')
    }
  })
  .delete((req, res, next) => {
    if (req.user && req.user.isAdmin) {
      req.product.destroy()
        .then(() => res.json(`Successfully deleted product`))
    } else { res.status(401).send('Must be an admin to delete product.') }
  })

router.route('/')
  .get((req, res, next) => {
    Product.findAll()
      .then(products => res.json(products))
      .catch(next)
  })
  .post((req, res, next) => {
    if (req.user && req.user.isAdmin) {
      Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        image: req.body.image,
        category: req.body.category
      })
        .then(product => res.json(product))
        .catch(next);
    } else { res.status(401).send('Must be an admin to post product.') }
  })
