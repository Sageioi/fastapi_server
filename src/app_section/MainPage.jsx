import { useState,useEffect } from 'react'
import { useMediaQuery } from "react-responsive";

const Create_Task = () => {
    const isMobile = useMediaQuery({ maxWidth: 320 });
    return (
        <div className= {`bg-purple-400 flex h-screen w-full  justify-center items-center`}>
        </div>
    )
    
}

export default Create_Task; 
