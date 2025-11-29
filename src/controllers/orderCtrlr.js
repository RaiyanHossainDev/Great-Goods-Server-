const { randomNum } = require("../helpers/allGenerators");
const mailer = require("../helpers/mailer");
const { purchaseDetailsTemplate } = require("../helpers/mailTemplates");
const cartModel = require("../models/cartModel");
const cuponModel = require("../models/cuponModel");
const orderModel = require("../models/orderModel");


const order = async (req, res) => {
    try {
        const { name, phone, address, email, district, cartId, cuponCode, comment } = req.body;

        if (!name || !phone || !address || !email || !district || !cartId) return res.status(400).send('All fields are required');
        
        // =============== Fetching Models
        // Fetch Cart
        const cart = await cartModel.findById(cartId).populate('products.productId', 'productPrice discountPrice productName');
        if (!cart) return res.status(404).send('Cart not found');
        // Fetch Cupon
        const cupon = await cuponModel.findOne({ code: cuponCode });


        // Calculate shipping cost
        let shippingCost = 80;
        if (district.toLowerCase() !== 'dhaka') shippingCost = 120;
        
        // Calculate total amount
        let subtotal;
        let totalAmount = cart.products.reduce((sum , no) => {
            const price = no.productId.discountPrice || no.productId.price;
            return sum + (price * no.qty);
        }, 0);
        subtotal = totalAmount
        totalAmount = (totalAmount + shippingCost) - (cupon ? cupon.discount : 0);

        // Create Order ID
        const orderId = randomNum();

        // Create Order Date
        const orderDate = new Date();

        // Save Order to Database
        await new orderModel({
            name,
            phone,
            address,
            email,
            district,
            comment: comment || null,
            cuponCode: cupon ? cupon.code : null,
            shippingCost,
            cartId,
            totalAmount,
            orderId,
            orderDate
        }).save();

        // Send Purchase Details Email
        mailer(email, "Your Purchase Details", purchaseDetailsTemplate(orderId, orderDate.toDateString(), name, address, cart.products, totalAmount, subtotal, shippingCost, cupon ? cupon.discount : 0,));

        res.status(201).send("Order placed successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to create order' });
    }
}

module.exports = {
    order
};