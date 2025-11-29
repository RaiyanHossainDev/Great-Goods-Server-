const cuponModel = require("../models/cuponModel");

// ================ CREATE CUPON ===================
const createCupon = async (req, res) => {
    try {
        const { code, discount } = req.body;

        if (!code || !discount) return res.status(404).send("All fields are required");
        
        const existingCupon = await cuponModel.findOne({ code: code });
        if (existingCupon) return res.status(409).send("Cupon code already exists");

        await new cuponModel({ code, discount:Number(discount) }).save();

        res.status(201).send("Cupon created successfully");
    }
    catch (error) {
        console.error('Error creating cupon:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// ================ UPDATE CUPON ===================
const updateCupon = async (req, res) => {
    try {
        const { cuponId, code, discount } = req.body;

        if ( !cuponId ) return res.status(404).send("Cupon ID is required");
        
        const cupon = await cuponModel.findById(cuponId);
        if (!cupon) return res.status(404).send("Cupon not found");

        cupon.code = code || cupon.code;
        cupon.discount = discount ? Number(discount) : cupon.discount;

        await cupon.save();

        res.status(200).send("Cupon updated successfully");
    }
    catch (error) {
        console.error('Error updating cupon:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// =============== DELETE CUPON ===================
const deleteCupon = async (req, res) => {
    try {
        const { cuponId } = req.body;

        if ( !cuponId ) return res.status(404).send("Cupon ID is required");

        await cuponModel.findOneAndDelete({ _id: cuponId });

        res.status(200).send("Cupon deleted successfully");
    } catch (error) {
        console.error('Error deleting cupon:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}
// ================ EXPORTS ===================
module.exports = {
    createCupon,
    updateCupon,
    deleteCupon
};