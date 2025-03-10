import {create} from "zustand";
import {toast} from "react-hot-toast";
import axios from "axios";
import {axiosInstance} from "../lib/axios.js";
import {useAuthStore} from "./useAuthStore.js";


export const useChatStore = create((setState, getState) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    showProfile: false,
    getUsers: async () => {
        setState({isUsersLoading: true})
        try {


            const response = await axiosInstance.get('/message/get-users')



            if (response.data.success) {
                setState({users: response.data.filteredUsers})
                console.log(response.data.filteredUsers)
            } else {
                toast.error(response.data.message)
            }



        } catch (error) {
            setState({users: []})
            toast.error(error.message)
        } finally {
            setState({isUsersLoading: false})
        }
    },
    getMessages: async (userId) => {
        try {
            setState({isMessagesLoading: true})

            const response = await axiosInstance.get( `/message/get/${userId}`)
            if (response.data.success) {
                console.log(response.data)
                setState({messages: response.data.messages})
            } else {
                setState({messages: []})
                toast.error(response.data.messages)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setState({isMessagesLoading: false})
        }
    },
    sendMessage: async (data) => {
        try {
            const {selectedUser, messages} = getState()

            const response = await axiosInstance.post( `/message/send/${selectedUser._id}`, data)

            if (response.data.success) {
                setState({messages: [...messages, response.data.newMessage]})
                toast.success('Сообщение успешно отправлено')
            }else {
                toast.error('Не удалось отправить сообщение!')
            }

        } catch (error) {
            toast.error(error.message)
        }
    },
    subscribeToMessages: () => {
      const {selectedUser} = getState()

      const socket = useAuthStore.getState().socket;

      socket.on('newMessage', (newMessage) => {
          const isMessageSentFromSelectedUser = newMessage.senderId !== selectedUser._id
          if (isMessageSentFromSelectedUser) {
              return;
          }
          setState({messages: [...getState().messages, newMessage],
          })
      })

    },
    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off('newMessage')
    },
    setSelectedUser: (selectedUser) => setState({selectedUser}),
    setShowProfile: (showProfile) => setState({showProfile})
}))