import React, {useEffect, useState} from 'react'

import {Toaster} from "react-hot-toast";
import {useAuthStore} from "./store/useAuthStore.js";
import {Loader} from "lucide-react";
import MainPage from "./pages/MainPage.jsx";
import {Routes, Route, Navigate} from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import {useThemeStore} from "./store/useThemeStore.js";
import Login from "./pages/Login.jsx";
import PremiumModal from "./components/PremiumModal.jsx";
import Premium from "./components/Premium.jsx";
import Verify from "./pages/Verify.jsx";



const App = () => {
    const [closedPremModal, setClosedPremModal] = useState(true)
    const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore()
    const {theme} = useThemeStore()
    console.log(onlineUsers)

        useEffect(() => {
                useAuthStore.getState().connectSocket();

        }, [])
    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    if (isCheckingAuth && !authUser) {
        return <div className='h-[100vh] flex items-center justify-center'>
            <Loader  className='size-10 animate-spin text-blue-500 '/>
        </div>
    }


    return (
        <div data-theme={theme}>


                 <div  className='w-full min-h-screen flex overflow-x-hidden  '>
                  <Routes>
                      <Route path='/' element={authUser ? <MainPage closedPremModal={closedPremModal} setClosedPremModal={setClosedPremModal} /> : <Navigate to='login'/>}/>
                      <Route path='/signup' element={authUser ?<SignUp/> : <Navigate to='/'/>}/>

                      <Route path='/login' element={authUser ? <Login/> : <Navigate to='/'/>}/>
                      <Route path='/verify' element={<Verify/>}/>

                  </Routes>
                     {!closedPremModal && <PremiumModal closedPremModal={closedPremModal} setClosedPremModal={setClosedPremModal}>
                         <Premium closedPremModal={closedPremModal} setClosedPremModal={setClosedPremModal}/>
                     </PremiumModal>}



                    <Toaster/>
                </div>
        </div>
    )
}
export default App
