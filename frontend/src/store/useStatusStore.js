import {create} from "zustand";
import {toast} from "react-hot-toast";
import axios from "axios";
import {axiosInstance} from "../lib/axios.js";

export const useStatusStore = create((setState) => ({
    Statuses: [],
    specificStatusData: [],
    selectedStatus: null,
    isStatusLoading: false,
    createStatus: false,
    getStatuses: async () => {
        try {
            setState({isStatusLoading: true})
            const response = await axiosInstance.get('/status/get-statuses')

            if (response.data.success) {
                let userId
                const groupedStatuses = response.data.statuses.reduce((acc, status) => {
                    userId = status.userId._id;

                    if (!acc[userId]) {
                        acc[userId] = { user: status.userId, statuses: [] };
                    }
                    acc[userId].statuses.push(status);
                    return acc;
                }, {});
                console.log(Object.values(groupedStatuses))
                setState({Statuses: Object.values(groupedStatuses)})

            } else {
                toast.error('Не удалось получить статусы')
                console.log(response.data.message)

            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setState({isStatusLoading: false})
        }
    },
    getSpecificStatus: async (id) => {
        try {
            setState({isStatusLoading: true})

            const response = await axiosInstance(`/status/get-status/${id}`)
            if (response.data.success) {
                console.log(response.data.specificStatusData)
                setState({specificStatusData: response.data.specificStatusData})
                return response.data.specificStatusData;
            } else {
                toast.error(response.data.message)
                console.log(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setState({isStatusLoading: false})
        }
    },
    uploadStatus: async (data) => {
        try {
            setState({isStatusLoading: true})

            const response = await axiosInstance.post('/status/add-status', data ,{headers: {
                    'Content-Type': "multipart/form-data"
                }})

            if (response.data.success) {
                toast.success(response.data.message)

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.error(error)
        } finally {
            setState({isStatusLoading: false})
        }
    },
    rateStatus: async ({id, rating}) => {
        try {
            setState({isStatusLoading: true})

            const response = await axiosInstance.post('/status/rate', {id, rating})

            if (response.data.success) {
                toast.success(response.data.message)

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }finally {
            setState({isStatusLoading: false})
        }
    },
    removeStatus: async (id) => {
      try {
          setState({isStatusLoading: true})

          const response = await axiosInstance.post('/status/remove-status', {id})

          if (response.data.success) {
              toast.success('Вы успешно скрыли статус')

          }
      } catch (error) {
          toast.error(error.message)
          console.log(error)
      }finally {
          setState({isStatusLoading:false})
      }
    },
    setCreateStatus: (createStatus) => setState({createStatus}),
    showPicker: false,
    setShowPicker: (showPicker) => setState({showPicker})

}))