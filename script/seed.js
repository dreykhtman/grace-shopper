// /**
//  * Welcome to the seed file! This seed file uses a newer language feature called...
//  *
//  *                  -=-= ASYNC...AWAIT -=-=
//  *
//  * Async-await is a joy to use! Read more about it in the MDN docs:
//  *
//  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
//  *
//  * Now that you've got the main idea, check it out in practice below!
//  */
// const db = require('../server/db')
// const {User} = require('../server/db/models')

// async function seed () {
//   await db.sync({force: true})
//   console.log('db synced!')
//   // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
//   // executed until that promise resolves!

//   const users = await Promise.all([
//     User.create({email: 'cody@email.com', password: '123'}),
//     User.create({email: 'murphy@email.com', password: '123'})
//   ])
//   // Wowzers! We can even `await` on the right-hand side of the assignment operator
//   // and store the result that the promise resolves to in a variable! This is nice!
//   console.log(`seeded ${users.length} users`)
//   console.log(`seeded successfully`)
// }

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
// seed()
//   .catch(err => {
//     console.error(err.message)
//     console.error(err.stack)
//     process.exitCode = 1
//   })
//   .then(() => {
//     console.log('closing db connection')
//     db.close()
//     console.log('db connection closed')
//   })

// /*
//  * note: everything outside of the async function is totally synchronous
//  * The console.log below will occur before any of the logs that occur inside
//  * of the async function
//  */
// console.log('Seeding...');


const {User, Product, Order, Products_in_order, Review, db} = require('../server/db/models');

const usersBasic = [
  { name: 'Dmytro', address: '123 Main Street New York, NY 10004', cc: '1234567890123000', isAdmin: false },
  { name: 'Lucy', address: '124 Main Street New York, NY 10004', cc: '1234567890124000', isAdmin: false },
  { name: 'Jonathan', address: '125 Main Street New York, NY 10004', cc: '1234567890125000', isAdmin: true },
  { name: 'Minami', address: '126 Main Street New York, NY 10004', cc: '1234567890126000', isAdmin: false },
  { name: 'Dennis', address: '127 Main Street New York, NY 10004', cc: '1234567890127000', isAdmin: true },
  { name: 'Corey', address: '128 Main Street New York, NY 10004', cc: '1234567890128000', isAdmin: true }
];

const users = usersBasic.map(user => {
  user.email = `${user.name}@email.com`;
  user.password = `${user.name}99`;
  user.googleId = `google${user.name}99`;
  return user;
})

//Remember to render products with a stock of 0 as "Out of stock"
const products = [
  { name: 'Air guitar', description: 'Lightweight instrument of the imagination', price: 199.99, stock: 3, imageUrl: 'https://images.8tracks.com/cover/i/000/493/172/1342757372-imglargephotoairguitar1-9129.jpg?rect=0,37,424,424&q=98&fm=jpg&fit=max&w=320&h=320', category: 'Instruments'},
  { name: 'FF wig', description: 'Fiery and fancy wig', price: 99.99, stock: 5, imageUrl: 'https://i.pinimg.com/736x/ca/93/80/ca9380f90a855e1d6b69558013bca960--red-wigs-costume-wigs.jpg', category: 'Wigs'},
  { name: 'Ultros', description: 'Demonic octopus', price: 999.99, stock: 0, imageUrl: 'http://www.creativeuncut.com/gallery-18/art/ff13-2-ultros.jpg', category: 'Live Exotic Creatures'},
  { name: 'Ultraball', description: 'Advanced pokeball for catching special pokemons', price: 29.99, stock: 10, imageUrl: 'https://i5.walmartimages.com/asr/240ed451-66e8-48f6-bda2-aa63d16108ff_1.1a50b5d9b27de5bbe30ae8b25b52eb58.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff', category: 'Toys'}
]

