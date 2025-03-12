import React, {useState} from 'react'
import {toast} from "react-hot-toast";
import {useAuthStore} from "../store/useAuthStore.js";
import axios from "axios";

const Premium = ({closedPremModal, setClosedPremModal}) => {
    const [selectedPlan, setSelectedPlan] = useState(null)
    const {premiumPayment, authUser} = useAuthStore()
    const premiumSubscribtions = [
        {
            name: 'Telegram Premium 3 month',
            price: '165'
        },
        {
            name: 'Telegram Premium 12 month',
            price: '265'
        }
    ]
    console.log(authUser._id)
    const handlePaymentPremium = async () => {
        try {

            const purchaseData = {
                name: selectedPlan?.name,
                price: selectedPlan?.price,
                userId: authUser._id
            }

             await premiumPayment(purchaseData)
            toast.success('Переходим к оплате через Stripe')
        } catch (error) {
            toast.error(error.message)
        }
    }




    return (
        <div className='p-4'>

            <div>
                <div>
                    <div className=' '>
                        <svg onClick={() => {
                            setClosedPremModal(true)
                        }} className='p-2 transition-all hover:bg-gray-200 rounded-full' width='38' height='38'
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 384 512">
                            <path fill='gray'
                                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                        </svg>
                    </div>
                    <div className='w-full flex items-center justify-center flex-col'>


                        <img className='text-center'
                             src="https://web.telegram.org/a/PremiumLogo.a5c0e88cd478f4d76d82.svg"
                             alt=""/>
                        <h1>Telegram Premium</h1>
                        <p className='text-center text-sm'>Иди за <b>пределы границ</b>  и открой дюжины <b>эксклюзивных способностей</b> с помощью <span className='text-purple-700 font-semibold'>Telegram Premium</span></p>
                    </div>
                </div>


                <div class="flex gap-4 flex-col w-full ">


                    {premiumSubscribtions.map((item, index) => (
                        <label key={index}
                            className={` ${selectedPlan?.name === item.name && 'border-blue-500 bg-blue-500'}   relative p-2 w-full border-gray-300 peer-checked:border-blue-500 flex justify-between items-center  h-24 bg-white rounded-lg shadow-md cursor-pointer  transition hover:shadow-lg`}>
                            <input onChange={() => setSelectedPlan(item)} type="radio" name='choice' class="hidden  peer"/>
                            <div
                                className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500 transition">
                                <svg className={` ${selectedPlan?.name === item && 'opacity-100'} w-4 h-4 text-white opacity-0  transition`}
                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                                          clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div className='flex justify-center flex-col'>
                                <div className='flex items-center'>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div className='flex items-center gap-1'>
                                            <p className='text-xs px-2 rounded-xl text-white bg-blue-500'>-45%</p>
                                            <p className='text-xs'>{item.name}</p>
                                        </div>
                                        <div className='flex items-center text-xs mt-2 text-gray-400 font-semibold'>
                                            {item.price} / month
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='flex items-center text-xs text-gray-400 font-semibold'>
                                {item.price} / month
                            </div>

                        </label>

                    ))}


                    <button onClick={handlePaymentPremium} disabled={!selectedPlan}
                        className="relative  text-white font-semibold py-2  px-3 rounded-xl bg-green-500 border-[3px] border-transparent overflow-hidden">
                        <span
                            className="z-10 relative text-lg text-center bottom-0">{selectedPlan ? `ПОДПИСАТЬСЯ ЗА  ${selectedPlan?.price} РУБ В МЕСЯЦ ` : 'Выбери вариант подписки'}</span>

                        <div
                            className="absolute inset-0 rounded-lg bg-gradient-to-l from-violet-400 via-blue-400 to-pink-400 animate-border"></div>

                        <div className="absolute inset-0 flex items-center justify-center dots"></div>
                    </button>


                </div>


            </div>

        </div>
    )
}
export default Premium
