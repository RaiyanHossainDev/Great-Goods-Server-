const mongoose = require('mongoose');

const cuponSchema = new mongoose.Schema({
    code: {
        type: String,
        default: null,
    },
    discount: {
        type: Number,
        default: null,
    }
} , { timestamps: true });

module.exports = mongoose.model('cupon', cuponSchema);