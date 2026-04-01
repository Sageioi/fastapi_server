import { useState,useEffect } from 'react'
import LoginPage from "./auth_section/LoginPage.jsx"
import LandingPage from './app_section/LandingPage.jsx';
import { useMediaQuery } from "react-responsive";

const App = () => {
    const isDesktop = useMediaQuery({minWidth:1024})

    if (isDesktop == true){
        return (
            <LandingPage/>
        )
    }
    else {
        return (
            <LoginPage/>
        )
    }
}

export default App; 

