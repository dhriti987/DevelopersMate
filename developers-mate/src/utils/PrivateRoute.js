import {Navigate,Outlet} from 'react-router-dom';

function PrivateRoute(){
    const isLoggedIn = localStorage.getItem("access") ? true : false;
    const local= localStorage.getItem("profile")
    const isProfileExist = local ? (local==="true" ? true : false) : false
    
    if(!isLoggedIn){
        return <Navigate to="/"/>
    }
    else if(!isProfileExist) {
        return <Navigate to="/addUserDetails"/>
    }
    else {
        return  <Outlet/> 
    }
} 

export default PrivateRoute;