module.exports = {
  validateItems(req, res, next) {
    if (req.method === 'POST') {
      req
        .checkBody('product', 'name must be at least 3 characters long')
        .isLength({ min: 3 });

      req.checkBody('qty', 'must be a  number').isNumeric();
    }
    const errors = req.validationErrors();
    if (errors) {
      console.log('error', errors);
      return res.redirect(303, req.headers.referer);
    } else {
      return next();
    }
  }
};
