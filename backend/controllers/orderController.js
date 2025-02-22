import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//  ORDER PLACED USING COD
const placeOrder = async (req, res) => {

    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        // MAKE CART EMPTY AFTER ORDER IS PLACED
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

//  ORDER PLACED USING STRIPE
const placeOrderStripe = async (req, res) => {

}

//  ORDER PLACED USING RAZOR PAY
const placeOrderRazor = async (req, res) => {

}

// ALL ORDER DATA FOR ADMIN PANEL
const allOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({});
        res.json({ success: true, orders });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

// USER ORDER DATA FOR FRONTEND
const userOrder = async (req, res) => {
    try {

        const { userId } = req.body;

        const userOrders = await orderModel.find({ userId });

        res.json({ success: true, userOrders });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// UPDATE ORDER STATUS FROM ADMIN PANEL
const updateStatus = async (req, res) => {
    try {

        const { orderId, status } = req.body;

        await orderModel.findByIdAndUpdate(orderId, { status });

        res.json({ success: true, message: "Status updated successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { placeOrder, placeOrderStripe, placeOrderRazor, allOrders, userOrder, updateStatus };