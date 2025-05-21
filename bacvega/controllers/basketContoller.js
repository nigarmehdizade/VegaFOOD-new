import BasketModel from "../models/basketModel.js";

const getBasket = async (req, res) => {
    const basket = await BasketModel.find()
    res.json(basket)
}

const postBasket = async (req, res) => {
    const {image, name, price} = req.body
    const basket = {image, name, price, count: 1} 
    await BasketModel.create(basket)
    res.json(basket)
}

const deleteBasket = async (req, res) => {
    const {id} = req.params
    await BasketModel.findByIdAndDelete(id)
    res.json({message: 'Product deleted'})
    console.log('Product deleted with', id)
}
const updateBasketCount = async (req, res) => {
    const { id } = req.params;
    const { count } = req.body;

    try {
        const updated = await BasketModel.findByIdAndUpdate(id, { count }, { new: true });
        if (!updated) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(updated);
    } catch (err) {
        console.error("Error updating count:", err);
        res.status(500).json({ message: "Error updating count" });
    }
};


export {getBasket, postBasket, deleteBasket,updateBasketCount}
