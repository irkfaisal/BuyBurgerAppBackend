import express from 'express'
import passport from 'passport';
import { myProfile, logout, getAllUsersList, getOrderStats } from '../controller/userProfile.js';
import { authorizeAdmin, isAutheticateed } from '../middleware/auth.js';



const router = express.Router()

router.get('/googleAuth',
    passport.authenticate("google", {
        scope: ["profile"],
    })
);

router.get("/login", passport.authenticate("google"),
    (req, res, next) => {
        res.send('Logged in ')
    }
);

router.get('/me', isAutheticateed, myProfile)
router.get('/logout', logout)


// admin route
router.get('/admin/userslist', isAutheticateed, authorizeAdmin, getAllUsersList)
router.get('/admin/getStats', isAutheticateed, authorizeAdmin, getOrderStats)


export default router;