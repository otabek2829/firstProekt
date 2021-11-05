const mongoose = require('mongoose')
const schema = mongoose.Schema

const dbProduct = new schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String
    },
    comment: {
        type: String,
        default: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
    },
    dataTime: {
        type: Date,
        default: Date.now(),
    },
    director_id: schema.Types.ObjectId,
    img: {
        type: String
    }

})

module.exports = mongoose.model('Product', dbProduct)

