import { createAction, handleActions } from "redux-actions";
import { firestore, storage } from "../../shared/firebase";
import { produce } from "immer";
import moment from "moment";
import { actionCreators as imageActions } from "../modules/image";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const UPDATE_POST = "UPDATE_POST";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const updatePost = createAction(UPDATE_POST, (id, contents) => ({id, contents}));

const initialState = {
  list: [],
};

const initialPost = {
  image_url:
    "https://1wecodereact.s3.ap-northeast-2.amazonaws.com/wishlist-blk-focus.svg",
  contents: "귀여운 강아지 입니다용",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
};

const updatePostFB = (contents = "", id) => {
  return function (dispatch, getState, {history}){
    const updateRef = firestore.collection("post").doc(id);
    const _preview = getState().image.preview;
    if(_preview === null){
      return updateRef
      .update({contents})
      .then(() => {
        dispatch(updatePost(id, {contents}))
        history.replace("/");
      })
      .catch((err)=>{
        console.log(err);
      })
    } else{
      const user_id = getState().user.user.uid;
      const _upload = storage.ref(`images/${user_id}_${new Date().getTime()}`).putString(_preview, "data_url");
      _upload.then(snapshot => {
        snapshot.ref
        .getDownloadURL()
          .then(url => {
            updateRef
            .update({...contents, image_url: url})
            .then(()=>{
              dispatch(updatePost(id, {...contents, image_url:url}))
              history.replace("/");
            })
          }).catch(err => {
            window.alert("이미지 업로드에 문제가 있습니다.")
            console.log(err);
          })
        })
      }
  }
}

const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    const _user = getState().user.user;

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost,
      contents,
      insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    const _image = getState().image.preview;

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          return url;
        })
        .then((url) => {
          //firebase Save Data
          postDB
            .add({ ...user_info, ..._post, image_url: url })
            .then((doc) => {
              let post = { user_info, ..._post, id: doc.id, image_url: url };
              dispatch(addPost(post));
              history.replace("/");
              dispatch(imageActions.setPreview(null));
            })
            .catch((err) => {
              console.log("포스트 작성에 실패했습니다.", err);
              console.log("포스트 작성에 실패했습니다.", err);
            });
        })
        .catch((err) => {
          window.alert("이미지 업로드에 문제가 있습니다.");
          console.log("업로드 문제가 있습니다.", err);
        });
    });
  };
};

const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post").orderBy("insert_dt", "asc");
    postDB.get().then((docs) => {
      let post_list = [];

      docs.forEach(doc => {
        let _post = doc.data();

        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf("user_") !== -1) {
              //user_정보가 있다면
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} }
        );
        post_list.push(post);
      });
      dispatch(setPost(post_list));
    });
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, draft => {
        draft.list = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, draft => {
        draft.list.unshift(action.payload.post);
      }),
    [UPDATE_POST] : (state, action) =>
      produce(state, draft => {
        let idx = draft.list.findIndex( d => d.id === action.payload.id);
        draft.list[idx] = {...draft.list[idx], ...action.payload.contents};
      })
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
  updatePostFB,
};

export { actionCreators };
