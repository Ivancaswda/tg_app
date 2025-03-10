import React, {useState} from 'react'
import {Eye, EyeOff, Lock, Mail, User} from "lucide-react";
import {NavLink, useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {useAuthStore} from "../store/useAuthStore.js";

const Login = () => {

    const navigate = useNavigate()

    const {login} = useAuthStore()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)

    const validateForm = () => {
        if (!formData.email.trim()) {
            return toast.error('Необходима электронная почта!')
        }

        if (!formData.password.trim()) {
            return  toast.error('Необходим пароль!')
        }
        if (formData.password.length < 6) {
            return toast.error('Недостаточно символов в пароле')
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            return  toast.error('Недоступный email!')
        }
        return true
    }

    const handleSubmit = async (event) => {

        try {
            event.preventDefault()
            const success = validateForm()
            if (success) {
             await login(formData)
            }
        } catch (error) {
            toast.error('Не удалось зарегистрироваться', error.message)
        }
    }

    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center w-64 '>
                <img className='w-48 '
                     src="https://files.kick.com/images/channel-links/1690282/image/34b4cf7f-dcc6-4972-87e6-7fc66f9f4ab5"
                     alt=""/>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-center font-semibold text-xl '>Telegram</h1>
                    <p className='text-sm text-gray-600 text-center'>Введите необходимые данные что бы продолжить</p>
                </div>



                <div className='relative w-full '>
                    <p className='text-[12px] absolute top-[-10px]  bg-white rounded-2xl px-2 left-4 text-blue-500'>Электронная
                        почта</p>
                    <Mail className='left-4 absolute top-[27%] bottom-[50%] text-blue-500 ' size={15}/>
                    <input value={formData.email} onChange={(event) => {
                        setFormData({...formData, email: event.target.value})
                    }} type="text"
                           className='text-sm pl-10 py-2 w-full border outline-blue-500 transition-all duration-200 border-gray-600 rounded-xl '/>
                </div>

                <div className='relative w-full '>
                    <p className='text-[12px] absolute top-[-10px]  bg-white rounded-2xl px-2 left-4 text-blue-500'>Пароль</p>
                    <Lock className='left-4 absolute top-[27%] bottom-[50%] text-blue-500 ' size={15}/>
                    <button onClick={() => setShowPassword(!showPassword)} type='button'
                            className='absolute inset-0 w-10 left-[85%]  right-0 pr-3 flex items-center text-right'>
                        {showPassword ? (
                            <EyeOff className='size-5 text-blue-500 '/>
                        ) : (
                            <Eye
                                className='size-5 text-blue-500 text-blue-500 duration-200 transition-all'/>
                        )}
                    </button>
                    <input value={formData.password} placeholder='**********' onChange={(event) => {
                        setFormData({...formData, password: event.target.value})
                    }} type={showPassword ? 'text' : 'password'}
                           className='pl-10 py-2 text-sm w-full border outline-blue-500 transition-all duration-200 border-gray-600 rounded-xl '/>

                </div>

                <button type='submit'
                        className='w-full text-sm py-2 rounded-lg transition-all hover:bg-blue-400 bg-blue-500 text-white'>Войти в аккаунт
                </button>
                <p className='text-center text-sm'>Первый раз в <span className='text-blue-500'>telegram</span>? <br/>
                    <NavLink className='hover:text-blue-700 transition-all duration-500' to='/signup'>Создать
                        аккаунт</NavLink></p>

            </form>
        </div>
    )
}
export default Login
