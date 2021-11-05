const dbRegister = require('../model/Register') 
module.exports = {
  //royhatdan o'tgan 
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('danger', 'Hali Tizimga Kirmagansiz')
    res.redirect('/register/login');
  },


  //royhatdan o'tmagansz 
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/user');
  },

  // Login skaner qilish
  loginScaner: function (req, res, next) {
    dbRegister.find({ 'login': req.body.login }, (err, data) => {
      if (data) {
        return next()
      } else {
        req.flash('danger', 'bunday Login Ro\yhatdan o\'tmagan')
        res.redirect('/')
      }
    })
  }
};