import React, {useContext} from 'react'
import { AuthContext } from '../context/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';


const Logout = () => {
    const {logout} = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || '/';
    const handleLogout = () => {
        logout()
        .then(() => {
            // Sign-out successful.
            alert('Log out successful')
            navigate(from, {replace: true})
        })
        .catch(err => {
            const errorcode = err.code;
            const errorMessage = err.message;
        })
    }


    return (
    <div className='h-screen bg-teal-100 flex items-center justify-center'>
        <button className='bg-red-700 px-8 py-2 text-white rounded' onClick={handleLogout}>Log out</button>
    </div>
    )
}

export default Logout