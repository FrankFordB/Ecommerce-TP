import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { db } from "../config/firebase";
const AuthContext = createContext()
const useAuth = () => useContext(AuthContext)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        const unSuscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
        })
        return () => unSuscribe()
    }, [])


    //login
    
    const login = (email, contrasena) =>
        signInWithEmailAndPassword (auth, email, contrasena);
    
    //register
    const register = (email, contrasena) =>
        createUserWithEmailAndPassword (auth, email, contrasena)
    
    //sing out
    const logout = () => signOut(auth)
    
    
    return (
        <AuthContext.Provider value={{login, register, user, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export {AuthContext, AuthProvider, useAuth}