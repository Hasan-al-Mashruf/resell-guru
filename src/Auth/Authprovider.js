import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase/Firebase.confiq';


export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [loader, setLoader] = useState(true)

    const createUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const loginWithGoogle = (provider) => {
        setLoader(true)
        return signInWithPopup(auth, provider)
    }

    const logOutuser = () => {
        return signOut(auth)
    }

    const updateName = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: image
        }).then(() => {
            // Profile updated!
            // ...
        }).catch((error) => {
            // An error occurred
            // ...
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoader(false)
        });
        return () => unsubscribe();
    }, [])



    const authInfo = { user, loader, createUser, loginUser, logOutuser, updateName, loginWithGoogle }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;