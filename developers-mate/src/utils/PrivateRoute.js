import {Navigate,Outlet} from 'react-router-dom';

function PrivateRoute(){
    const isLoggedIn = localStorage.getItem("access") ? true : false;
    
    return isLoggedIn ? <Outlet/> : <Navigate to="/login"/>
}

export default PrivateRoute;