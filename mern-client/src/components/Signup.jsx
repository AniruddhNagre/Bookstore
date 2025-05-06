import React, { useContext, useState, } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'
import googleLogo from '../assets/google-logo.svg'



const Signup = () => {
    const { createUser, loginwithGoogle } = useContext(AuthContext);
    const [error, setError] = useState("");


    const location = useLocation()
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || '/';

    const handleSignUp = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value

        createUser(email, password).then((userCredential) => {
            // Signed in
            const user = userCredential.user
            alert("User Created Successfully")
            navigate(from, { replace: true })
        }
        ).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            setError(errorMessage)
        })
    }

    // sign in with google
    const handleRegister = async () => {
        try {
            const result = await loginwithGoogle();
            const user = result.user;

            alert("User Created Successfully");

            // Navigate to the previous page or default route
            navigate(from, { replace: true });
        } catch (error) {
            // Optional: log error for debugging
            console.error("Google Sign-In Error:", error);

            // Show a more user-friendly message if needed
            const errorMessage = error.message || "Something went wrong during sign-in.";
            setError(errorMessage);
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 text-center">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Sign up Form</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <form onSubmit={handleSignUp} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input id="email" name="email" type="text" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                                </div>
                                <div className="relative">
                                    <input id="password" name="password" type="password" className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                </div>
                                <p>If you have an account. Please <Link to='/login' className='text-blue-600 underline'>Login</Link> here.</p>
                                <div className="relative" >
                                    <button className="bg-blue-500 text-white rounded-md px-6 py-2">Sign up</button>
                                </div>

                                <div className="flex w-full items-center flex-col mt-5 gap-3">
                                    <button
                                        onClick={handleRegister}
                                        className="flex items-center gap-2 px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition"
                                        aria-label="Login with Google"
                                    >
                                        <img src={googleLogo} alt="Google logo" className="w-8 h-8 inline-block" />
                                        <span>Login with Google</span>
                                    </button>
                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup