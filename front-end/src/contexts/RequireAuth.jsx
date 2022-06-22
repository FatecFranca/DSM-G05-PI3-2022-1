import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import NotFound from '../pages/other/notFound';



export const RequireAuth = ({ children }) => {
    const auth = useContext(AuthContext);


    if(!auth.user) {
        return <NotFound />;

    }

    return children;
}