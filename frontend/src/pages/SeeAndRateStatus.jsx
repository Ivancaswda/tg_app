import React, {useEffect, useState} from 'react'
import {useStatusStore} from "../store/useStatusStore.js";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {green_icon} from "../assets/assets.js";
import {toast} from "react-hot-toast";
import {Loader} from "lucide-react";
import {useAuthStore} from "../store/useAuthStore.js";

const SeeAndRateStatus = () => {

    const {Statuses, getSpecificStatus, specificStatusData, isStatusLoading, rateStatus, removeStatus, getStatuses} = useStatusStore()
    let {id} = useParams()
    const {authUser} = useAuthStore()
    const location = useLocation();
    const navigate = useNavigate()

    const [rating, setRating] = useState(5); // По умолчанию 5 звезд
    const allStatuses = location.state?.allStatuses || [];
    const [currentStatusIndex, setCurrentStatusIndex] = useState(0); // Индекс текущего статуса
    const [updatedStatus, setUpdatedStatus] = useState(null); // Статус с обновленной оценкой

    useEffect( () => {

    if (allStatuses.length > 0) {
        getSpecificStatus(allStatuses[currentStatusIndex]._id)
    }

        console.log(specificStatusData)
        console.log(allStatuses)
    }, [currentStatusIndex, allStatuses, getSpecificStatus])

    const handleNextStatus = () => {
        if (currentStatusIndex < allStatuses.length - 1) {
            setCurrentStatusIndex(currentStatusIndex + 1)
        }
    }

    const handlePreviousStatus = () => {
        if (currentStatusIndex > 0) {
            setCurrentStatusIndex(currentStatusIndex - 1)
        }
    }


    const handleRateStatus = async () => {
        try {
            await rateStatus({ id: allStatuses[currentStatusIndex]._id, rating });


            const updatedStatus = await getSpecificStatus(allStatuses[currentStatusIndex]._id);

            if (updatedStatus) {
                setUpdatedStatus(updatedStatus);
                console.log(updatedStatus)

                const updatedStatuses = allStatuses.map((status, index) => {
                    return index === currentStatusIndex
                        ? { ...status, averageRating: updatedStatus.averageRating }
                        : status;
                });
                console.log(updatedStatuses)
                location.state.allStatuses = updatedStatuses;
            } else {
                toast.error("Не удалось обновить статус");
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
        }
    }

    const status = allStatuses[currentStatusIndex];

    if (isStatusLoading) return <div className='h-[100vh] w-full flex items-center justify-center'>
        <Loader className='size-10 animate-spin text-blue-500'/>
    </div>;
    return (
        <div className='w-full h-full flex items-center justify-center gap-2   '>
            <div>
                <svg title='Предыдущий статус' onClick={handlePreviousStatus} className='p-2 hover:bg-gray-200 rounded-full transition-all cursor-pointer' width='30' height='30' xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 448 512">
                    <path
                        d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                </svg>
            </div>
            <div className='max-w-60 w-full'>
                <div className='mt-6 '>
                    <svg onClick={() => {
                        navigate('/')
                    }} className='p-2 hover:bg-gray-200 rounded-full transition-all cursor-pointer' width='35'
                         height='35' xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 448 512">
                        <path fill='gray'
                              d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                    </svg>
                </div>
                <div className='flex items-center gap-2 justify-center mt-6 '>
                    <img className='w-12 h-12 p-2 bg-blue-300 rounded-full
                    ' src={status?.userId?.profilePic || green_icon} alt=""/>
                    <p className='font-semibold text-gray-600 flex items-center gap-2'>{status?.userId?.fullName}
                        {authUser?.isPremium &&
                            <img  className='w-4' src="https://web.telegram.org/a/PremiumLogo.a5c0e88cd478f4d76d82.svg" alt=""/>}
                    </p>
                </div>
                <div className='mt-6'>
                    <p className='text-xs font-semibold text-gray-700 text-center mb-2 flex justify-center gap-1'>
                        Средняя оценка: <span
                        className='text-xs text-blue-500'>{status?.averageRating?.toFixed(1) || 'Нет оценок!'}</span>
                    </p>
                    {/* {status?.imageUrl ? (<div className='relative rounded-lg picture w-full h-full flex items-center justify-center'>
                        <img className='object-cover rounded-lg' src={status?.imageUrl} alt=""/>
                        <p className='absolute bottom-2 text-center text-white z-40 font-semibold'>{status?.text}</p>
                    </div>) : (<div
                        className='w-full h-[220px] flex text-white text-2xl font-semibold rounded-lg items-center justify-center bg-blue-500 text-center'>
                        <p>{status?.text}</p>
                    </div>)} */}

                    {status.mediaUrl ? (
                        status.mediaUrl.endsWith(".mp4") || status.mediaUrl.includes("video") ? (
                            <video controls className="w-full h-[280px] rounded-lg bg-white border-2 border-white">
                                <source src={status.mediaUrl} type="video/mp4" />
                            </video>
                        ) : (
                            <img
                                src={status.mediaUrl}
                                alt="Статус"
                                className="w-full h-[280px] rounded-lg bg-white border-2 border-white"
                            />
                        )
                    ) : (
                        <div
                            className='w-full h-[220px] flex text-white text-2xl font-semibold rounded-lg items-center justify-center bg-blue-500 text-center'>
                            <p>{status?.text}</p>
                        </div>
                    )}


                    <p className='text-center text-gray-500 mt-4 text-sm font-semibold'>Был
                        установлен: {new Date(status?.createdAt).toLocaleDateString()}</p>
                    <div className=''>
                        <div className='flex flex-col gap-2 mt-6'>
                            <label className='text-md font-semibold text-center'>Оценка:</label>
                            <div className='flex gap-1 justify-center'>
                                {[1, 2, 3, 4, 5].map((star) => (


                                    <span
                                        key={star}
                                        className={`cursor-pointer text-3xl ${star <= rating ? 'text-blue-500' : 'text-gray-300'}`}
                                        onClick={() => setRating(star)}
                                    >
                                                    ★
                                        </span>


                                ))}
                            </div>
                            <button onClick={handleRateStatus}
                                    className="relative  mt-4 text-white font-semibold py-2  px-3 rounded-xl bg-green-500 border-[3px] border-transparent overflow-hidden">
                        <span
                            className="z-10 relative text-lg text-center flex items-center justify-center gap-2 bottom-0">
                            <svg width='20' height='20' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                <path fill='white'
                                      d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"/></svg>
                            Оценить</span>

                                <div
                                    className="absolute inset-0 rounded-lg bg-gradient-to-l from-violet-400 via-blue-400 to-pink-400 animate-border"></div>

                                <div className="absolute inset-0 flex items-center justify-center dots"></div>
                            </button>
                            {authUser._id === status?.userId._id && <p onClick={() => {
                                removeStatus(allStatuses[currentStatusIndex]._id)
                                getStatuses()
                                navigate('/')
                            }}
                           className='underline underline-gray-500 cursor-pointer hover:scale-105 transition-all text-sm text-center text-gray-700 font-semibold'>Удалить
                                этот статус</p>}

                        </div>
                    </div>

                </div>
            </div>
            <div>
                <svg title='Следующий статус' onClick={handleNextStatus}
                     className='p-2 hover:bg-gray-200 rounded-full transition-all cursor-pointer' width='30' height='30'
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 448 512">
                    <path
                        d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                </svg>
            </div>
        </div>
    )
}
export default SeeAndRateStatus
