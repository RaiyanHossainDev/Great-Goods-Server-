const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    products:[
        {
            productId:{
                type: mongoose.Schema.ObjectId,
                ref: 'product',
                required: true
            },
            qty:{
                type: Number,
                default: 1
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('cart', cartSchema);