const orders = [
  {placed: true, timePlaced: Date.now(), shippedDate: Date.now(), deliveryDate: Date.now(), userId: 1},
  {placed: true, timePlaced: Date.now(), shippedDate: Date.now(), deliveryDate: Date.now(), userId: 2},
  {placed: true, timePlaced: Date.now(), shippedDate: Date.now(), deliveryDate: Date.now(), userId: 3},
  {placed: true, timePlaced: Date.now(), shippedDate: Date.now(), deliveryDate: Date.now(), userId: 4},
  {placed: true, timePlaced: Date.now(), shippedDate: Date.now(), deliveryDate: Date.now(), userId: 5},
  {placed: false, userId: 5},
  {placed: false, userId: 6},
]

const orderedProducts = [
  {quantity: 2, orderId: 1, productId: 1},
  {quantity: 3, orderId: 2, productId: 2},
  {quantity: 1, orderId: 3, productId: 3},
  {quantity: 10, orderId: 4, productId: 4},
  {quantity: 1, orderId: 5, productId: 3},
  {quantity: 1, orderId: 6, productId: 1},
  {quantity: 1, orderId: 6, productId: 2},
  {quantity: 3, orderId: 6, productId: 4},
  {quantity: 1, orderId: 7, productId: 3},
  {quantity: 5, orderId: 7, productId: 4}
]

const reviews = [
  { text: "I searched all over the web and couldn't find a compatible amp anywhere, been shredding for a week now and noticed the paint coming off already :(",
  rating: 1.3,
  userId: 1,
  productId: 1 },
  { text: 'Not the fanciest but delivers on the fyah.',
  rating: 3.7,
  userId: 2,
  productId: 2 },
  { text: 'Not sure if ultros likes to cuddle or is trying to strangle me at night but either way I love it ;)',
  rating: 5,
  userId: 3,
  productId: 3 },
  { text: 'My ultros died during shipping :\'(',
  rating: 1.5,
  userId: 5,
  productId: 3 },
  { text: 'Caught me a rare magikarp yesterday on the first try!',
  rating: 4.1,
  userId: 4,
  productId: 4 }
]

//console.log('Seeding...');
// async function seed() {
//   await db.sync({force: true})
//   console.log('db synced!')
//   // Because we `await` the promise that db.sync returns, the next line will not be executed until that promise resolves!

//   let seedUsers = await Promise.all(users.map(user => User.create(user)))
//   console.log(`Seeded ${seedUsers.length} users`);

//   let seedProducts = await Promise.all(products.map(product => Product.create(product)))
//   console.log(`Seeded ${seedProducts.length} products`);

//   let seedOrders = await Promise.all(orders.map(order => Order.create(order)))
//   console.log(`Seeded ${seedOrders.length} orders`);

//   let seedOrderedProducts = await Promise.all(orderedProducts.map(orderedProd => products_in_order.create(orderedProd)))
//   console.log(`Seeded ${seedOrderedProducts.length} orders`);

//   let seedReviews = await Promise.all(reviews.map(review => Review.create(review)))
//   console.log(`Seeded ${seedReviews.length} reviews`);

//   console.log(`Seeding complete`);
// }

// // Execute the `seed` function
// // `Async` functions always return a promise, so we can use `catch` to handle any errors that might occur inside of `seed`
// seed()
//   .catch(err => {
//     console.error(err.message);
//     console.error(err.stack);
//     process.exitCode = 1
//   })
//   .then(() => {
//     console.log('closing db connection');
//     db.close();
//     console.log('db connection closed');
//   })

const seed = () =>
Promise.all(users.map(user => User.create(user)))
.then( Ps => {
  console.log(`Seeded ${Ps.length} users`)
  return Promise.all(products.map(product => Product.create(product)))
})
.then( Ps => {
  console.log(`Seeded ${Ps.length} products`)
  return Promise.all(orders.map(order => Order.create(order)))
})
.then( Ps => {
  console.log(`Seeded ${Ps.length} orders`)
  return Promise.all(orderedProducts.map(orderedProd => Products_in_order.create(orderedProd)))
})
.then( Ps => {
  console.log(`Seeded ${Ps.length} orderedProducts`)
  return Promise.all(reviews.map(review => Review.create(review)))
})
.then(Ps => console.log(`Seeded ${Ps.length} reviews`))

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding database...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      console.log('Seeding complete');
      return null;
    });
};

main();
