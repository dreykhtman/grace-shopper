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

// // Execute the `seed` function
// // `Async` functions always return a promise, so we can use `catch` to handle any errors
// // that might occur inside of `seed`
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
// console.log('seeding...')


const {User, Product, Review, db} = require('../db/models');

function generateSalt() {
  return crypto.randomBytes(16).toString('base64')
}

const users = [
  { name: 'Dmytro', email: `${this.name}99@email.com`, address: '123 Main Street New York, NY 10004', cc: '1234567890123000', password: 'JSNinja99', salt: generateSalt(), googleId: `google${this.name}99`, isAdmin: false },
  { name: 'Lucy', email: `${this.name}99@email.com`, address: '124 Main Street New York, NY 10004', cc: '1234567890124000', password: 'JSNinja99', salt: generateSalt(), googleId: `google${this.name}99`, isAdmin: false },
  { name: 'Jonathan', email: `${this.name}99@email.com`, address: '125 Main Street New York, NY 10004', cc: '1234567890125000', password: 'JSNinja99', salt: generateSalt(), googleId: `google${this.name}99`, isAdmin: false },
  { name: 'Minami', email: `${this.name}99@email.com`, address: '126 Main Street New York, NY 10004', cc: '1234567890126000', password: 'JSNinja99', salt: generateSalt(), googleId: `google${this.name}99`, isAdmin: false },
  { name: 'Dennis', email: `${this.name}99@email.com`, address: '127 Main Street New York, NY 10004', cc: '1234567890127000', password: 'JSNinja99', salt: generateSalt(), googleId: `google${this.name}99`, isAdmin: true }
];

//Remember to render products with a stock of 0 as "Out of stock"
const products = [
  { name: 'Air guitar', description: 'Lightweight instrument of the imagination', price: 199.99, stock: 3, image: 'https://images.8tracks.com/cover/i/000/493/172/1342757372-imglargephotoairguitar1-9129.jpg?rect=0,37,424,424&q=98&fm=jpg&fit=max&w=320&h=320', category: 'instruments'},
  { name: 'FF wig', description: 'Fiery and fancy wig', price: 99.99, stock: 5, image: 'https://i.pinimg.com/736x/ca/93/80/ca9380f90a855e1d6b69558013bca960--red-wigs-costume-wigs.jpg', category: 'wigs'},
  { name: 'Ultros', description: 'Demonic octopus', price: 999.99, stock: 0, image: 'http://www.creativeuncut.com/gallery-18/art/ff13-2-ultros.jpg', category: 'live exotic animals'},
  { name: 'Ultraball', description: 'Advanced pokeball for catching special pokemons', price: 29.99, stock: 10, image: 'https://i5.walmartimages.com/asr/240ed451-66e8-48f6-bda2-aa63d16108ff_1.1a50b5d9b27de5bbe30ae8b25b52eb58.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff', category: 'toys'}
]

const reviews = [
  { text: "I searched all over the web and couldn't find a compatible amp anywhere, been shredding for a week now and noticed the paint coming off already :(",
  rating: 1,
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
  { text: 'Caught me a rare magikarp yesterday on the first try!',
  rating: 4,
  userId: 4,
  productId: 4 }
]

const seed = () =>
  Promise.all(users.map(user =>
    User.create(user))
  )
  .then(() =>
  Promise.all(products.map(product =>
    Product.create(product))
  ))
  .then(() =>
  Promise.all(reviews.map(review =>
    Review.create(review))
  )
)

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
      return null;
    });
};

main();
