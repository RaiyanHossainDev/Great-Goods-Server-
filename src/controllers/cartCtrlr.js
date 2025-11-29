const cartModel = require("../models/cartModel");

// ==================== Add to Cart Controller ====================
const addToCart = async (req, res) => {
    const { products, userId } = req.body;

    const Cart = await cartModel.findOne({ userId });

    if (Cart) {
        products.forEach((item) => {
            const inCartProduct = Cart.products.find((product) => product.productId.toString() === item.productId);
            if (inCartProduct) {
                inCartProduct.qty += 1;
            }else {
                Cart.products.push(item);
            }
        })

        await Cart.save();
        return res.status(200).send("Product added to cart successfully");
    }
    
    await new cartModel({
        userId,
        products,
    }).save();

    res.status(200).send("Product added to cart successfully");
}
// =================== Delete from Cart Controller ====================
const deleteFromCart = async (req, res) => {
    const { productId, userId } = req.body;

    const cart = await cartModel.findOne({ userId });
    if (!cart) return res.status(404).send("Cart not found");

    const product = cart.products.find((product => product.productId.toString() === productId));
    if (!product) return res.status(404).send("Product not found in cart");

    if(product.qty > 1) {
        product.qty -= 1;
        await cart.save();
    } else {
        await cartModel.updateOne(
            { userId },
            { $pull: { products: { productId } } }
        );
    }

    res.status(200).send("Product removed from cart successfully");
}
// =================== Get Cart Products Controller ====================
const getCartProducts = async (req, res) => {
    const { userId } = req.params;

    const cart = await cartModel.findOne({ userId }).populate("products.productId"," productName thumbnailImage productPrice discountPrice productDescription");
    if (!cart) return res.status(404).send("Cart not found");

    const sum = cart.products.reduce((sum, no) => {
        const price = no.productId.discountPrice ? no.productId.discountPrice : no.productId.productPrice;
        return sum + (price * no.qty);
    },0);

    res.status(200).send({products: cart.products, totalAmount: sum});
}
// =================== Update Quantity Controller ====================
const updateQty = async (req, res) => {
    const { userId, productId, qty } = req.body;

    if (qty < 1) return res.status(400).send("Quantity must be at least 1");

    const cart = await cartModel.findOne({ userId });
    if (!cart) return res.status(404).send("Cart not found");

    cart.products.forEach((item) => {
        if (item.productId.toString() === productId) {
            item.qty = qty;
        }
    });

    await cart.save();
    res.status(200).send("Product quantity updated successfully");
}
// ==================== Exporting Modules ====================
module.exports = {
    addToCart,
    deleteFromCart,
    getCartProducts,
    updateQty,
};