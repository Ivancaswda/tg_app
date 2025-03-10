import React, {useEffect, useState} from 'react'
import Navbar from "./Navbar.jsx";
import {useChatStore} from "../store/useChatStore.js";
import {useAuthStore} from "../store/useAuthStore.js";
import {Users} from "lucide-react";
import {useThemeStore} from "../store/useThemeStore.js";


const Sidebar = ({profileData, setProfileData}) => {
    const [openBurger, setOpenBurger] = useState(false)

    const [inputValue, setInputValue] = useState('')
    const {getUsers, users, selectedUser, isUsersLoading, setSelectedUser} = useChatStore()
    const {theme} = useThemeStore()
    const {onlineUsers} = useAuthStore();
    // filtering online users by toggle
    const [showOnlineOnly, setShowOnlineOnly] = useState(false)
    useEffect(() => {
        getUsers()
        console.log(users)
    }, [getUsers])

// VERSATILE FILTRATION
    const filteredUsers = users.filter((user) => {
            return !showOnlineOnly || onlineUsers.includes(user._id); //  // Если активен "Пользователи в сети", оставляем только onlineUsers
        }).filter((user) => {
            return user.fullName.toLowerCase().includes(inputValue.toLowerCase()); // Фильтруем по поисковому запросу (независимо от онлайн-статуса)
        });


    const getUserAvatar = (user) => {

        if (user.profilePic) {
            return <img className='w-[40px] h-[40px] object-cover' src={user.profilePic} alt="user icon"/>
        }

        return (
            <div className="w-[40px] h-[40px] bg-blue-600 flex items-center justify-center rounded-full">
                <h1 className="text-white text-lg">
                    {user?.fullName?.charAt(0).toUpperCase() || "?"}
                </h1>
            </div>
        )


    }

    return (

        <div  className={` fixed top-0 left-0 h-screen w-[100%] sm:w-[44%] md:w-[34%] lg:w-[26%] border-r border-base-300  flex flex-col  `}>
            <Navbar profileData={profileData} setProfileData={setProfileData} openBurger={openBurger} setOpenBurger={setOpenBurger} inputValue={inputValue} setInputValue={setInputValue}/>
            <aside
                className={`   h-full w-full  border-r overflow-y-auto border-base-300 flex-col transition-all duration-200`}>
                <div className='border-b border-base-300 w-full p-5'>
                    <div className='flex items-center gap-2'>

                        <Users size={16}/>
                        <span className='font-medium block'>Контакты</span>

                    </div>

                    {/* Online users filtered by toggle */}
                    <div className='mt-3  flex items-center gap-2'>
                        <label className='cursor-pointer flex items-center gap-2'> {/* TOGGLE OF ONLINE OFF OR ON */}
                            <input type="checkbox" className='checkbox checkbox-sm' checked={showOnlineOnly}
                                   onChange={(event) => setShowOnlineOnly(event.target.checked)}
                            />
                            <span className='text-sm'>Пользователи  в сети</span>
                        </label> {/* don`t count myself*/}
                        <span className='text-xs text-green-600'>({onlineUsers.length - 1} В сети)</span>
                    </div>
                </div>
                <div className='overflow-y-auto w-full py-3 '>

                    {filteredUsers?.length > 0 ? (filteredUsers.map((user, index) => (
                        <button key={index} onClick={() => setSelectedUser(user)}
                                className={`w-full p-3 flex  items-left gap-3 rounded-xl hover:bg-blue-50 transition-colors ${selectedUser?._id === user._id ? 'bg-blue-100 ring-1 ring-base-300' : ''} `}>

                            <div className='relative  sm:mx-0 rounded-full'>
                                {getUserAvatar(user)}
                                {onlineUsers.includes(user._id) && (
                                    <span
                                        className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900'>

                                </span>
                                )}
                            </div>

                            {/* User info - only visible on larger screens */}
                            <div className=' w-80  text-left min-w-0'>
                                <div className='font-medium truncate flex items-center gap-2'>{user.fullName}{user?.isPremium &&
                                    <img src="https://web.telegram.org/a/PremiumLogo.a5c0e88cd478f4d76d82.svg" className='w-4' alt=""/>}</div>
                                <div className='text-sm text-zinc-400'>
                                    {onlineUsers.includes(user._id) ? 'В сети' : 'Оффлайн'}
                                </div>
                            </div>
                            <div>

                            </div>

                        </button>
                    ))) : (<div>Пользователи не найдены</div>)}
                </div>
            </aside>
        </div>
    )
}
export default Sidebar
