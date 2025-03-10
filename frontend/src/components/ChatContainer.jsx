import React, {useEffect, useRef, useState} from 'react'
import {useChatStore} from "../store/useChatStore.js";
import {useAuthStore} from "../store/useAuthStore.js";
import ChatHeader from "./ChatHeader.jsx";
import {Loader} from "lucide-react";
import MessageInput from "./MessageInput.jsx";
import {useLocation} from "react-router-dom";


const ChatContainer = () => {

    const {messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages, } = useChatStore()
    const {authUser, imageProfilePic, setImageProfilePic} = useAuthStore()
    const [userDown, setUserDown] = useState(false)
    const [chooseTheme, setChooseTheme] = useState(false)
    const messageEndRef = useRef(null)
    const location = useLocation()
    useEffect(() => {
            console.log(selectedUser._id)
            getMessages(selectedUser._id)
            subscribeToMessages()
            console.log(imageProfilePic)

        return () => unsubscribeFromMessages()
    }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages])

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])
    if (isMessagesLoading) {
        return (
            <div className='w-full flex items-center justify-center h-[100vh]'>
                <Loader  className='size-10 animate-spin text-blue-500' />
            </div>
        );
    }

    const getUserAvatar = (user) => {
        if (imageProfilePic || user.profilePic || JSON.parse(localStorage.getItem('avatarImage'))) {
            return <img src={JSON.parse(localStorage.getItem('avatarImage')) || user.profilePic || imageProfilePic } className='object-cover w-full h-full' alt="Avatar" />;
        }
        return (
            <div className="w-[40px] h-[40px] bg-blue-600 flex items-center justify-center rounded-full">
                <h1 className="text-white text-lg">
                    { user?.fullName?.charAt(0).toUpperCase() || "?"}
                </h1>
            </div>
        );
    };
    const getSelectedUserAvatar = (user) => {
        if (user.profilePic) {
            return <img src={user.profilePic} className='object-cover w-full h-full' alt="Avatar" />;
        }
        return (
            <div className="w-[40px] h-[40px] bg-blue-600 flex items-center justify-center rounded-full">
                <h1 className="text-white text-lg">
                    { user?.fullName?.charAt(0).toUpperCase() || "?"}
                </h1>
            </div>
        );
    };

    return (
        <div  className=' w-full sm:flex-1  flex flex-col overflow-auto'>
            <ChatHeader userDown={userDown} setUserDown={setUserDown} chooseTheme={chooseTheme} setChooseTheme={setChooseTheme}/>
            <div  onClick={() => {
                setChooseTheme(false)
                setUserDown(false)
            }} className='w-full sm:flex-1 overflow-y-auto p-4 space-y-4 mb-20'>
                {messages?.length > 0 ? (
                    messages.map((message, index) => (
                        <div key={index}
                             className={`chat ${message.senderId === authUser?._id ? 'chat-end ' : 'chat-start'} `}
                             ref={messageEndRef}>
                                <div className="chat-image avatar">
                                    <div className="size-10 rounded-full border">
                                        {message.senderId === authUser?._id
                                            ? getUserAvatar(authUser)
                                            : getSelectedUserAvatar(selectedUser)}
                                    </div>
                                </div>
                                <div className='chat-header mb-1'>
                                    <time className='text-xs opacity-50 ml-1'>
                                        {new Date(message.createdAt).toLocaleTimeString()}
                                    </time>
                                </div>

                            <div className={`chat-bubble flex flex-col ${message.senderId === authUser?._id && 'light:bg-blue-50'}`}>
                                {message.image && (
                                    <img src={message.image} className='sm:max-w-[200px] rounded-md mb-2' alt=""/>
                                )}
                                {message.text && <p>{message.text}</p>}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center mt-10 h-100">Сообщений пока нет</p>
                )}
            </div>
            <MessageInput messageEndRef={messageEndRef} />

        </div>

    )
}
export default ChatContainer
