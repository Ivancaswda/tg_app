import React, {useEffect, useState} from 'react'
import {useAuthStore} from "../store/useAuthStore.js";
import {green_icon} from "../assets/assets.js";
import {useThemeStore} from "../store/useThemeStore.js";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {Camera} from "lucide-react";
import {useChatStore} from "../store/useChatStore.js";
import {THEMES} from "../constants/index.js";
const Profile = ({closedPremModal, setClosedPremModal}) => {
    const {theme, setTheme} = useThemeStore()
    const [isEdit, setIsEdit] = useState(false)
    const {updateProfile, isUpdatingProfile, updateImage, authUser, logout, authImage, imageProfilePic, setImageProfilePic, onlineUsers} = useAuthStore()
    const [selectedImage, setSelectedImage] = useState(null)
    const [chooseTheme, setChooseTheme] = useState(false)
    const [fullName, setFullName] = useState(authUser?.fullName)
    const [description, setDescription] = useState(authUser?.description)



        console.log(chooseTheme)
    console.log(authUser?.isPremium)

    const handleProfileUpdate = async (event) => {
        try {


            const formData = {
                fullName,   description
            }


            console.log(formData)
            await updateProfile(formData)
            setIsEdit(false)
            toast.success('Профиль успешно обновлён!')

        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }


    }

    const handleImageUpdate = async (event) => {
        try {
            const file = event.target.files[0]

            if (!file) {
                return
            }

            const reader = new FileReader()

            reader.readAsDataURL(file)

            reader.onload = async () => {
                const base64Image = reader.result;
                setSelectedImage(base64Image)
                localStorage.setItem('avatarImage', JSON.stringify(base64Image))
                setImageProfilePic(base64Image)
                await updateImage({profilePic: base64Image})
            }

        } catch (error) {
            toast.error(error.message)
        }
    }



    const {showProfile, setShowProfile} = useChatStore()

    const navigate = useNavigate()
    return  authUser && (
        <div className='absolute min-h-screen  w-[100%] sm:w-[100%] md:w-[100%] lg:w-[100%] left-0 z-20  w-full h-full flex justify-between flex-col'>
            <div className=''>
                <div className='flex justify-between items-center px-4 py-2'>

                    <div className='flex items-center gap-4'>
                        <svg className='cursor-pointer' onClick={() => {
                            setShowProfile(false)
                        }} width='18' height='18' xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 448 512">
                            <path fill='gray'
                                  d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                        </svg>
                        <p>Настройки</p>
                    </div>

                    <div className='flex items-center gap-4'>

                        {!isEdit ? <svg className='cursor-pointer' onClick={() => {
                            setIsEdit(true)
                        }} width='18' height='18' xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512">
                            <path fill='gray'
                                  d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/>
                        </svg> : <svg onClick={handleProfileUpdate} className='cursor-pointer' width='18' height='18'
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 448 512">
                            <path fill='gray'
                                  d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-242.7c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32L64 32zm0 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32L96 224c-17.7 0-32-14.3-32-32l0-64zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                        </svg>}

                        <svg width='18' height='18' xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 128 512">
                            <path fill='gray'
                                  d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/>
                        </svg>
                    </div>
                </div>
                <div className='relative w-[100%] h-[40%]  '>


                    <div className='relative picture w-[100%] h-[100%]'>
                        <img src={imageProfilePic || authUser?.profilePic || !authImage?.profilePic || green_icon}
                             alt="Профиль"
                             className='size-32   w-full h-full   object-cover border-4 '
                        />
                        <label
                            className={`absolute z-20 bg-white bottom-4 right-3 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile && 'animate-pulse pointer-events-none'}`}
                            htmlFor='avatar-upload'>
                            <Camera className='text-blue-500' size={15}/>

                            <input type="file" id='avatar-upload' className='hidden' accept='image/*'
                                   onChange={handleImageUpdate} disabled={isUpdatingProfile}
                            />
                        </label>
                    </div>
                    <div className={'absolute bottom-4 px-8 '}>

                        <h1 style={{textShadow: '4px 4px 4px black'}}
                            className='font-semibold text-white flex items-center gap-2  '>{authUser?.fullName}{authUser?.isPremium &&
                            <img className='w-4' src="https://web.telegram.org/a/PremiumLogo.a5c0e88cd478f4d76d82.svg" alt=""/>}</h1>
                        <p className={`text-xs font-semibold ${onlineUsers.includes(authUser._id) ? 'text-green-500' : 'text-gray-500'} `}>{onlineUsers.includes(authUser._id) ? 'В сети' : 'Не в сети'}</p>
                    </div>
                </div>
                <div className='flex items-center py-2 '>
                    <svg className='text-left w-[24%]' width='20' height='20' xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 640 512">
                        <path fill='gray'
                              d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c10 0 18.8-4.9 24.2-12.5l-99.2-99.2c-14.9-14.9-23.3-35.1-23.3-56.1l0-33c-15.9-4.7-32.8-7.2-50.3-7.2l-91.4 0zM384 224c-17.7 0-32 14.3-32 32l0 82.7c0 17 6.7 33.3 18.7 45.3L478.1 491.3c18.7 18.7 49.1 18.7 67.9 0l73.4-73.4c18.7-18.7 18.7-49.1 0-67.9L512 242.7c-12-12-28.3-18.7-45.3-18.7L384 224zm24 80a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"/>
                    </svg>
                    {!isEdit ? (<div className='w-[76%]'>

                        <p className='text-sm '>{authUser?.fullName}</p>
                        <p className='text-xs text-gray-700'>Имя</p>
                    </div>) : (<div className='w-[76%]'>
                        <input onChange={(event) => {
                            setFullName(event.target.value)
                        }} placeholder={authUser?.fullName} type="text" className='w-full px-4 py-2 '/>
                    </div>)}

                </div>
                <div className='flex-col gap-4 flex py-2'>
                    <div className='flex items-center '>
                        <svg className='text-left w-[24%]' width='20' height='20' xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <path fill='gray'
                                  d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                        </svg>
                        <div className='w-[76%]'>
                            <p className='text-sm '>{authUser?.email}</p>
                            <p className='text-xs text-gray-700'>Электронная почта</p>
                        </div>
                    </div>

                    <div className='flex items-center '>
                        <svg className='text-left w-[24%]' width='20' height='20' xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 448 512">
                            <path fill='gray'
                                d="M0 216C0 149.7 53.7 96 120 96l8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-8 0c-30.9 0-56 25.1-56 56l0 8 64 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64l0-32 0-32 0-72zm256 0c0-66.3 53.7-120 120-120l8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-8 0c-30.9 0-56 25.1-56 56l0 8 64 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64l0-32 0-32 0-72z"/>
                        </svg>
                        {!isEdit ? (<div className='w-[76%]'>

                            <p className='text-sm '>{authUser?.description}</p>
                            <p className='text-xs text-gray-700'>Описание</p>
                        </div>) : (<div className='w-[76%]'>
                            <input placeholder={authUser?.description} onChange={(event) => {
                                setDescription(event.target.value)
                            }} type="text" className='w-full px-4 py-2 '/>
                        </div>)}

                    </div>


                    <div className='flex items-center '>
                        <svg width='20' height='20' className='text-left w-[24%]' xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <path fill='gray'
                                  d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
                        </svg>
                        <div className='w-[76%]'>
                            <p className='text-sm '>{new Date(authUser?.createdAt).toLocaleDateString()}</p>
                            <p className='text-xs text-gray-700'>Дата создания пользователя</p>
                        </div>
                    </div>
                </div>
                <div className=' h-[20px]'>

                </div>
                <div onClick={() => {
                    setChooseTheme(!chooseTheme)
                }} className='flex relative py-3 items-center justify-around mt-6 hover:bg-gray-100  cursor-pointer'>
                    <div  className='w-[28%] flex justify-center gap-2 items-center'>
                        {theme === 'dark' ? <svg width='20' height='20' xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 384 512">
                            <path
                                d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/>
                        </svg> : <svg width='18' height='18' xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 512 512">
                            <path fill={``}
                                  d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/>
                        </svg>}
                        <p className='font-semibold text-sm'>Тема</p>
                    </div>
                    { chooseTheme && (<div className='absolute w-full bottom-[-66px]'>
                        <div className='w-full flex items-center bg-black text-white py-4 justify-around'>


                            {THEMES.map((Theme, index) => (
                                <div  onClick={() => {
                                    setTheme(Theme)
                                    setChooseTheme(false)
                                }} key={index}>
                                    <div className='flex items-center gap-2 border border-white p-2'>
                                        {Theme === 'dark' ?
                                            <svg width='18' height='18' xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 384 512">
                                                <path fill='white'
                                                      d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/>
                                            </svg> : <svg width='18' height='18' xmlns="http://www.w3.org/2000/svg"
                                                          viewBox="0 0 512 512">
                                                <path fill='white'
                                                      d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/>
                                            </svg>}
                                        <p className='text-sm font-semibold'>{Theme === 'light' ? 'Светлая' : 'Темная'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>)}


                    <p className='flex w-[72%] justify-center font-semibold text-sm'>{theme === 'light' ? 'Светлая' : 'Темная'}</p>
                </div>

                <div className=' h-[20px]'>

                </div>

                <div onClick={() => {
                    setClosedPremModal(false)
                }} className='flex items-center py-3 hover:bg-gray-100 cursor-pointer  '>


                    <div className='text-center flex items-center justify-center w-[24%]'>
                        <svg className='p-2 bg-purple-50 rounded-full' width='35' height='35'
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 576 512">
                            <path fill='purple'
                                  d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                        </svg>
                    </div>
                    <div className='flex w-[76%] justify-center'>
                        <p className='font-semibold text-sm'>{authUser?.isPremium ? 'У вас теперь есть Telegram Premium' : 'Telegram Premium'}</p>
                    </div>
                </div>
                <div className='flex items-center py-3 hover:bg-gray-100 cursor-pointer '>
                    <div className='text-center flex items-center justify-center w-[24%]'>
                        <svg width='18' height='18' xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 576 512">
                            <path fill='gray'
                                  d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zm48 96a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm0 240a24 24 0 1 0 0-48 24 24 0 1 0 0 48zM368 321.6l0 6.4c0 8.8 7.2 16 16 16s16-7.2 16-16l0-6.4c0-5.3 4.3-9.6 9.6-9.6l40.5 0c7.7 0 13.9 6.2 13.9 13.9c0 5.2-2.9 9.9-7.4 12.3l-32 16.8c-5.3 2.8-8.6 8.2-8.6 14.2l0 14.8c0 8.8 7.2 16 16 16s16-7.2 16-16l0-5.1 23.5-12.3c15.1-7.9 24.5-23.6 24.5-40.6c0-25.4-20.6-45.9-45.9-45.9l-40.5 0c-23 0-41.6 18.6-41.6 41.6z"/>
                        </svg>
                    </div>
                    <div className='flex w-[76%] justify-center'>
                        <p className='font-semibold text-sm'>telegram FAQ</p>
                    </div>
                </div>
                <div className='flex items-center py-3 hover:bg-gray-100 cursor-pointer  '>
                    <div className='text-center flex items-center justify-center w-[24%]'>
                        <svg width='18' height='18' xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <path fill='gray'
                                  d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3c0 0 0 0 0 0c0 0 0 0 0 0s0 0 0 0s0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM224 160c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 48 48 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-48 0 0 48c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-48-48 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l48 0 0-48z"/>
                        </svg>

                    </div>
                    <div className='flex w-[76%] justify-center'>
                        <p className='font-semibold text-sm'>Задать вопрос</p>
                    </div>
                </div>


            </div>
            <div onClick={logout}
                 className='flex cursor-pointer  items-center justify-center bg-red-600 text-white py-4 gap-4 mt-8 rounded-3xl'>
                <p className='text-sm font-semibold '>Выйти</p>
                <svg width='18' height='18' xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 512 512">
                    <path fill='white'
                          d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
                </svg>
            </div>
        </div>
    )
}
export default Profile
