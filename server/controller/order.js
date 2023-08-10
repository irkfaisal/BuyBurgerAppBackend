import { Order } from '../models/Order.js'
import ErrorHandler from '../utils/ErrorHandler.js';
import { asyncError } from '../middleware/errorMiddleware.js';

// for users
// place an order by COD
export const placeOrder = asyncError(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentMethod, itemsPrice, taxPrice, shippingCharges, totalAmount } = req.body;

    const user = req?.user?._id;
    // const user = '64d1f23800aca30b9c98a9e2'

    const orderOptions = {
        shippingInfo,
        orderItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
        user,
    };
    await Order.create(orderOptions)
    res.status(200).json({
        success: true,
        message: "Order placed successfully via cash on delivery"
    })
})

// get All orders details of particular user
export const getMyOders = asyncError(async (req, res, next) => {
    const order = await Order.find({
        user: req.user._id
    }).populate("user", "name")
    res.status(200).json({
        success: true,
        order
    })
})

// get order deatils by order ID
export const getOrderByID = asyncError(async (req, res, nexr) => {
    const order = await Order.findById(req.params.id).populate("user", "name");

    if (!order) return next(new ErrorHandler("Invalid Order Id", 404));

    res.status(200).json({
        success: true,
        order,
    });
})

// for admin
// get All orders details
export const getOdersDetails = asyncError(async (req, res, next) => {
    const order = await Order.find({}).populate("user", "name")
    res.status(200).json({
        success: true,
        order
    })
})

export const getOderDeatilsByID = asyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) return next(new ErrorHandler("Invalid Order Id", 404));

    if (order.orderStatus === "Preparing") order.orderStatus = "Shipped";
    else if (order.orderStatus === "Shipped") {
        order.orderStatus = "Delivered";
        order.deliveredAt = new Date(Date.now());
    } else if (order.orderStatus === "Delivered")
        return next(new ErrorHandler("Food Already Delivered", 400));

    await order.save();

    res.status(200).json({
        success: true,
        message: "Status Updated Successfully",
    });
})

