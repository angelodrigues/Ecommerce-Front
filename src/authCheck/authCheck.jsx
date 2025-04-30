import { Navigate, useLocation } from "react-router";

export default function AuthCheck({children}) {

    //Trocar dps para false
    const isAuthenticate = true;
    const location = useLocation();
    
    if(!isAuthenticate) {
        return <Navigate to="/auth/login" state={
            {from: location}
        }/>
    }
    
    return children;
}