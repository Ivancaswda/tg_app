import express from 'express'
import {getMessages, getUsersForSidebar, sendMessages} from "../controllers/messageController.js";
import {protectRoute} from "../middlewares/authMiddleware.js";

const messageRouter = express.Router()

messageRouter.get('/get-users', protectRoute, getUsersForSidebar)

messageRouter.get('/get/:id', protectRoute, getMessages)

messageRouter.post('/send/:id', protectRoute, sendMessages)

export default messageRouter