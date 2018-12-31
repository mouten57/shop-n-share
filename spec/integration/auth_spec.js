//Integration testing is a type of testing to
//check if different pieces of the modules are working together.
const request = require('request');
const base = 'http://localhost:5000/';
require('../../db/models/User');
var mongoose = require('mongoose');
const User = mongoose.model('users');

describe('routes : auth', () => {
  afterAll(async done => {
    // await Item.deleteMany({ product: 'JasmineTest' });
    await User.deleteMany({ googleId: 0 });
    try {
      done();
    } catch (err) {
      console.log(err);
    }
  });
  describe('GET /auth/google', () => {
    it('should take user to google sign in screen', async done => {
      await request.get(`${base}auth/google`, (err, res, body) => {
        try {
          expect(body).toContain('Sign in - Google Accounts');
          done();
        } catch (err) {
          console.log(err);
        }
      });
    });
  });
  describe('GET /api/current_user', () => {
    it('should send empty response of current user info IF USER IS NOT LOGGED IN', async done => {
      request.get(
        {
          // mock authentication
          url: 'http://localhost:5000/auth/fake',
          form: {}
        },
        (err, res, body) => {
          done();
        }
      );

      await request.get(`${base}api/current_user`, (err, res, body) => {
        try {
          console.log(body);
          expect(body.length).toBe(0);
          done();
        } catch (err) {
          console.log(err);
        }
      });
    });
  });
});
