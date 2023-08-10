import { asyncError } from "../middleware/errorMiddleware.js"
import { User } from "../models/User.js"
import { Order } from '../models/Order.js'

export const myProfile = (req, res, next) => {
    res.status(200).json({
        success: true,
        user: req.user
    })
}

export const logout = (req, res, next) => {
    req.session.destroy((error) => {
        if (error) return next(error)
        res.clearCookie("connect.sid")
        res.status(200).json({
            message: "Logout"
        })
    })
}

// for admin
export const getAllUsersList = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        success: true,
        users,
    });
}

export const getOrderStats = asyncError(async (req, res, next) => {

    const userCount = await User.countDocuments();
    const Orders = await Order.find({});

    const preparingOrder = Orders.filter((i) => i.orderStatus === 'Preparing')
    const shippedOrder = Orders.filter((i) => i.orderStatus === 'Shipped')
    const deliveredOrder = Orders.filter((i) => i.orderStatus === 'Delivered')

    let totalIncome = 0;

    Orders.forEach((i) => {
        totalIncome = totalIncome + i.totalAmount
    })
    res.status(200).json({
        success: true,
        userCount,
        orderCount: {
            total: Orders.length,
            preparingOrder: preparingOrder.length,
            shippedOrder: shippedOrder.length,
            deliveredOrder: deliveredOrder.length
        },
        totalIncome
    })

})