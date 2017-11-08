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
  { name: 'Air guitar', description: 'Lightweight instrument of the imagination', price: 199.99, stock: 5, imageUrl: 'https://images.8tracks.com/cover/i/000/493/172/1342757372-imglargephotoairguitar1-9129.jpg?rect=0,37,424,424&q=98&fm=jpg&fit=max&w=320&h=320', category: 'Instruments'},
  { name: 'FF wig', description: 'Fiery and fancy wig', price: 99.99, stock: 15, imageUrl: 'https://i.pinimg.com/736x/ca/93/80/ca9380f90a855e1d6b69558013bca960--red-wigs-costume-wigs.jpg', category: 'Wigs'},
  { name: 'Ultros', description: 'Demonic octopus', price: 999.99, stock: 0, imageUrl: 'http://www.creativeuncut.com/gallery-18/art/ff13-2-ultros.jpg', category: 'Live Exotic Creatures'},
  { name: 'Ultraball', description: 'Advanced pokeball for catching special pokemons', price: 29.99, stock: 100, imageUrl: 'https://i5.walmartimages.com/asr/240ed451-66e8-48f6-bda2-aa63d16108ff_1.1a50b5d9b27de5bbe30ae8b25b52eb58.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff', category: 'Toys'},
  { name: 'Banjo', description: 'The banjo is a four-, five- or six-stringed instrument with a thin membrane stretched over a frame or cavity as a resonator, called the head.', price: 105.99, stock: 10, imageUrl: 'https://banjo.com/wp-content/uploads/2016/02/deering-artisan-goodtime-2.jpg', category: 'Instruments'},
  { name: 'Disco Mullet Wig', description: '100% Polyester', price: 80.00, stock: 63, imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81Z86w2DIZL._UY879_.jpg', category: 'Wigs'},
  { name: 'Chocobo', description: 'The creature is generally a flightless bird, though certain highly specialized breeds in some titles retain the ability to fly.', price: 8996.99, stock: 3, imageUrl: 'http://vignette1.wikia.nocookie.net/finalfantasy/images/f/fc/CT_Chocobo.png/revision/latest?cb=20151127205658', category: 'Live Exotic Creatures'},
  { name: 'Voltron: Defender of the Universe', description: 'Voltron, defender of the universe returns! the single best-selling character in the history of the chogokin series is back with amazing posability and, of course, the ability to break down into five Lions. Also includes an optional screaming face to replicate battle scenes! the 270mm tall die cast figure comprises the red Lion, green Lion, blue Lion, yellow Lion, and black Lion, and accessories include the large sword and twin smaller swords plus a variety of other weapons. Includes a stand. Packaging for Western markets comes with a special sleeve that features a larger Voltron logo, while the package underneath features the go Lion logo more recognizable in asian markets.', price: 660.99, stock: 7, imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/81YsPDvUgrL._SL1500_.jpg', category: 'Toys'},
  { name: 'Drums', description: 'Pearl Masterworks 9-piece Stadium Exotic Shell Pack - Sunburst over Flame Maple', price: 13151.00, stock: 5, imageUrl: 'https://media.sweetwater.com/api/i/f-webp__q-82__ha-75a262158a1eb90f__hmac-538510b69ada36ae2d8a8fc0d52e40b29c89585e/images/items/750/MW922N-SFM-large.jpg', category: 'Instruments'},
  { name: 'Wig', description: 'Why do we sell this?', price: 9.99, stock: 74, imageUrl: 'http://www.feeling-flirtatious.co.uk/images/blackmale.jpg', category: 'Wigs'},
  { name: 'Cactuar', description: 'Cactuars are little cacti, typically depicted having stiff arms and legs, three black holes for their faces, representing two eyes and an oblong mouth, and three reddish quills at the top of their heads.', price: 100.00, stock: 5, imageUrl: 'http://vignette2.wikia.nocookie.net/finalfantasy/images/5/52/FF8_Cactuar.png/revision/latest?cb=20120506170218', category: 'Live Exotic Creatures'},
  { name: 'Transformers Alternators - Chevrolet Corvette', description: 'Includes Gun', price: 45.99, stock: 10, imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51ABFvAaJTL.jpg', category: 'Toys'}
]

const orders = [
  {placed: true, timePlaced: Date.now(), shippedDate: Date.now(), subtotal: 199.99 * 2, userId: 1},
  {placed: true, timePlaced: Date.now(), shippedDate: Date.now(), subtotal: (99.99 * 3).toFixed(2), userId: 2},
  {placed: true, timePlaced: Date.now(), shippedDate: Date.now(), subtotal: 999.99, userId: 3},
  {placed: true, timePlaced: Date.now(), shippedDate: Date.now(), subtotal: 29.99 * 10, userId: 4},
  {placed: true, timePlaced: Date.now(), shippedDate: Date.now(), subtotal: 999.99, userId: 5},
  {placed: false, subtotal: null, userId: 5},
  {placed: true, timePlaced: Date.now(), shippedDate: Date.now(), subtotal: (29.99 * 5 + 999.99).toFixed(2), userId: 6}
]

const orderedProducts = [
  {quantity: 2, purchasePrice: 199.99, orderId: 1, productId: 1},
  {quantity: 3, purchasePrice: 99.99, orderId: 2, productId: 2},
  {quantity: 1, purchasePrice: 999.99, orderId: 3, productId: 3},
  {quantity: 10, purchasePrice: 29.99, orderId: 4, productId: 4},
  {quantity: 1, purchasePrice: 999.99, orderId: 5, productId: 3},
  {quantity: 1, purchasePrice: null, orderId: 6, productId: 1},
  {quantity: 1, purchasePrice: null, orderId: 6, productId: 2},
  {quantity: 3, purchasePrice: null, orderId: 6, productId: 4},
  {quantity: 1, purchasePrice: 999.99, orderId: 7, productId: 3},
  {quantity: 5, purchasePrice: 29.99, orderId: 7, productId: 4}
]

const reviews = [
  { text: "I searched all over the web and couldn't find a compatible amp anywhere, been shredding for a week now and noticed the paint coming off already :(",
  rating: 1.3,
  userId: 1,
  productId: products.indexOf(products[0]) + 1 },
  { text: 'Not the fanciest but delivers on the fyah.',
  rating: 3.7,
  userId: 2,
  productId: products.indexOf(products[1]) + 1 },
  { text: 'Not sure if ultros likes to cuddle or is trying to strangle me at night but either way I love it ;)',
  rating: 5,
  userId: 3,
  productId: products.indexOf(products[2]) + 1 },
  { text: 'My ultros died during shipping :\'(',
  rating: 1.5,
  userId: 5,
  productId: products.indexOf(products[2]) + 1 },
  { text: 'Caught me a rare magikarp yesterday on the first try!',
  rating: 4.1,
  userId: 4,
  productId: products.indexOf(products[4]) + 1 },
  { text: 'Reminds me of home',
  rating: 4.9,
  userId: 1,
  productId: products.indexOf(products[5]) + 1 },
  { text: 'perfect for parties',
  rating: 3.6,
  userId: 2,
  productId: products.indexOf(products[6]) + 1 },
  { text: 'Cute!',
  rating: 5,
  userId: 3,
  productId: products.indexOf(products[7]) + 1 },
  { text: 'Blast from the past!',
  rating: 4.5,
  userId: 6,
  productId: products.indexOf(products[8]) + 1 },
  { text: 'Wooow... this price...',
  rating: 4,
  userId: 5,
  productId: products.indexOf(products[9]) + 1 },
  { text: 'Ugly!',
  rating: 1,
  userId: 4,
  productId: products.indexOf(products[10]) + 1 },
  { text: 'It transfoms',
  rating: 4.1,
  userId: 5,
  productId: products.indexOf(products[11]) + 1 },
  { text: 'Too heavy. Squeezed a pokemon to death!',
  rating: 1.3,
  userId: 5,
  productId: products.indexOf(products[3]) + 1 }
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
