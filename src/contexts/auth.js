import React, { useState, useEffect, createContext } from 'react';
import firebase from '../services/firebaseConnection';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadinAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadingStorage() {
      const storageUser = localStorage.getItem('systemUser');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    }
    loadingStorage();
  }, [])

  async function signIn(email, password) {
    setLoadinAuth(true);
    await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        const userProfile = await firebase.firestore().collection('users')
          .doc(uid).get();

        let data = {
          uid: uid,
          name: userProfile.data().name,
          avatarUrl: userProfile.data().avatarUrl,
          email: value.user.email
        }
        setUser(data);
        storageUser(data);
        setLoadinAuth(false);
        toast.success('Login Successfully!')
      })
      .catch((error) => {
        console.log('error Signin in firebase: ', error);
        toast.error('Ops, something when wrong! Please check your data...')
        setLoadinAuth(false);
    })
  }


  async function signUp(email, password, name) {
    setLoadinAuth(true);
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( async (value) => {
        let uid = value.user.uid;

        await firebase.firestore().collection('users')
          .doc(uid).set({
            name: name,
            avatarUrl: null,
          })
          .then(() => {
            let data = {
              uid: uid,
              name: name,
              email: value.user.email,
              avatarUrl: null,
            };
            setUser(data);
            storageUser(data);
            setLoadinAuth(false);
            toast.success('Welcome Support System!')
        })
      })
      .catch((error) => {
        console.log(error);
        toast.error('Ops, something when wrong in your Sign Up!')
        setLoadinAuth(false);
      })
  }

  function storageUser(data) {
    localStorage.setItem('systemUser', JSON.stringify(data));

  }

  async function signOut() {
    await firebase.auth().signOut();
    localStorage.removeItem('systemUser');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{
      signed: !!user,
      user,
      loading,
      signUp,
      signOut,
      signIn,
      loadingAuth,
      setUser,
      storageUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
