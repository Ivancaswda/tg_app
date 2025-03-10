import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";

const generateToken = (userId, response) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })

    response.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development'
    })

    console.log(token)

    return token
}
export default generateToken