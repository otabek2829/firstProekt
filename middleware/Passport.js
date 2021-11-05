const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const dbRegister = require('../model/Register')

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'login' }, (login, password, done) => {
    // Match user
    dbRegister.findOne({ login: login }).then(user => {
      if (!login) {
        return done(null, false);
      }

      // Parolni ochish tekshiruvdan o'tkazvotti
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          console.log(err);
        }
        if (match) {
          done(null, user)
        } else {
          done(null, false, { message: "Xato pasport js" })
        }
      })
      // bcrypt the end
    });
  })
  );
  passport.serializeUser(function (users, done) {
    done(null, users.id);
  });
  passport.deserializeUser(function (id, done) {
    dbRegister.findById(id, function (err, users) {
      done(err, users);
    });
  });
};






