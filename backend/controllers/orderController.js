// import { currency } from "../../admin/src/App.jsx";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// GLOBAL VARIABLES
const currency = 'usd';
const deliveryCharges = 10;

// INITIALIZING THE PAYMENT GATEWAY
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


//  ORDER PLACED USING COD
const placeOrder = async (req, res) => {

    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            PaymentMethod: 'COD',
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
    try {

        const { userId, items, amount, address } = req.body;

        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            PaymentMethod: 'Stripe',
            payment: false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData);

        console.log(newOrder);
        
        await newOrder.save();

        const line_items = items.map((item, index) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: deliveryCharges * 100,
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        });

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// VERIFY STRIPE

const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {

        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })

            res.json({ success: true, message: "Payment successful" });
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment failed" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
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

export { placeOrder, placeOrderStripe, placeOrderRazor, allOrders, userOrder, updateStatus, verifyStripe };