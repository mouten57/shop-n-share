const itemController = require('../controllers/itemController');
const requireLogin = require('../middlewares/requireLogin');
const validation = require('./validation');

module.exports = app => {
  app.get('/api/items', itemController.index);
  app.post(
    '/api/items/create',
    requireLogin,
    validation.validateItems,
    itemController.create
  );
  app.post('/api/items/:id/destroy', requireLogin, itemController.destroy);
  app.get('/api/items/:id/edit', requireLogin, itemController.edit);
  app.post('/api/items/:id/update', requireLogin, itemController.update);
  app.post('/api/items/:id/purchase', requireLogin, itemController.purchase);
};
