import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import api from "../route_section/api";
import { useNavigate } from "react-router-dom";

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
   <button className = {"bg-white font-medium border-2 border-purple-400 text-purple-400 p-1 rounded-md"} onClick={() => handleLogin()}
 >Submit</button>
  )
}


const CreateAccount = () => {
  const isMobile = useMediaQuery({ maxWidth: 320 });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [debouncedEmail, setDebouncedEmail] = useState('');
  const [debouncedPass, setDebouncedPass] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

   
const handleLogin = async () => {
    setLoading(true);
    
    const bodyData = new FormData();
    bodyData.append("email", debouncedEmail);
    bodyData.append("password", debouncedPass);
    bodyData.append("is_active", true);
    bodyData.append("is_superuser", false);
    bodyData.append("is_verified", false);

    try {
      const response = await api({url:`/auth/register`,
        method:"post",
        headers : {"Content-Type":"application/json"},
        data: bodyData,
        timeout: 7000,
      })
      if (response.status == 201 ) {
        alert("Your account has been created.")
        navigate("/login")
      } else {
        alert("Something went wrong with the server, try again later.");
      }
    } catch (error) {
      console.error("Check your Internet Connection or this error message:", error.message);
    } finally {
      setLoading(false);
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
      <div className={`bg-white rounded-md shadow-2xl  p-6 ${isMobile ? "w-64 h-70" : "w-96 h-60 "}`}>
        <div className="flex justify-center items-center font-medium"><span className="top text-purple-400">Create Account</span></div>
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
        <div className="flex justify-center items-center p-5">
          <Button handleLogin={handleLogin} />
        </div>
      </div>
    </div>
  );
}


export default CreateAccount;