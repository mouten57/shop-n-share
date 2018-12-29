const itemController = require('../controllers/itemController');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.get('/api/items', requireLogin, itemController.index);
  app.post('/api/items/create', requireLogin, itemController.create);
  app.post('/api/items/:id/destroy', itemController.destroy);
  app.get('/api/items/:id/edit', itemController.edit);
  app.post('/api/items/:id/update', itemController.update);
};
