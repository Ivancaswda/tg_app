import userModel from "../models/userModel.js";
import messageModel from "../models/messageModel.js";
import {v2 as cloudinary} from 'cloudinary'
import {getReceiverSocketId, io} from "../middlewares/socket.js";
const getUsersForSidebar = async (request, response) => {
    try {
        const loggedInUserId = request.user._id;
        const filteredUsers = await userModel.find({_id: {$ne:loggedInUserId}}).select('-password')
        response.json({success:true, filteredUsers})
    }catch (error) {
        console.error('Error in get-Users-for-sidebar', error.message)
        response.json({success:false, message: error.message})
    }
}

const getMessages = async (request, response) => {
    try {
        const {id:userToChatId} = request.params
        const myId = request.user._id;

        const messages = await messageModel.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        })
        console.log(messages)

        response.json({success:true, messages})
    } catch (error) {
        response.json({success:false, message:response.message})
    }
}

const sendMessages = async (request, response) => {
    try {
        const {text, image} = request.body
        const {id:receiverId} = request.params
        const senderId = request.user._id
        let imageUrl

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new messageModel({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })

        await newMessage.save()

        const receiverSocketId = getReceiverSocketId(receiverId) // giving socket id of the user from params

        if (receiverSocketId) { // if user is online we`re sending message in real time without need to refresh page
            io.to(receiverSocketId).emit('newMessage', newMessage)
        }

        response.json({success:true, newMessage})
    } catch (error) {
        response.json({success:false, message:response.message})
    }
}


export {getUsersForSidebar, getMessages, sendMessages}