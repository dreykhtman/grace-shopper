/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })



  describe('/api/users/', () => {

    const codysEmail = 'cody@puppybook.com'
    const codysName = 'Cody Green'
    const codysAddress = '123 Street Pl'
    const codysCC = '5789615975385246'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        name: codysName,
        address: codysAddress,
        cc: codysCC
      })
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })
  }) // end describe('/api/users')

  describe('GET user by id', () => {

    const codysEmail = 'cody@puppybook.com'
    const codysName = 'Cody Green'
    const codysAddress = '123 Street Pl'
    const codysCC = '5789615975385246'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        name: codysName,
        address: codysAddress,
        cc: codysCC
      })
    })

    it('GET user by id', () => {
      return request(app)
        .get('/api/users/1')
        .expect(200)
        .then(res => {
          expect(res.body.cc).to.be.equal(codysCC)
        })
    })

    it('returns 404 if the id is not correct', () => {
      return request(app)
        .get('/api/users/4')
        .expect(404)
    })
  })

  describe('POST route', () => {
    it('creates a new user', () => {
      return request(app)
        .post('/api/users')
        .send({
          email: 'toby@mail.com',
          name: 'Toby Brown',
          address: '81 Meow St',
          cc: '6846484649648946'
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.email).to.equal('toby@mail.com')
          expect(res.body.name).to.equal('Toby Brown')
          expect(res.body.id).to.not.be.an('undefined')
          expect(res.body.address).to.equal('81 Meow St')
          expect(res.body.cc).to.equal('6846484649648946')
        })
    })
  })
}) // end describe('User routes')
