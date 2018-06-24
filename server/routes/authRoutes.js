const passport = require('passport');
const keys = require('../config/keys');
const path = require('path');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.sendFile(path.resolve(__dirname, 'login.html'));
      // res.redirect(keys.homePage);
      // res.send();
      // res.redirect(keys.homePage);
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.sendFile(path.resolve(__dirname, 'logout.html'));
    // res.redirect(keys.homePage);
    // res.send();
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
