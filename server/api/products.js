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
    next();
  })
  .catch(err => console.error(err))
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
.get( (req, res, next) => {
  // Review.findById(+req.params.reviewId)
  // .then(review => res.json(review))
  res.json(req.review);
})
.put( (req, res, next) => {
  // Review.findById(+req.params.reviewId)
  // .then(review => {
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
.delete( (req, res, next) => {
  // Review.findById(+req.params.reviewId)
  // .then(review => {
  if (req.user && (req.user.id === req.review.userId || req.user.isAdmin)) {
    req.review.destroy()
    .then(() => res.json(`Succesfully deleted`))
  }
})

router.route('/:productId/reviews')
.get( (req, res, next) => {
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


//WHEN MAKING REQUESTS!
// (node:18703) Warning: a promise was created in a handler at /Users/jonathanmartinez/Documents/Fullstack/Immersive/seniorProjects/grace-shopper/node_modules/passport/lib/authenticator.js:339:7 but was not returned from it, see http://goo.gl/rRqMUw
//     at Function.Promise.attempt.Promise.try (/Users/jonathanmartinez/Documents/Fullstack/Immersive/seniorProjects/grace-shopper/node_modules/bluebird/js/release/method.js:29:9)
// (node:18703) Warning: a promise was created in a handler at /Users/jonathanmartinez/Documents/Fullstack/Immersive/seniorProjects/grace-shopper/server/api/products.js:13:5 but was not returned from it, see http://goo.gl/rRqMUw
//     at Function.Promise.attempt.Promise.try (/Users/jonathanmartinez/Documents/Fullstack/Immersive/seniorProjects/grace-shopper/node_modules/bluebird/js/release/method.js:29:9)
// GET /api/products/3/reviews 200 14.462 ms - 310

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
  } else {res.status(401).send('Must be an admin to delete product.')}
})

router.route('/')
.get( (req, res, next) => {
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
  } else {res.status(401).send('Must be an admin to post product.')}
})

router.get('/category/:categoryName', (req, res, next) => {
  Product.findAll({
    where: {
      category: req.params.categoryName
    }
  })
    .then(products => res.json(products))
    .catch(next)
});
