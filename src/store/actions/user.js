import Constants from "../constants";
import { Firebase, Database } from "../../services/firebase";
import firebase from "firebase/app";
import { toast } from "react-toastify";

const LoginGoogle = (callBack) => {
  return async (dispatch, getState) => {
    dispatch({
      type: Constants.User.LOGIN_REQUEST,
      payload: null,
    });
    try {
      callBack(true);
      const provider = new firebase.auth.GoogleAuthProvider();
      const googleLogin = await Firebase.auth().signInWithPopup(provider);
      const userFromFirestore = await Database.collection("users")
        .doc(googleLogin.user.uid)
        .get();
      const payload = {
        uid: userFromFirestore.id,
        ...userFromFirestore.data(),
      };
      if (!userFromFirestore.exists) {
        const userUID = googleLogin.user.uid;
        await Database.collection("users")
          .doc(userUID)
          .set(
            {
              email: String(googleLogin.user.email).trim(),
              fullname: String(googleLogin.user.displayName).trim(),
              info: "",
              username: "",
            },
            { merge: true }
          );
        payload.email = String(googleLogin.user.email).trim();
        payload.fullname = String(googleLogin.user.displayName).trim();
      }

      dispatch({
        type: Constants.User.LOGIN_SUCCESS,
        payload,
      });
      toast.success("Login Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      callBack(false);
    } catch (error) {
      dispatch({
        type: Constants.User.LOGIN_FAILED,
        payload: null,
      });
      toast.error(error.message || "Something Went Wrong", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      callBack(false);
    }
  };
};

const LoginWithEmail = ({ payload: params, handleLoading }) => {
  return async (dispatch, getState) => {
    dispatch({
      type: Constants.User.LOGIN_REQUEST,
      payload: null,
    });
    try {
      handleLoading(true);
      const userFromAuth = await Firebase.auth().signInWithEmailAndPassword(
        params.email,
        params.password
      );
      const userFromFirestore = await Database.collection("users")
        .doc(userFromAuth.user.uid)
        .get();
      const payload = {
        uid: userFromFirestore.id,
        ...userFromFirestore.data(),
      };
      if (params.email === "admin@findfun.com") payload.isAdmin = true;
      dispatch({
        type: Constants.User.LOGIN_SUCCESS,
        payload,
      });
      toast.success("Login Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      handleLoading(false);
    } catch (error) {
      // alert(error.message);
      dispatch({
        type: Constants.User.LOGIN_FAILED,
        payload: null,
      });
      handleLoading(false);
      toast.error(error.message || "Something Went Wrong", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
};

const StoreUserUpdate = (params) => {
  return async (dispatch, getState) => {
    dispatch({
      type: Constants.User.LOGIN_UPDATE,
      payload: params,
    });
  };
};

const Logout = (params) => {
  return async (dispatch, getState) => {
    localStorage.removeItem("user");
    await Firebase.auth().signOut();
    dispatch({
      type: Constants.User.LOGIN_LOGOUT,
      payload: params,
    });
  };
};

export default {
  LoginGoogle,
  LoginWithEmail,
  StoreUserUpdate,
  Logout,
};
