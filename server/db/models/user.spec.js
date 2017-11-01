/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('attributes definition', () => {
    let coby;

    beforeEach(() => {
      return User.create({
        email: 'cody@puppybook.com',
        password: 'bones',
        name: 'Cody Green',
        address: '123 Street Pl',
        cc: '5789615975385246'
      })
      .then(user => {
        coby = user
      })
    })


    it('includes `name` and `email` fields', () => {
      expect(coby.name).to.equal('Cody Green')
      expect(coby.email).to.equal('cody@puppybook.com')
    })
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(() => {
        return User.create({
          email: 'cody@puppybook.com',
          password: 'bones',
          name: 'Cody Green',
          address: '123 Street Pl',
          cc: '5789615975385246'
        })
          .then(user => {
            cody = user
          })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
