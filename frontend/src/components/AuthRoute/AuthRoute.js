import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

const AuthRoute = ({children}) => {
    const location = useLocation();
    const {admin} = useAuth();
    return admin && admin['token']? (children) : (
        <Navigate to={`/login?returnUrl=${location.pathname}`} replace />
    );
}
export default AuthRoute;