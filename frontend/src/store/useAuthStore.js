import {create} from 'zustand'
import axios from "axios";
import {toast} from "react-hot-toast";
import {axiosInstance} from "../lib/axios.js";
import {io} from "socket.io-client";

const backendUrl = 'http://localhost:1112'

export const useAuthStore = create((setState, getState) => ({
    authUser: null,
    authImage: null,
    isSigningUp: false,
    isLogining: false,
    onlineUsers: [],
    isUpdatingProfile: false,
    isCheckingAuth: true,
    socket: null,
    isUpdatingImage: false,
    imageProfilePic: null,
    isPayingUp: false,
    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/api/user/check')
            console.log(response.data)
            // Проверяем, подключен ли уже сокет
            setState({authUser: response.data})
            if (response.data) {
                getState().connectSocket()
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
            setState({authUser:null})
        } finally {
            setState({isCheckingAuth: false})
        }
    },
    signup: async (data) => {
        setState({isSigningUp: true})
        try {
            const response = await axiosInstance.post('/api/user/signup', data)

            if (response.data.success) {
                toast.success('Вы успешно зарегистрированы!')
                console.log(response.data)
                setState({authUser: response.data.user})
                getState().connectSocket()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setState({isSigningUp:false})
        }
    },
    login: async (data) => {
        try {
            setState({isLogining:true})
            const response = await axiosInstance.post('/api/user/login', data)

            if (response.data.success) {
                toast.success('Вы успешно авторизовались')
                setState({authUser: response.data.user})
                getState().connectSocket()
            }  else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setState({isLogining:false})
        }
    },
    logout: async () => {
        try {
            const response = await axiosInstance.post( '/api/user/logout')
            setState({authUser:false})
            if (response.data.success) {
                toast.success('Вы успешно вышли из аккаунта')
                getState().disconnectSocket()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    },
    updateProfile:  async (data) => {
        try {
            setState({isUpdatingProfile: true})
            console.log(data)
            const response = await axiosInstance.post( '/api/user/update-profile', data)

            if (response.data.success) {
                toast.success('Профиль успешно обновлён')
                setState({authUser: response.data.user})
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setState({isUpdatingProfile: false})
        }
    },
    updateImage: async (data) => {
        try {
            setState({isUpdatingImage: true})
            console.log(data)
            const response = await axiosInstance.put('/api/user/update-image', data)
            if (response.data.success) {
                toast.success('Аватар успешно обновлён')
                setState({authImage: response.data.user})
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        } finally {
            setState({isUpdatingImage: false})
        }
    },
    premiumPayment: async (purchaseData) => {
        try {
            setState({isPayingUp: true})
            const response = await axiosInstance.post('/api/user/premium-payment', purchaseData)

            const data = response.data
            window.location.href = data.url

        } catch (error) {
            console.log(error.message)
        } finally {
            setState({isPayingUp: false})
        }

    },
     verifyPayment: async (data) => {

        try {
            const response = await axiosInstance.post( '/api/user/verify-payment', data )

            if (response.data.success) {

                toast.success('Оплата успешно совершена!')
            } else {
                console.log(response.data.message)
                toast.error('Не удалось совершить оплату')
            }

        }catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    },


    connectSocket: () => {
        const {authUser} = getState()

        if (!authUser || getState().socket?.connected) {
            return;
        }

        const socket = io(import.meta.env.MODE === "development" ? "http://localhost:1120/" : '/', {
            query: {
                userId: authUser._id
            }
        })

        socket.connect()
        setState({socket:socket})
        // it should match with what in socket.js
        socket.on('getOnlineUsers', (userIds) => {
            setState({onlineUsers:userIds})
        })
    },
    disconnectSocket: () => {
        if (getState().socket?.connected) {
            getState().socket.disconnect()
        }
    },
    setImageProfilePic: (imageProfilePic) => setState({imageProfilePic})

}))