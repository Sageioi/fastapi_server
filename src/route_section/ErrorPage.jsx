import {Link} from "react-router-dom"
import { useMediaQuery } from "react-responsive";

const ErrorPage = () => {
    const isMobile = useMediaQuery({ maxWidth: 320 });
    return (
        <div className={`bg-purple-400 flex justify-center items-center h-screen ${isMobile ? "text-2xl":"text-4xl"}`}>
        <ul className={`outline-none ${isMobile ? 'flex-1':'flex flex-col'}  justify-center items-center space-y-6`}>
            <li className="text-white font-extrabold">
            <span>Hi, User</span>
            </li>
            <li className="text-white  font-extrabold">
                You are doing a wrong task being here
            </li>
            <li className={`p-3 flex ${isMobile ? "w-40" : "flex-col w-56 "} items-center rounded-4xl`}>
                <Link to = {{pathname : "/"}}>
                <button className="text-white font-extrabold border-3 border-white p-2 rounded-lg">Go Back</button>
                </Link>
            </li>
            </ul>
        </div>
    )
}
export default ErrorPage