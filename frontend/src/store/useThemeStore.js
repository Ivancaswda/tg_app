import {create} from "zustand";

export const useThemeStore = create((setState) => ({
    theme: localStorage.getItem('chat-theme') || 'light',
    setTheme: (theme) => setState({theme}) // user can choose theme of website
}))