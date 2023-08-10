import express from 'express'
import { authorizeAdmin, isAutheticateed } from '../middleware/auth.js';
import { getMyOders, getOderDeatilsByID, getOdersDetails, getOrderByID, placeOrder } from '../controller/order.js';

const router = express.Router()

// for users
router.post('/placeorder', isAutheticateed, placeOrder)
router.get('/myorder', isAutheticateed, getMyOders)
router.get('/myorder/:id', isAutheticateed, getOrderByID)

// for admin
// add admin middleware
router.get('/admin/orders', authorizeAdmin, getOdersDetails)
router.get('/admin/order/:id', authorizeAdmin, getOderDeatilsByID)

export default router
