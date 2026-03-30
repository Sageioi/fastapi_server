import { useState,useEffect } from 'react'
import {Link} from 'react-router-dom';
import main_image from '../assets/pexels-edmond-dantes-8067744.jpg'


const LandingPage = () => {
    return (
    <div className="bg-purple-400  h-screen w-screen flex">
        <div>
        <div className='bg-purple-400 h-15 w-screen flex justify-between text-white'>
        <div className= 'top flex p-4 font-extrabold font-mono'>
            <span>Built by TegaTech</span>
        </div>
        <div className='right flex p-4 pr-10 font-extrabold font-mono '>
            <ul className='flex space-x-10'>
                <li><Link to="/create_account">Sign Up</Link></li>
                <li><Link to = "/login">Login</Link></li>
                <li><Link to = "/about"><button>About</button></Link></li>
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
            <div className='w-screen text-white font-mono font-bold bg-purple-400 h-15 mono flex justify-center items-center'>
                Put Copyrights and cool shit here
            </div>
        </div>
    </div>
    </div>
   
    )
}

export default LandingPage;