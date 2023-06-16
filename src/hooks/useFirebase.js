import { useEffect, useState } from 'react';
import initializeFirebase from '../Pages/Login/Firebase/firebase.init';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


// initialize firebase app
initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');

    const auth = getAuth();

    // email password registration
    const registerUser = (email, password, name, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const newUser = { email, displayName: name };
                setUser(newUser);

                // save user to the database
                // saveEmailUser(email, name, mobileNo, venueRegistationNo, 'pending');

                // send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });
                history('/');
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    };


    // email password login 
    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                history(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }


    // email password logout
    const emailLogOut = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setIsLoading(false));
    };


    // google sign in
    const signInUsingGooogle = () => {
        setIsLoading(true);
        const googleProvider = new GoogleAuthProvider();

        signInWithPopup(auth, googleProvider)
            .then(result => {
                setUser(result.user);

                // save user to the database
                // saveGoogleUser(result.user.email, result.user.displayName, "pending", "0", [], []);
            })
            .catch(error => {
            })
            .finally(() => setIsLoading(false));
    }



    // google log out
    const googleLogOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => { })
            .finally(() => setIsLoading(false));
    };


    // observe user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            } else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribe;
    }, [auth]);




    // const saveEmailUser = (email, name, mobileNo, venueRegistationNo, status) => {
    //     const user = { email, name, mobileNo, venueRegistationNo, status };
    //     fetch('https://toyshouse-server.onrender.com/users', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     })
    //         .then()
    // }


    // const saveGoogleUser = (email, name) => {
    //     const user = { email, name };
    //     fetch('https://toyshouse-server.onrender.com/users', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(user)
    //     })
    //         .then()
    // }


    return {
        user,
        isLoading,
        registerUser,
        loginUser,
        emailLogOut,
        signInUsingGooogle,
        googleLogOut,
        authError
    }

}


export default useFirebase;