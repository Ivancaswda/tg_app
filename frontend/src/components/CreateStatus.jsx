import React, {useEffect, useState} from 'react'
import {green_icon} from "../assets/assets.js";
import {Camera, Loader} from "lucide-react";
import {useStatusStore} from "../store/useStatusStore.js";
import {toast} from "react-hot-toast";
import {useAuthStore} from "../store/useAuthStore.js";
import EmojiPicker from "emoji-picker-react";

const CreateStatus = () => {

    const {isStatusLoading, setCreateStatus, uploadStatus, Statuses, getStatuses} = useStatusStore()
    const [text, setText] = useState('')
    const [media, setMedia] = useState('')
    const {authUser} = useAuthStore()
    const [showPicker, setShowPicker] = useState(false)

    const handleStatusUpload = async (event) => {
        try {


            event.preventDefault()
            const formData = new FormData();
            formData.append('text', text);
            formData.append('file', media);
            formData.append('userId', authUser._id)
            console.log(authUser._id)

              // Ensure the image file is correct

            console.log(formData)
            console.log(media)
            console.log(authUser._id)

            await uploadStatus({userId: authUser._id, text:text, file:media,})
            setCreateStatus(false)
            // reset
            getStatuses()


        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }
    const handleEmojiSelect = (emoji) => {
        setText((prev) => prev + emoji);
    };
    const handleEmojiClick = (emojiObject) => {
        handleEmojiSelect(emojiObject.emoji)
        setShowPicker(false)
    }
    console.log(media)

    if (isStatusLoading) {
        return <div className='h-[100vh] w-full flex items-center justify-center'>
            <Loader className='size-10 animate-spin text-blue-500'/>
        </div>
    }


    return (
        <form onSubmit={handleStatusUpload}
              className='p-4 w-full h-full flex flex-col items-center justify-center gap-7 relative'>

            <div onClick={() => {
                setCreateStatus(false)
            }} className='absolute z-20 left-0 top-0 cursor-pointer '>
                <svg  className='p-3 transition-all hover:bg-gray-200 rounded-full' width='45' height='45'
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 384 512">
                    <path fill='gray'
                          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                </svg>
            </div>

            <div>
                <svg width='60' height='60' xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 496 512">
                    <path fill='#0b84ee'
                          d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"/>
                </svg>
            </div>
            <div>
                <div className='w-60 h-10 relative '>
                    <button type='button' onClick={() => {
                        setShowPicker(!showPicker)
                    }}>
                        <svg className="fill-gray-500 hover:fill-blue-500 absolute bottom-2.5 left-4  transition-colors duration-300" width='20'
                             height='20' xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <path
                                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                        </svg>
                    </button>
                    <div className='absolute bottom-[-160px]  right-[250px]'>
                        {showPicker &&
                            <EmojiPicker className=' ' onEmojiClick={handleEmojiClick}/>
                        }
                    </div>
                    <input onChange={(event) => {
                        setText(event.target.value)
                    }} type="text" value={text} className='w-[100%] h-[100%] rounded-lg border border-black pl-12 py-2'
                           placeholder='Заголовок статуса'/>

                </div>
            </div>



            <div className='lg:w-[41%] w-[80%] sm:w-[41%] md:w-[41%] h-[41%]'>

                {media ? (media.name.endsWith('.mp4') || media.type.includes("video") ?
                        <div className='relative   w-[100%] h-[100%] '>

                            <video  controls className="w-full h-[250px] rounded-lg bg-white border-2 border-white">
                                <source src={URL.createObjectURL(media)}  type="video/mp4"/>
                            </video>
                            <label
                                className={`absolute z-20 bg-white bottom-4 right-3 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isStatusLoading && 'animate-pulse pointer-events-none'}`}
                                htmlFor='file'>
                                <Camera className='text-blue-500' size={15}/>

                                <input onChange={(event) => setMedia(event.target.files[0])} type="file" id='file'
                                       className='hidden z-20 absolute' accept='image/*, video/*'
                                       disabled={isStatusLoading}
                                />
                            </label>
                        </div> : <div className='relative   w-[100%] h-[100%] '>

                            <img src={URL.createObjectURL(media)}
                                 alt="Профиль"
                                 className='size-32    w-full h-full   object-cover border-4 rounded-lg '
                            />
                            <label
                                className={`absolute z-20 bg-white bottom-4 right-3 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isStatusLoading && 'animate-pulse pointer-events-none'}`}
                                htmlFor='file'>
                                <Camera className='text-blue-500' size={15}/>

                                <input onChange={(event) => setMedia(event.target.files[0])} type="file" id='file'
                                       className='hidden z-20 absolute' accept='image/*, video/*'
                                       disabled={isStatusLoading}
                                />
                            </label>
                        </div>
                ) : <div className='w-[100%] relative p-2  h-[100%] bg-blue-500  rounded-lg flex items-center justify-center'>
                    <div className='text-center w-90'>
                        <h1 className='font-semibold text-lg text-white text-center break-words'>{text}</h1>
                        <label
                            className={`absolute z-20 bg-white bottom-4 right-3 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isStatusLoading && 'animate-pulse pointer-events-none'}`}
                            htmlFor='file'>
                            <Camera className='text-blue-500' size={15}/>

                            <input onChange={(event) => setMedia(event.target.files[0])} type="file" id='file'
                                   className='hidden z-20 absolute' accept='image/*, video/*'
                                   disabled={isStatusLoading}
                            />
                        </label>
                    </div>
                </div>}


            </div>
            <div className=' mt-10 '>
                <button type='submit'
                        className='flex hover:scale-105 transition-all items-center gap-2 bg-blue-500 rounded-lg px-4 py-2 text-white font-semibold'>
                    <svg width='20' height='20' xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 512 512">
                        <path fill='white'
                              d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/>
                    </svg>

                    Опубликовать статус
                </button>
            </div>
        </form>
    )
}
export default CreateStatus
