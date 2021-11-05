const express = require('express');
const router = express.Router();
const dbUser = require('../model/Register')
const dbProduct = require('../model/Product')
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth')

// Welcome Page
router.get('/',  (req, res) => {
  const promise = dbProduct.find({})
  promise.then(data => {
    res.render('index', {
      title: 'Bosh Sahifa',
      db: data
    })
  })
    .catch(err => {
      console.log(err);
    })
});

// Dashboard
router.get('/user', ensureAuthenticated, (req, res) =>
  res.render('user', {
    title: 'User ',
    data: req.user
  })
);

router.get('/admin', ( req, res) => {
    res.render('admin',{
        title: 'ADMIN PANEL'
    })
})



module.exports = router;
