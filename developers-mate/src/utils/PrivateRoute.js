import {Navigate,Outlet} from 'react-router-dom';


function PrivateRoute(){
    const token = localStorage.getItem("token");
    console.log(token);
    return token ? <Outlet/> : <Navigate to="/login"/>
}

export default PrivateRoute;