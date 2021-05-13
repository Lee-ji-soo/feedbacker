import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

import { auth } from "../../shared/firebase";
import firebase from "firebase/app";

//actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

//action creators
const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

const initialState = {
  user: null,
  is_login: false,
};

const user_initial = {
  user_name: "soolee",
};

//middleware actions
const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then((res) => {
        auth
          .signInWithEmailAndPassword(id, pwd)
          .then((user) => {
            console.log(user);
            dispatch(
              setUser({
                user_name: user.user.displayName,
                id,
                user_profile: "",
                uid: user.user.uid,
              })
            );

            history.push("/");
          })
          .catch((err) => {
            var errCode = err.code;
            var errMessage = err.message;
            console.log(errCode, errMessage);
          });
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
};

const joinFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
        console.log(user);
        auth.currentUser
          .updateProfile({
            displayName: user_name,
          })
          .then(() => {
            dispatch(
              setUser({
                user_name,
                id,
                user_profile: "",
                uid: user.user.uid,
              })
            );
            history.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        const errCode = err.code;
        const errMessage = err.message;
        console.log(errCode, errMessage);
      });
  };
};

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            user_name: user.displayName,
            user_profile: "",
            id: user.email,
            uid: user.uid,
          })
        );
      } else {
        dispatch(logOut());
      }
    });
  };
};

const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    auth.signOut().then(() => {
      dispatch(logOut());
      history.replace("/"); //history.push('/') : 뒤로가기 했을 때 돌아간다.
    });
  };
};

//reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

//export actioncreators
const actionCreators = {
  setUser,
  logOut,
  getUser,
  joinFB,
  loginFB,
  loginCheckFB,
  logoutFB,
};

export { actionCreators };
