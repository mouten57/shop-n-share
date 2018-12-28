module.exports = {
  index(req, res, next) {
    res.send('Hello!');
  },
  about(req, res, next) {
    res.send('About');
  }
};
