import React,{ createContext, useEffect, useState} from 'react'
import app from '../firebase/firebase.config'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth' 
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

export const AuthContext = createContext()
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginwithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // login with email and password
    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout
    const logout = () => {
        setLoading(true);
        return signOut(auth)
    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth,currentUser => {
            // console.log(currentUser)
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    },[])

    const authInfo = {
        user,
        createUser,
        loginwithGoogle,
        loading,
        login,
        logout,
        
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider