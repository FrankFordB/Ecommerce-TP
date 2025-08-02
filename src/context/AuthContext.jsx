import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { db } from "../config/firebase";
import { getDoc, doc } from "firebase/firestore"; 
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                    if (userDoc.exists()) {
                        setUser({
                            uid: currentUser.uid,
                            email: currentUser.email,
                        });
                    } else {
                        setUser({
                            uid: currentUser.uid,
                            email: currentUser.email,
                        });
                    }
                } catch (error) {
                    console.error("Error al obtener los datos del usuario:", error);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

   
    const login = async (email, contrasena) => {
        try {
            return await signInWithEmailAndPassword(auth, email, contrasena);
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            throw error; 
        }
    };


    const register = async (email, contrasena) => {
        try {
            return await createUserWithEmailAndPassword(auth, email, contrasena);
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            throw error; 
        }
    };

   
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ login, register, user, logout, setUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider, useAuth };