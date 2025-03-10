import React, {useEffect} from 'react'
import {toast} from "react-hot-toast";
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useAuthStore} from "../store/useAuthStore.js";


    const backendUrl = 'http://localhost:1113'
const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get('success')
    const userId = searchParams.get('userId')
    console.log(success)
    const {verifyPayment} = useAuthStore()
    console.log(userId)
    const navigate = useNavigate()


    useEffect( () => {
      verifyPayment({success, userId})
        navigate('/')
    }, [])


    return (
        <div>
            <div>

            </div>
        </div>
    )
}
export default Verify
