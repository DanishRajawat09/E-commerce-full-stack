
import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";
const AccessProtect = ({accessName , refreshName , redirectPath}) => {
    const accessToken = Cookies.get(accessName)
    const refreshToken = Cookies.get(refreshName)


    if (!accessToken && !refreshToken) {
        return <Navigate to={redirectPath}/>
    }
    if (accessToken) {
        return <Outlet/>
    }
    if (!accessToken && refreshToken) {
        console.log(true);
        
    }

}

export default AccessProtect
