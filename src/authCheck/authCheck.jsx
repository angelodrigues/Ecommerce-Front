import { Navigate, useLocation } from "react-router";
import { useAuth } from "./AuthContext";

export default function AuthCheck({children}) {
    const { user } = useAuth();
    const location = useLocation();
    
    if(!user) {
        if (location.pathname === '/auth/user') {
            return <Navigate to="/auth/login" state={{from: location}} />
        }
        return <Navigate to="/error" state={{from: location}} />
    }
    
    return children;
}