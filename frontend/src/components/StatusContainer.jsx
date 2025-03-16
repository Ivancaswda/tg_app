import React, {useEffect} from 'react'
import {useStatusStore} from "../store/useStatusStore.js";
import {green_icon} from "../assets/assets.js";
import {useNavigate} from "react-router-dom";

const StatusContainer = () => {

    const {Statuses, getStatuses, createStatus, setCreateStatus, removeStatus} = useStatusStore()


    // creating ui telegram gradient of status
    const createGradient = (index) => {
        let gradientParts = [];
        const angleStep = 360 / (Statuses[index].statuses.length * 2); // Угол для каждого статуса + пробел

        for (let i = 0; i < Statuses[index].statuses.length; i++) {
            const start = i * 2 * angleStep;
            const end = start + angleStep;
            const color = ["#ff4500", "#ffcc00", "#00ccff", "#66ff66", "#ff66ff"][i % 5]; // Разные цвета

            gradientParts.push(`${color} ${start}deg ${end}deg`);
            gradientParts.push(`${color} ${start}deg ${end}deg`); // Пробел
        }

        return `conic-gradient(${gradientParts.join(", ")})`;
    }


    useEffect(() => {
        getStatuses()
    }, [getStatuses, removeStatus])
    const navigate = useNavigate()
    console.log(Statuses)
    return (
        <div className='p-5'>
            {Statuses.length <= 5 && <h2 className=' mb-2 font-semibold'>Статусы</h2>}

            {Statuses.length > 5 && (
                <div className='flex items-start gap-4'>
                    <h2 className=' mb-2 font-semibold'>Статусы</h2>

                    <div className='w-full flex items-center overflow-auto gap-2'>
                    {Statuses.map((status,index) => (
                        <div onClick={() => {

                            if (status.statuses.length > 0) {
                                navigate(`/see/${status.statuses[0]._id}`, {state: {allStatuses: status.statuses}})
                                console.log(status.statuses[0]._id);
                            }

                            console.log(status)
                        }} className='flex cursor-pointer  flex-col items-left text-left justify-center' key={index}>


                            <div key={index}
                                 className="relative w-8 h-8 flex flex-col items-left text-center justify-center"
                                 style={{
                                     borderRadius: "50%",
                                     padding: "2px",
                                     background: createGradient(index),

                                 }}
                            >
                                <div onClick={(event) => {

                                    console.log('remove status', status.statuses[0]._id)
                                    removeStatus(status.statuses[0]._id)
                                    getStatuses()
                                    navigate('/')
                                }}
                                     className={'absolute z-10 bg-gray-100 rounded-full p-0.5 top-[-3px] font-semibold right-[-5px]'}>
                                    <svg width='12' height='12' xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 384 512">
                                        <path fill='black'
                                              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                    </svg>
                                </div>

                                <img
                                    src={status.user.profilePic || green_icon}
                                    alt={status.user.fullName}
                                    className="w-full h-full rounded-full bg-white border-2 border-white"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            )}
            <div className='grid grid-cols-[1fr_1fr_1fr] gap-2 '>
                {Statuses.length <= 5 && (
                    Statuses.map((status, index) => (
                        <div onClick={() => {

                            if (status.statuses.length > 0) {
                                navigate(`/see/${status.statuses[0]._id}`, {state: {allStatuses: status.statuses}})
                                console.log(status.statuses[0]._id);
                            }

                            console.log(status)
                        }} className='flex cursor-pointer  flex-col items-left text-left justify-center' key={index}>


                            <div key={index}
                                 className="relative w-12 h-12 flex flex-col items-left text-center justify-center"
                                 style={{
                                     borderRadius: "50%",
                                     padding: "4px",
                                     background: createGradient(index),

                                 }}
                            >
                                <div onClick={(event) => {
                                    event.stopPropagation()
                                    console.log('remove status', status.statuses[0]._id)
                                    removeStatus(status.statuses[0]._id)
                                    getStatuses()
                                }}
                                     className={'absolute z-10 bg-gray-100 rounded-full p-0.5 top-[-3px] font-semibold right-[-5px]'}>
                                    <svg width='15' height='15' xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 384 512">
                                        <path fill='black'
                                              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                    </svg>
                                </div>

                                <img
                                    src={status.user.profilePic || green_icon}
                                    alt={status.user.fullName}
                                    className="w-full h-full rounded-full bg-white border-2 border-white"
                                />
                                </div>

                                <p className='text-xs font-semibold'>{status.user.fullName.slice(0, 7)}</p>
                            </div>
                        ))
                )}

                <div onClick={() => {
                    setCreateStatus(true)

                }} className='cursor-pointer flex items-left justify-center flex-col'>
                    <div className=' rounded-full'>
                        <svg width='40' height='40' xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <path fill='blue'
                                  d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/>
                        </svg>
                    </div>
                    <p className='text-xs text-left font-semibold'>Создать <br/> статус</p>
                </div>
            </div>

        </div>
    )
}
export default StatusContainer