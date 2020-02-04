module.exports = {
  init(app) {
    const mockAuth = require('../spec/support/mock-auth');
    mockAuth.fakeIt(app);

    require('../routes/authRoutes')(app);

    require('../routes/itemRoutes')(app);
  }
};
