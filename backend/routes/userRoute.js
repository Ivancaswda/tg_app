import express from "express";
import {checkAuth, login, logout, signup, updateImage, updateProfile} from "../controllers/userController.js";
import {protectRoute} from "../middlewares/authMiddleware.js";
import {stripePayment, verifyStripe} from "../controllers/premiumController.js";



const userRouter = express.Router()

userRouter.post('/signup', signup)

userRouter.post('/login', login)

userRouter.post('/logout', logout)

userRouter.post('/update-profile', protectRoute, updateProfile)

userRouter.put('/update-image', protectRoute,    updateImage)

userRouter.post('/premium-payment', protectRoute,stripePayment)

userRouter.post('/verify-payment', protectRoute, verifyStripe)

userRouter.get('/check',protectRoute, checkAuth)

export default userRouter