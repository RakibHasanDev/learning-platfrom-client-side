import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    
    const providerLoginPop = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider);

    };
    const createAccount = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    };
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    };
 
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('user inside state change', currentUser);
            setUser(currentUser)
            
            setLoading(false)


        });
        return () => {
            unsubscribe();
        }
    }, [])


    const authInfo = {
        user,
        providerLoginPop,
        createAccount,
        updateUserProfile,
        signIn,
        logOut,
        loading
        


    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}

            </AuthContext.Provider>
            
        </div>
    );
};

export default AuthProvider;