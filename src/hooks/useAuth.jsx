import { useContext, createContext, useState } from "react";
import PropTypes from "prop-types";
import { auth, provider } from "../.config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const userInfoString = localStorage.getItem("authInfo");
    if (userInfoString) {
      const { email, userId, isAuth } = JSON.parse(userInfoString);
      return { email, userId, isAuth };
    }
    return { email: null, userId: null, isAuth: false };
  });

  const signUp = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return response.user;
    } catch (error) {
      console.error("Error signing up:", error.message);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const authInfo = {
        userId: response.user.uid,
        email: response.user.email,
        isAuth: true,
      };
      localStorage.setItem("authInfo", JSON.stringify(authInfo));
      setAuthState(authInfo);
      return response.user;
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("authInfo");
      setAuthState({ email: null, userId: null, isAuth: false });
      console.log("Sign Out successful");
    } catch (error) {
      console.error("Error signing out:", error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ signUp, signIn, signInWithGoogle, logOut, authState }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
