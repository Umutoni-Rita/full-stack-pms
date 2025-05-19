import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({requireEmail = false}) => {
    const token = localStorage.getItem('token');
    const location = useLocation();
    let isValidToken = false;

    //check if token exists and is not expired
    if (token) {
        try{
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if(decoded.exp > currentTime) {
                isValidToken = true;
            }
        } catch (error) {
            console.error('Invalid token: ', error);
        }
    }

    //For routes requiring email
    const hasEmail = requireEmail? !!location.state?.email : true;

    if(!isValidToken || !hasEmail) {
        return <Navigate to="/" state={{from: location}} replace />
    }

    return <Outlet />;
}

export default ProtectedRoute;