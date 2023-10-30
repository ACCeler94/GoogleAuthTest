const express = require('express');
const router = express.Router();

// middleware to check if user is logged
function isLogged(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/user/no-permission');
  }
}

router.get('/logged', isLogged, (req, res) => {
  res.render('logged', { user: req.user });
});

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

router.get('/profile', isLogged, (req, res) => {
  res.render('profile');
});

router.get('/profile/settings', isLogged, (req, res) => {
  res.render('profile-settings');
});

router.get('/logged/auth.logout', isLogged, (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;