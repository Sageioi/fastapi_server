import { useState,useEffect,useRef } from 'react'
import { useMediaQuery } from "react-responsive";
import notepad from '../assets/notepad-svgrepo-com.svg'
import add from '../assets/add-circle-svgrepo-com.svg'


const CreateTask = ({task,descr,handleSubmit}) => {
    return (
        <div className='h-15 w-screen p-2 flex items-center justify-center'>
            <div className='bg-white w-49/50 h-15 rounded-lg items-center p-2 flex justify-between text-1xl text-purple-400 font-medium'>
             <ul className='flex space-x-2'>
                <li className='space-x-2'><span>Name of Task</span><input className='border-2 p-2 h-6 rounded-lg outline-1 outline-purple-400' onChange={(e)=> task(e.target.value)}/></li>
                <li className='space-x-2'><span>Task Description</span><input className='border-2 p-2 h-6 rounded-lg outline-1 outline-purple-400' onChange={(e) => descr(e.target.value)}/></li>
             </ul>
             <ul className='pr-3'>
            <li><span><button className='border-2 text-sm border-purple-400 p-1 rounded-md' onClick={handleSubmit}>Submit</button></span></li>
            </ul>
            </div>
        </div>
    )
}


const Task_Manager = () => {
    const isMobile = useMediaQuery({ maxWidth: 320 });
    const [task_name, setTaskName] = useState('')
    const [task_descr, setTaskDescr] = useState('')
    const [c_task, setCTask] = useState()
    const [debouncedName, setDebouncedName] = useState('')
    const [debouncedDescr, setDebouncedDescr] = useState('')
    const debouncedNameRef = useRef('')
    const debouncedDescrRef = useRef('')
    console.log(`Debounced Name: ${debouncedName}, Debounced Description: ${debouncedDescr}`)
        useEffect (
        () => {
            const handler = setTimeout(
                () => {
                    setDebouncedName(task_name),
                    setDebouncedDescr(task_descr)
                    debouncedNameRef.current = task_name   // keep ref in sync
                    debouncedDescrRef.current = task_descr
                },500
            )
            return () => clearTimeout(handler)
        },[task_name,task_descr]
    )
    
   const create_task = async () => {
    const params = new URLSearchParams()
    params.append("task_name",debouncedNameRef.current)
    params.append("task_description",debouncedDescrRef.current)
    
    const access_token = sessionStorage.getItem("access_token")
    try {
        const response = await fetch('http://127.0.0.1:8000/create_task',{
            method : "POST",
            headers : {"Authorization" : `Bearer ${access_token}`,
                "Content-Type":"application/x-www-form-urlencoded"
            },
            body : params.toString()
        }
        )
          const data = await response.json()
          console.log(data)
        if (response.ok) {
            console.log("Task is Created")
        }
        else {
            console.log("Task creation not successful.")
            console.log()
        }
    }
    catch (error){
        console.log(`Check Internet Connection or this error message : ${error}`)
    }
}
    return (
        <div className= {`bg-purple-400 flex-col h-screen w-full`}>
            <div className='bg-white h-15 w-screen flex p-4 text-2xl font-mono justify-between text-purple-400'>
                <ul className='flex items-center space-x-3'>
                <li><span>Tegatask</span></li>
                <li><img src={notepad} className='h-6'/></li>
                </ul>
            </div>
            <div className='w-50 p-3 font-medium text-white flex'>
                <ul className='flex space-x-2 items-center pl-3'>
                <li ><span className='text-1xl'>Create New</span></li>
                <li className='pt-2'><button className='items-center' onClick={()=>setCTask(<CreateTask task = {setTaskName} descr = {setTaskDescr} handleSubmit={create_task}/>)}><img src={add} className='h-5'/></button></li>
                </ul>
            </div>
            {c_task}
        </div>
    )
    
}

export default Task_Manager; 
