const express = require('express');
const dbProduct = require('../model/Product')
const filterImg = require('../middleware/uploadImg')
const router = express.Router();
const dbUser = require('../model/Register')

router.get('/', (req, res) => {
    res.render('product', {
        title: 'Mahsulot Qo\'shish',
        btn: "Joylash"
    })
})
// Elon Joylash Get Backend
router.post('/', filterImg.single("img"), (req, res) => {
    const db = new dbProduct({
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        comment: req.body.comment,
        director_id: req.user.id,
        img: req.file.filename
    })
    db.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/user')
        }
    })
})
// Mening Elonlarim Get Frontend
router.get('/poster', (req, res) => {
    const promise = dbProduct.find({ director_id: req.user.id })
    promise.then((data) => {
        res.render('userPoster', {
            title: 'Mening E\'lonlarim',
            db: data
        })
    })
        .catch((err) => {
            console.log(err)
        })
})
// More Product is Id
router.get('/more/:id', (req, res) => {
    dbProduct.findById(req.params.id, (err, data) => {
        const id = data.director_id
        dbUser.findById({ _id: id }, (err, match) => {
            if (err) {
                console.log(err)
            } else {
                try {
                    res.render('more', {
                        title: 'Mahsulot Haqida Ba\'tafsil',
                        data,
                        match
                    })
                } catch (error) {

                }
            }
        })

    })

})
//  UserPoster ID IN Update 
/// Working one's card product EDIT method of GET

router.get('/update/:id', (req, res) => {
    dbProduct.findById(req.params.id, (err, data) => {
        console.log(data);
        try {
            res.render("update" , {
                title: "Mahsulot o'zgartirish",
                data,
                btn: "O'zgartirish",
А            })
        } catch (error) {
            console.log(error);
        }
    })
})
router.post('/update/:id', filterImg.single("img"), async (req, res) => {
    const db = {
        title: req.body.title,
        price: req.body.price,
        comment: req.body.comment,
        category: req.body.category,
        img: req.file.filename,
    }
    try {
        const ids = { _id: req.params.id }
        await dbProduct.findByIdAndUpdate(ids, db)
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
})

router.get('/userAllPoster/:id', (req, res) => {
    dbProduct.findById(req.params.id, (err, data) => {
        const id = data.director_id
        dbUser.findById({ _id: id }, (err, match) => {
            if (err) {
                console.log(err)
            } else {
                const Id = match.id
                dbProduct.find({ director_id: Id }, (err, post) => {
                    try {
                        res.render('userAllPoster', {
                            title: 'Hammasi ',
                            db: post
                        })
                    } catch (error) {
                        console.log(error)
                    }
                })
            }
        })

    })
})









// UserPoster ID IN Delete  
router.get('/delete/:id', async (req, res) => {
    try {
        const id = { _id: req.params.id }
        await dbProduct.findByIdAndDelete(id)
        req.flash('success', "Muvaffaqiyatli o'chirildi")
        res.redirect('/card/poster/')
    } catch (error) {
        console.log(error);
    }
})
module.exports = router