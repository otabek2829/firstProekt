var express = require('express');
const bcrypt = require('bcryptjs'); // Parolni Hashlash uchun
const { check, validationResult } = require('express-validator') // Xatolikni Topib va xabar yuborish uchun
const passport = require('passport');
const dbRegister = require('../model/Register') // client ro'yhatdan o'tish uchun sxemasi
var router = express.Router();
const { forwardAuthenticated, ensureAuthenticated, loginScaner } = require('../middleware/auth');
/* GET users listing. */
router.get('/', forwardAuthenticated, (req, res) => {
  res.render('register', {
    title: 'Ro\'yhatdan o\'tish'
  })
});
router.post('/', [
  check("names", "Name Kiriting").notEmpty(),
  check("login", "Login Kiriting").notEmpty(),
  check("phone", "Phone Kiriting").notEmpty(),
  check("password", "Parol Kiriting").notEmpty(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.render('register', {
      title: "Ro\'yhatdan O\'tish",
      errors: errors.array()
    })
  } else {
    try {
      const db = await new dbRegister({
        names: req.body.names,
        login: req.body.login,
        phone: req.body.phone,
        password: req.body.password

      })
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(db.password, salt, function (err, hash) {
          if (err) {
            console.log(err);
          } else {
            db.password = hash
            db.save((err) => {
              if (err) {
                console.log(err);
              } else {
                req.flash('success', "Siz Omadli Ro\'yhatdan o\'tdingiz")
                res.redirect('/')
              }
            })
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
})
// Login Page 
router.get('/login', forwardAuthenticated, (req, res) => {
  res.render('login', {
    title: 'Sign Up'
  })
})
//Login Post
router.post('/login', forwardAuthenticated, (req, res, next) => {
  if (req.body.login === '' || req.body.password === '') {
    req.flash('danger', 'Bo\'sh qoldirish mumkin emas');
    res.redirect('/register/login')
  } else {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/register/login',
      failureFlash: "Xatolik bor Yaxshilab Qarang",
      successFlash: "Tizimga Muvafaqqiyatli Kirdingiz"
    })(req, res, next)
  }
})
// Logout
router.get('/logout', ensureAuthenticated, (req, res) => {
  req.logout();
  req.flash('success', 'Siz Tizimdan Chiqib Ketdingiz');
  res.redirect('/');
});

module.exports = router;


