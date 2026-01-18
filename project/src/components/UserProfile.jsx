import {Navigate} from "react-router"
const UserProfile = ({ isLoggedIn, username }) => {
    return (
        <div>
            {isLoggedIn
                ? (
                
                <Navigate to='/'  />
                )
                : (
                
                <Navigate to='/login'  />
                )
            }
        </div>
    );
};

export default UserProfile;