import { useState,useEffect } from 'react'
import {Link} from 'react-router-dom';
import main_image from '../assets/pexels-edmond-dantes-8067744.jpg'
import react_svg from '../assets/react.svg'
import python_svg from '../assets/python-svgrepo-com.svg'
import copyright_svg from '../assets/copyright-svgrepo-com.svg'
import trademark_svg from '../assets/trademark-svgrepo-com.svg'

const LandingPage = () => {
    return (
    <div className="bg-purple-400  h-screen w-screen flex">
        <div>
        <div className='bg-purple-400 h-15 w-screen flex justify-between text-white'>
        <div className= 'top flex p-4 font-extrabold font-mono'>
            <ul className='flex space-x-3'>
            <li><span>TegaTask.</span></li>
            <li><span>Built by TegaTech.</span></li>
            </ul>
        </div>
        <div className='right flex p-4 pr-10 font-extrabold font-mono '>
            <ul className='flex space-x-10'>
                <li><Link to="/create_account">Sign Up</Link></li>
                <li><Link to = "/login">Login</Link></li>
            </ul>
        </div>
        </div>
        <div>
            <div className='w-screen grid bg-white grid-cols-2'>
                <div className='w-4/4 text-purple-400 flex justify-center font-mono p-10 items-center'>
                    <span className='text-7xl '>More than a<br/>to-do list. <br/>Organizing Productivity for Individuals.</span>
                </div>
                <div className='text-4xl w-4/4  flex justify-center items-center text-purple-400'>
                    <img src={main_image} loading='lazy'/>
                </div>
            </div>
            <div className='w-screen text-white p-3 font-mono font-bold bg-purple-400 h-15 flex mono justify-between items-center'>
                <ul className='flex items-center space-x-2'>
               <li><img src={copyright_svg} className='h-5'/></li>
                <li><span>Tegatech technologies</span></li>
                </ul>
                <ul className='flex items-center space-x-2'>
               <li><span>Built with React</span></li>
               <li><img src={react_svg} className='h-5'/></li>
                <li><span> and Powered by Python</span></li>
               <li><img src={python_svg} className='h-8'/></li>
               </ul>
                <ul className='flex items-center space-x-1'>
                 <li><img src={trademark_svg} className='h-4'/></li>
                 <li><span>Tegatask</span></li>
               </ul>
               </div>
            </div>
        </div>
    </div>

   
    )
}

export default LandingPage;