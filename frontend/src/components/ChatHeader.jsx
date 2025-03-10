import React, {useEffect, useState} from 'react'
import {useAuthStore} from "../store/useAuthStore.js";
import {useNavigate} from "react-router-dom";
import {THEMES} from "../constants/index.js";
import {useThemeStore} from "../store/useThemeStore.js";
import {useChatStore} from "../store/useChatStore.js";


const ChatHeader = ({chooseTheme, setChooseTheme, userDown, setUserDown}) => {
    const {authUser, logout, authImage, setImageProfilePic, imageProfilePic} = useAuthStore()
    const {theme , setTheme} = useThemeStore()
    useEffect(() => {
        console.log(authUser)
        console.log(authImage)


    }, [authUser, authImage])
    const {selectedUser, setSelectedUser} = useChatStore()
    const navigate = useNavigate()
    const {showProfile, setShowProfile} = useChatStore()
    return (
        <div className='w-full p-2 flex items-center justify-between   '>
            <div onClick={() => {
                setSelectedUser(null)
            }} className={'p-2 hover:bg-gray-200 transition-all rounded-full'}>
                <svg width='18' height='18' xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 448 512">
                    <path fill='gray'
                        d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                </svg>
            </div>
            {authUser ? <div className='mt-4 mr-2 flex items-center  gap-2 relative'>


                {!JSON.parse(localStorage.getItem('avatarImage')) ? (<div onClick={() => setUserDown(!userDown)}
                                                                          className='w-[20px] h-[20px] bg-blue-600 p-4  rounded-full text-center flex items-center justify-center'>
                    <h1 className='text-white'>{authUser?.fullName?.charAt(0).toUpperCase()}</h1>
                </div>) : <img onClick={() => setUserDown(!userDown)}
                               className='w-[40px] h-[40px]  rounded-full object-cover '
                               src={JSON.parse(localStorage.getItem('avatarImage'))} alt=""/>}

                {userDown && (<div
                    className='flex w-[200px] z-20  flex-col  bg-blue-50 text-black  absolute right-0 rounded-xl top-10 py-4 px-4'>
                    <div className='text-sm font-semibold flex items-center gap-2 py-2'>
                        <svg width='16' height='16' xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <path fill='black'
                                  d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>
                        </svg>
                        <p>Настройки</p>
                    </div>
                    <div onClick={() => {
                        setShowProfile(true)
                    }} className='text-sm cursor-pointer font-semibold flex items-center gap-2 py-2'>
                        <svg width='16' height='16' xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 448 512">
                            <path
                                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
                        </svg>
                        <p>Профиль</p>
                    </div>
                    <div onClick={logout} className='cursor-pointer text-sm font-semibold flex items-center gap-2 py-2'>
                        <svg width='16' height='16' xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 496 512">
                            <path
                                d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"/>
                        </svg>
                        <p>Выйти</p>
                    </div>
                    <div className='text-center text-gray-400 text-xs font-semibold mt-2'>secured by <span
                        className='text-blue-500'>telegram</span></div>
                </div>)}

                <div className=' p-2'>

                    {theme === 'dark' ? (<svg className={`cursor-pointer`} onClick={() => {
                        setChooseTheme(!chooseTheme)
                    }} width='18' height='18' xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 384 512">
                        <path fill='white'
                              d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/>
                    </svg>) : (
                        <svg onClick={() => {
                            setChooseTheme(!chooseTheme)
                        }} className={`cursor-pointer`} width='18' height='18' xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <path fill={``}
                                  d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/>
                        </svg>
                    )}
                </div>
                {chooseTheme && (<div
                    className='flex w-[120px]  flex-col z-20 gap-4  bg-stone-50 text-black right-0  absolute  rounded-xl top-10 py-4 px-4'>
                    {THEMES.map((Theme) => (
                        <div onClick={() => setTheme(Theme)} data-theme={Theme}
                             className='flex items-center gap-2 cursor-pointer px-2 py-1 rounded-lg'>
                            {Theme === 'dark' ? (
                                <svg width='18' height='18' xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 384 512">
                                    <path fill='white'
                                          d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/>
                                </svg>
                            ) : (
                                <svg className={``} width='18' height='18' xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 512 512">
                                    <path fill={``}
                                          d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/>
                                </svg>
                            )}
                            <p className='font-semibold text-sm '>{Theme === 'light' ? 'Светлая' : "Темная"}</p>
                        </div>
                    ))}


                </div>)}


            </div> : <div>
                <button onClick={() => {
                    navigate('/signup')
                }}>SignIN
                </button>
            </div>}

        </div>
    )
}
export default ChatHeader
