import userModel from "../models/userModel.js";



// ADD PRODUCT TO USERS CART
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        const userdata = await userModel.findById(userId);
        if (!userdata) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        let cartData = userdata.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }
        if (cartData[itemId][size]) {
            cartData[itemId][size]++;
        } else {
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

        res.json({ success: true, message: "Added to cart" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// UPDATE PRODUCTS OF CART
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userdata = await userModel.findById(userId);
        if (!userdata) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        let cartData = userdata.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Item updated" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// GET CART DATA
const getCartData = async (req, res) => {
    try {
        const { userId } = req.body;

        const userdata = await userModel.findById(userId);
        if (!userdata) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        let cartData = userdata.cartData || {};

        res.json({ success: true, cartData, message: "Cart data retrieved successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getCartData }