import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { history } from "../configureStore";
import { auth } from "../../shared/firebase";
import firebase from "firebase/app";

//actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
const LOADING = "LOADING";

//action creators
const setUser = createAction(SET_USER, user => ({ user }));
const logOut = createAction(LOG_OUT, user => ({ user }));
const getUser = createAction(GET_USER, user => ({ user }));
const loading = createAction(LOADING, loading => ({ loading }));

const initialState = {
  user: null,
  is_login: false,
  loading: false,
};

//middleware actions
const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        auth
          .signInWithEmailAndPassword(id, pwd)
          .then((user) => {
            dispatch(
              setUser({
                user_name: user.user.displayName,
                id,
                user_profile: "",
                uid: user.user.uid,
              })
            );
            dispatch(loading(false));
            history.push("/");
          })
          .catch(err => {
            window.alert("로그인에 실패했습니다.");
            dispatch(loading(false));
          });
      })
      .catch(err => {
        window.alert("로그인에 실패했습니다.");
        dispatch(loading(false));
      });
  };
};

const joinFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
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
            dispatch(loading(false));
          })
          .catch((err) => {
            window.alert("회원가입에 실패했습니다.");
            dispatch(loading(false));
          });
      })
      .catch(err => {
        window.alert("회원가입에 실패했습니다.");
        dispatch(loading(false));
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
    [SET_USER]: (state, action) => produce(state, (draft) => {
      draft.user = action.payload.user;
      draft.is_login = true;
    }),
    [LOG_OUT]: (state, action) => produce(state, (draft) => {
      draft.user = null;
      draft.is_login = false;
    }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
    [LOADING]: (state, action) => produce(state, draft => {
      draft.loading = action.payload.loading;
    })
  }, initialState);

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
