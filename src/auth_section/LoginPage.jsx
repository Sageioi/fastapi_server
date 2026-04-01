import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"

const RenderError = () => {
  return (
    <div>
      <span className="text-purple-400 text-sm">Something went wrong. Try again.</span>
    </div>
  )
}

const InputField = ({ label, value, onChange, isMobile }) =>{
return (
  <li className={isMobile ? "flex flex-col" : "grid grid-cols-2 gap-4"}>
    <span className="text-purple-400">{label}</span>
    <input
      className="border-2 rounded-md focus:outline-purple-400 text-purple-400 p-1"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </li>
)};

const Button = ({handleLogin}) => {
 
  return (
   <button className = {"bg-white font-medium border-2 border-purple text-purple-400 p-1 rounded-md"} onClick={() => handleLogin()}
 >Submit</button>
  )
}

const LoginError = () => {
  return (
    <div>
      <span className="text-purple-400 text-sm">You brought in the wrong credentials</span>
    </div>
  )
}


const Login =  () => {
  const isMobile = useMediaQuery({ maxWidth: 320 });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [debouncedEmail, setDebouncedEmail] = useState('');
  const [debouncedPass, setDebouncedPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [userStatus , setUserStatus] = useState('')
  const navigate = useNavigate()
  const [unable, setUnable] = useState(false)



   
const handleLogin = async () => {
    setLoading(true);
    
    const bodyData = new URLSearchParams();

    bodyData.append("username", debouncedEmail);
    bodyData.append("password", debouncedPass);

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/auth/jwt/login',
        {
          method:"POST",
          headers : {"Content-Type":"application/x-www-form-urlencoded"},
          body : bodyData,
        }
      )
      const data = await response.json()
      console.log("Access token: ",data.access_token)
      sessionStorage.setItem("access_token",data.access_token)
      if (response.status == 200 ) {
        navigate("/main_page")
      } else {
        alert("Request failed");
      }
    } catch (error) {
      setUserStatus(<RenderError/>)

    } finally {
      setLoading(!loading);
    }
  };
  
 useEffect(
  () => {
    const handler = setTimeout(() => {
      setDebouncedEmail(email);
      setDebouncedPass(password);
    },500
    )
    return () => {
      clearTimeout(handler)
    }

  },[email,password]
 )
  return (
    <div className="bg-purple-400 h-screen w-screen flex justify-center items-center">
      <div className={`bg-white rounded-md shadow-2xl  p-6 ${isMobile ? "w-64 h-80" : "w-96 h-80 "}`}>
        <div className="flex justify-center items-center font-medium"><span className="top  text-purple-400">Login to your account</span></div>
        <ul className="space-y-4 font-medium m-3">
          <InputField 
            label="Email" 
            value={email} 
            onChange={setEmail} 
            isMobile={isMobile} 
          />
          <InputField 
            label="Password" 
            value={password} 
            onChange={setPassword} 
            isMobile={isMobile} 
          />
        </ul>
        <div className="h-5 flex justify-center items-center">
        {userStatus}
        </div>
        <div className={`flex flex-col justify-center items-center ${isMobile ? 'p-1':'p-3'} space-y-4`}>
          <Button handleLogin={handleLogin} />
          <Link to = "/create_account">
          <button className="bg-white border-2 border-purple-400 text-purple-400 p-1 rounded-md flex font-medium">Create Account</button>
          </Link>
        </div>
      </div>
    </div>
    
  );

};



export default Login;