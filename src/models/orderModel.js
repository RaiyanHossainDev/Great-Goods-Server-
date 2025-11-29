const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        default: null
    },
    cartId: {
        type: mongoose.Schema.ObjectId,
        ref: 'cart',
        required: true
    },
    cuponCode: {
        type: String,
        default: null
    },
    shippingCost: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    deliveryStatus: {
        type: String,
        default: 'Processing',
        enum: ['Processing', 'Shipping', 'OutForDelivery',"Shipped" , 'Cancelled']
    },
    orderId: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('order', orderSchema);