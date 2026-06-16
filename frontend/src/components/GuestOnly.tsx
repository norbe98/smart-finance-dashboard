import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GuestOnly({children}: {children: React.ReactNode}) {
    const { user } = useAuth()

    if(user) {
        return ( 
            <Navigate to={"/"}  replace />
        )
    }
    return children
}