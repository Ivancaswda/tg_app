import React, {useEffect, useState} from 'react'
import Sidebar from "../components/Sidebar.jsx";
import {Toaster} from "react-hot-toast";
import {useAuthStore} from "../store/useAuthStore.js";
import {useChatStore} from "../store/useChatStore.js";
import ChatContainer from "../components/ChatContainer.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import {useThemeStore} from "../store/useThemeStore.js";
import Profile from "../components/Profile.jsx";

const MainPage = ({closedPremModal, setClosedPremModal}) => {
    const {selectedUser} = useChatStore()
    const {logout, authUser} = useAuthStore()
    const [profileData ,setProfileData] = useState(false)
    const [showProfileData, setShowProfileData] = useState(false)
    const {showProfile, setShowProfile} = useChatStore()
    const {theme} = useThemeStore()
    console.log(showProfile)
    console.log(showProfileData)
    useEffect(() => {
        console.log(theme)
    },[theme])
    return (
        <div data-theme={theme} className={`w-[100%] min-h-screen block sm:flex    `}>

            <div className={`${selectedUser && 'hidden sm:block'} w-[100%] sm:w-[44%] md:w-[34%] lg:w-[26%] relative  `}>


                { showProfile ? <Profile closedPremModal={closedPremModal} setClosedPremModal={setClosedPremModal} profileData={profileData} setProfileData={setProfileData} showProfileData={showProfileData} setShowProfileData={setShowProfileData} /> :  <Sidebar profileData={profileData} setProfileData={setProfileData}/>}

            </div>
            <div className=' w-[100%] sm:w-[64%] md:w-[66%] lg:w-[74%] flex h-full  rounded-lg overflow-hidden'>
                {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}


            </div>


        </div>
    )
}
export default MainPage
