import express from 'express';
import { placeOrder, placeOrderRazor, placeOrderStripe, allOrders, userOrder, updateStatus, verifyStripe, verifyRazorpay } from '../controllers/orderController.js';
import adminAuth from "../middleware/adminAuth.js"
import authUser from "../middleware/auth.js"

const orderRouter = express.Router();

// ADMIN FEATURES
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/update', adminAuth, updateStatus);

// PAYMENT FEATURES
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazor);

// USER FEATURE
orderRouter.post('/userorder', authUser, userOrder);

// VERIFY PAYMENT
orderRouter.post('/verifyStripe', authUser, verifyStripe)
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay)

export default orderRouter;