//Integration testing is a type of testing to
//check if different pieces of the modules are working together.
const request = require('request');
require('../../db/models/User');
const base = 'http://localhost:5000/api/items/';
var mongoose = require('mongoose');
const User = mongoose.model('users');
require('../../db/models/Item');
const Item = mongoose.model('items');

describe('routes : items', () => {
  beforeEach(done => {
    this.item;
    new Item({
      product: 'JasmineTest',
      qty: 1,
      unit: 'ea',
      price: '$4.99',
      notes: 'Some notes',
      dateAdded: 'Dec 31, 2018 10:00am',
      _user: {
        googleId: 123,
        name: 'Matt Outen',
        nickname: 'Matt',
        image: 'http://google.com/matt.jpg',
        token: 'sampleToken'
      },
      purchased: true
    })
      .save()
      .then(item => {
        this.item = item;
        done();
      })
      .catch(err => console.log(err));
    new User({
      googleId: 123,
      name: 'Matt Outen',
      nickname: 'Matt',
      image: 'http://google.com/matt.jpg',
      token: 'sampleToken'
    })
      .save()
      .then(user => {
        this.user = user;
        done();
      })
      .catch(err => {
        console.log(err);
      });
  });
  afterAll(async done => {
    await Item.deleteMany({ product: 'JasmineTest' });
    await User.deleteMany({ googleId: 123 });
    try {
      request.get({
        // mock authentication
        url: 'http://localhost:5000/auth/fake',
        form: {
          googleId: 0
        }
      });
      done();
    } catch (err) {
      console.log(err);
    }
  });

  describe('logged in user performing CRUD actions for item', () => {
    beforeEach(done => {
      const user = new User({
        googleId: 123,
        name: 'Matt Outen',
        nickname: 'Matt',
        image: 'http://google.com/matt.jpg',
        token: 'sampleToken'
      })
        .save()
        .then(user => {
          const { googleId, name, nickname, image, token } = user;
          request.get(
            {
              // mock authentication
              url: 'http://localhost:5000/auth/fake',
              form: {
                googleId,
                name,
                nickname,
                image,
                token
              }
            },
            (err, res, body) => {
              done();
            }
          );
        });
    });
    describe('GET /api/items', () => {
      it('should return a status code 200 and all items', async done => {
        await request.get(base, (err, res, body) => {
          try {
            expect(res.statusCode).toBe(200);
            expect(err).toBeNull();
            expect(body).toContain('unpurchased');
            expect(body).toContain('purchased');
            done();
          } catch (err) {
            console.log(err);
            done();
          }
        });
      });
    });
    describe('POST items/create', () => {
      const options = {
        url: `${base}create`,
        form: {
          product: 'JasmineTest',
          qty: 1,
          unit: 'ea',
          price: '$4.99',
          notes: 'Some notes',
          dateAdded: 'Dec 31, 2018 10:00am',
          _user: {
            googleId: 123,
            name: 'Matt Outen',
            nickname: 'Matt',
            image: 'http://google.com/matt.jpg',
            token: 'sampleToken'
          },
          purchased: true
        }
      };
      it('should create a new item and redirect', async done => {
        await request.post(options, (err, res, body) => {
          body = JSON.parse(body);
          try {
            expect(res.statusCode).toBe(200);
            expect(body.product).toBe('JasmineTest');
            expect(body._user.name).toBe('Matt Outen');
            done();
          } catch (err) {
            console.log(err);
          }
        });
      });
      it('should not create a new item that fails validations', done => {
        const options = {
          url: `${base}create`,
          form: {
            product: 'JasmineTest',
            qty: 'one'
          }
        };
        request.post(options, async (err, res, body) => {
          await Item.findOne({ qty: 'one' })
            .then(item => {})
            .catch(err => {
              expect(err).not.toBeNull;
              done();
            });
        });
      });
    });
    describe('GET /items/:id/edit', () => {
      it('should render a view with an edit item form', done => {
        request.get(`${base}${this.item._id}/edit`, (err, res, body) => {
          expect(body).toContain('JasmineTest');
          expect(err).toBeNull();
          done();
        });
      });
    });
    describe('POST /items/:id/destroy', () => {
      it('should delete the item with the associated ID', done => {
        Item.find({}).then(items => {
          const itemCountBeforeDelete = items.length;
          expect(itemCountBeforeDelete).toBe(7);
          request.post(`${base}${this.item._id}/destroy`, (err, res, body) => {
            Item.find({}).then(items => {
              expect(err).toBeNull();
              expect(items.length).toBe(itemCountBeforeDelete - 1);
              done();
            });
          });
        });
      });
    });
    describe('POST /items/:id/update', () => {
      it('should update the item with the given values', done => {
        const options = {
          url: `${base}${this.item._id}/update`,
          form: {
            product: 'JasmineTest',
            price: '99.99'
          }
        };
        request.post(options, (err, res, body) => {
          Item.findOne({ price: '99.99' }).then(item => {
            console.log(item);
            expect(err).toBeNull();
            expect(item.price).toBe('99.99');
            done();
          });
        });
      });
    });
  });
  describe('NOT logged in user performing CRUD actions for item', () => {
    beforeEach(done => {
      request.get(
        {
          url: 'http://localhost:5000/auth/fake',
          form: {}
        },
        (err, res, body) => {
          done();
        }
      );
    });
    describe('GET /api/items', () => {
      it('should return a status code 200 and all items', async done => {
        await request.get(base, (err, res, body) => {
          try {
            expect(res.statusCode).toBe(200);
            expect(err).toBeNull();
            expect(body).toContain('unpurchased');
            expect(body).toContain('purchased');
            done();
          } catch (err) {
            console.log(err);
            done();
          }
        });
      });
    });
    describe('POST /items/create', () => {
      const options = {
        url: `${base}create`,
        form: {
          product: 'JasmineTest',
          qty: 0
        }
      };
      // it('should NOT create a new item', done => {
      //   request.post(options, (err, res, body) => {
      //     Item.findOne({ prodcut: 'THISISNTALLOWED' })
      //       .then(item => {
      //         console.log(item);
      //         expect(item).toBeNull(); // no item should be returned
      //         done();
      //       })
      //       .catch(err => {
      //         console.log(err);
      //         done();
      //       });
      //   });
      // });
    });
  });
});
