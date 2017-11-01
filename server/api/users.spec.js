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

  const codysEmail = 'cody@puppybook.com'
  const codysName = 'Cody Green'
  const codysAddress = '123 Street Pl'
  const codysCC = '5789615975385246'

  describe('/api/users/', () => {
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

  // not working yet
  describe('GET /api/users/:id', () => {
    it('GET /api/users/:id', () => {
      return request(app)
        .get('/api/users/1')
        .expect(200)
        .then(res => {
          expect(res.body.cc).to.be.equal(codysName)
        })
    })
  })
}) // end describe('User routes')
