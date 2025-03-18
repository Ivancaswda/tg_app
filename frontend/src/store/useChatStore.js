import {create} from "zustand";
import {toast} from "react-hot-toast";
import axios from "axios";
import {axiosInstance} from "../lib/axios.js";
import {useAuthStore} from "./useAuthStore.js";


export const useChatStore = create((setState, getState) => ({
    messages: [],
    users: [],
    unreadMessages: {},
        showUser: null,
    setShowUser: (showUser) => setState({showUser}),
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

                // making to display unread messages of the chat and its dissappearence after watching it
                setState((state) => ({
                    messages: response.data.messages,
                    unreadMessages: { ...state.unreadMessages, [userId]: 0 },
                }))
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
          setState((state) => {
              // making to display unread messages of the chat and its dissappearence after watching it
            const isChatOpen = state.selectedUser?._id === newMessage.senderId // if chat open`s
            const newUnreadMessages = {...state.unreadMessages}
                // anulling unread messages
              if (!isChatOpen) {
                  newUnreadMessages[newMessage.senderId] = (newUnreadMessages[newMessage.senderId] || 0) + 1
              }
            return {
                  messages: isChatOpen ? [...state.messages, newMessage] : state.messages,
                  unreadMessages: newUnreadMessages
            }
          })
      })

    },
    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off('newMessage')
    },
    setSelectedUser: (selectedUser) => setState((state) => ({
        selectedUser,
        unreadMessages: { ...state.unreadMessages, [selectedUser._id]: 0 },
    })),
    setShowProfile: (showProfile) => setState({showProfile}),

}))
