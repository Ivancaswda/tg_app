import jwt from 'jsonwebtoken'

import cookieParser from 'cookie-parser'
import userModel from "../models/userModel.js";





const protectRoute = async (request, response, next) => {
    try {
        const token = request.cookies.jwt;

        if (!token) {
            return response.json({success:false, message: 'Unauthorized - No token provided'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return response.json({success:false, message: 'Unauthorized - Invalid token'})
        }

        const user = await userModel.findById(decoded.userId) // finding the user

        if (!user) {
            return  response.json({success:false, message: 'User isn`t found ' })
        }

        request.user = user

        next()

    } catch (error) {
        return  response.json({success:false, message: ''})
    }
}
export {protectRoute}
