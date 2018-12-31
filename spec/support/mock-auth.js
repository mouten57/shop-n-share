module.exports = {
  fakeIt(app) {
    console.log('fake');
    let googleId, name, nickname, image, token;

    function middleware(req, res, next) {
      googleId = req.body.googleId || googleId;
      name = req.body.name || name;
      nickname = req.body.nickname || nickname;
      image = req.body.image || image;
      token = req.body.token || token;

      if (googleId && googleId != 0) {
        req.user = {
          googleId,
          name,
          nickname,
          image,
          token
        };
      } else if (googleId == 0) {
        res.locals.currentUser = req.user;
      }

      if (next) {
        next();
      }
    }

    function route(req, res) {
      res.redirect('/');
    }

    app.use(middleware);
    app.get('auth/fake', route);
  }
};
