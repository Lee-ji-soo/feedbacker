import { createAction, handleActions } from "redux-actions";
import { firestore, storage } from "../../shared/firebase";
import { produce } from "immer";
import { history } from "../configureStore";
import moment from "moment";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const UPDATE_POST = "UPDATE_POST";
const LOADING = "LOADING";

const setPost = createAction(SET_POST, post_list => ({ post_list }));
const addPost = createAction(ADD_POST, post => ({ post }));
const updatePost = createAction(UPDATE_POST, (id, contents) => ({id, contents}));
const loading = createAction(LOADING, loading => ({ loading }));

const initialState = {
  list: [],
  loading: false,
};

const initialPost = {
  image_url:
    "https://1wecodereact.s3.ap-northeast-2.amazonaws.com/wishlist-blk-focus.svg",
  contents: "귀여운 강아지 입니다용",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD HH:mm:ss"),
};

const updatePostFB = (contents = "", id) => async (dispatch, getState) => {
  dispatch(loading(true));
  const updateRef = firestore.collection("post").doc(id);
  const _preview = getState().image.preview;
  if(_preview === null){
    try{
      updateRef.update({contents});
      dispatch(updatePost(id, {contents}));
      history.replace("/")
      dispatch(loading(false));
    }catch(err){
      window.alert("포스트 업데이트에 실패했습니다.");
      console.log(err);
      dispatch(loading(false));
    }
  }else{
    try{
      const user_id = await getState().user.user.uid;
      const _upload = await storage.ref(`images/${user_id}_${new Date().getTime()}`).putString(_preview, "data_url");
      const url = await _upload.ref.getDownloadURL();
      updateRef.update({...contents, image_url: url});
      dispatch(updatePost(id, {...contents, iamge_url : url }));
      history.replace("/");
      dispatch(loading(false));
    }catch(err){
      window.alert("포스트 업데이트에 실패했습니다.")
      console.log(err)
      dispatch(loading(false));
    }
  }
}

const addPostFB = (contents = "") => async(dispatch, getState) => {
  dispatch(loading(true));
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

  try{
    const storage_ref = storage.ref();
    const image_ref = await storage_ref.child(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url")
      .then(snapshot=>{console.log(snapshot); return snapshot});
    const _image_url = await image_ref.ref.getDownloadURL().then(url=> {return url})

    const doc = postDB.add({ ...user_info, ..._post, image_url: _image_url })
    let post = {
      user_info, 
      ..._post, 
      id: doc.id,
      image_url : _image_url
    };

    dispatch(addPost(post));
    dispatch(loading(false));
    history.push("/");
  }catch(err){
    console.log(err)
    window.alert("포스트 작성에 실패했습니다.");
    dispatch(loading(false));
  }
};

const getPostFB = () => async(dispatch) => {
  dispatch(loading(true));
  try{
    const postDB = firestore.collection("post").orderBy("insert_dt", "desc");
    const docs = await postDB.get()
    let post_list = [];
    await docs.forEach(doc => {
      let _post = doc.data();
      let post = Object.keys(_post).reduce(
        (acc, cur) => {
          if (cur.indexOf("user_") !== -1) { //user_정보가 있다면
            return {
              ...acc,
              user_info: { ...acc.user_info, [cur]: _post[cur] },
            };
          }else{
            return { ...acc, [cur]: _post[cur] };
          }
        },{ id: doc.id, user_info: {} });
      post_list.push(post);
    })
    dispatch(setPost(post_list));
    dispatch(loading(false));
  }catch(err){
    console.log(err)
  }
  return;
};

export default handleActions(
  {[SET_POST]: (state, action) => produce(state, draft => {
      draft.list = action.payload.post_list;
    }),
    [ADD_POST]: (state, action) => produce(state, draft => {
      draft.list.unshift(action.payload.post);
    }),
    [UPDATE_POST] : (state, action) => produce(state, draft => {
      let idx = draft.list.findIndex( d => d.id === action.payload.id);
      draft.list[idx] = {...draft.list[idx], ...action.payload.contents};
    }),
    [LOADING] : (state, action) => produce(state, draft => {
      draft.loading = action.payload.loading;
    })
  }, initialState);

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
  updatePostFB,
  updatePost,
};

export { actionCreators };
