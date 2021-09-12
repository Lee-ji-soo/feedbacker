import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { history } from "../configureStore";
import { auth, storage, realtime } from "../../firebase";
import firebase from "firebase/app";
import { User, LoginFB } from "./userTypes";

//actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
const LOADING = "LOADING";

//action creators
const setUser = createAction(SET_USER, (user: User) => ({ user }));
const logOut = createAction(LOG_OUT, (user: User) => ({ user }));
const getUser = createAction(GET_USER, (user: User) => ({ user }));
const loading = createAction(LOADING, (loading: boolean) => ({ loading }));

const initialState = {
  user: null,
  is_login: false,
  loading: false,
};

//middleware actions
const loginFB =
  ({ id, pwd }: LoginFB) =>
  async (dispatch) => {
    dispatch(loading(true));
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    try {
      const user = await auth.signInWithEmailAndPassword(id, pwd);
      dispatch(
        setUser({
          user_name: user.user.displayName,
          id,
          user_profile: user.user.photoURL,
          uid: user.user.uid,
        })
      );
      dispatch(loading(false));
      history.push("/", { from: location.pathname });
    } catch (err) {
      window.alert(err.message);
      dispatch(loading(false));
    }
  };

const joinFB = (id, pwd, user_name, preview) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const user = await auth.createUserWithEmailAndPassword(id, pwd);
    const _upload = await storage
      .ref(`images/${user.user.uid}_profile_${new Date().getTime()}`)
      .putString(preview, "data_url");

    const _profile = await _upload.ref.getDownloadURL();

    auth.currentUser.updateProfile({
      displayName: user_name,
      photoURL: _profile,
    });

    dispatch(
      setUser({
        user_name,
        id,
        user_profile: user.user.photoURL,
        uid: user.user.uid,
      })
    );
    history.replace("/");
    // user id로 - noti reatimedb 생성
    realtime.ref(`noti/${user.user.uid}`).push();
    dispatch(loginFB(id, pwd));
    dispatch(loading(false));
  } catch (err) {
    window.alert("회원가입에 실패했습니다.");
    console.log(err);
    dispatch(loading(false));
  }
  return;
};

const loginCheckFB = () => (dispatch) => {
  dispatch(loading(true));
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        setUser({
          user_name: user.displayName,
          id: user.email,
          uid: user.uid,
          user_profile: user.photoURL,
        })
      );
      dispatch(loading(false));
    } else {
      dispatch(logOut());
      dispatch(loading(false));
    }
  });
};

const logoutFB = () => async (dispatch) => {
  auth.signOut();
  dispatch(logOut());
  history.replace("/");
  return;
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
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.loading = action.payload.loading;
      }),
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
