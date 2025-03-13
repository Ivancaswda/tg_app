import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import connectDB from "./middlewares/mongodb.js";
import connectCloudinary from "./middlewares/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRouter.js";
import {app, server} from "./middlewares/socket.js";
////////////////////////////////////////
import path from 'path'



const PORT = process.env.PORT || 1120
dotenv.config()
const __dirname = path.resolve()
connectCloudinary()
app.use(cors({
    origin: ['http://localhost:2020'], // Укажи конкретный фронтенд-URL
    credentials: true // Включает поддержку кук и заголовков авторизации))
}))






app.use(express.json())
app.use(cookieParser())
app.use('/api/user', userRouter)
app.use('/api/message', messageRouter)
app.get('/', (request, response) => response.send('Api работает'))

if (process.env.NODE_ENV=== "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}


server.listen( PORT,async () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
    await connectDB()
})