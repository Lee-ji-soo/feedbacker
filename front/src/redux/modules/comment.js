import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import firebase from "firebase/app";
import { firestore, realtime } from "../../shared/firebase";
import moment from "moment";
import { history } from "../configureStore";
import { actionCreators as postActions } from "./post";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DEL_COMMENT = "DEL_COMMENT";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({post_id, comment_list}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({post_id, comment}));
const delComment = createAction(DEL_COMMENT, (post_id, comment_id) => ({post_id, comment_id}));

const initialState = {
  list: {},
};

const addCommentFB = (post_id, contents) => async(dispatch, getState) => {
  const commentDB = firestore.collection("comment");
  const user_info = getState().user.user;

  let comment = {
    post_id,
    user_id: user_info.uid,
    user_name: user_info.user_name,
    user_profile: user_info.user_profile,
    contents,
    insert_dt: moment().format("YYYY-MM-DD HH:mm"),
  }

  try{
    const doc = await commentDB.add(comment);
    const postDB = firestore.collection("post");
    const post = await getState().post.list.find( l => l.id === post_id)
    const increment = firebase.firestore.FieldValue.increment(1);
    comment = {...comment, id: doc.id}
  
    postDB.doc(post_id).update({ comment_cnt : increment });
    dispatch(addComment(post_id, comment));
    
    if(post){
      dispatch(postActions.updatePost(post_id, { comment_cnt: parseInt(post.comment_cnt) + 1}))
    }

    //noti
    const _noti_item = await realtime.ref(`noti/${post.user_info.user_id}/list`).push();
    _noti_item.set({
      post_id,
      user_name: comment.user_name,
      image_url: post.image_url,
      insert_dt: comment.insert_dt,
    }, err => {
      if(err){
        console.log("noti save error", err)
      }else{
        const cur_user_id = user_info.uid
        const post_user_id = post.user_info.user_id
        const notiDB = realtime.ref(`noti/${post.user_info.user_id}`);
        if (post_user_id !== cur_user_id){
          notiDB.update({ read: false })
        }else{ return }
      }
    })
  }catch(err){
    console.log(err);
  }
};

const getCommentFB = (post_id = null) => async( dispatch ) => {
  if(!post_id){return};
  try{
    const commentDB = firestore.collection("comment");
    const docs = await commentDB
      .where("post_id", "==", post_id)
      .orderBy("insert_dt", "desc")
      .get()
    
    let list = [];
    docs.forEach(doc => { list.push({...doc.data(), id: doc.id})})
    dispatch(setComment(post_id, list));
  }catch(err){
    console.log(err);
  }

  return;
}

const delCommentFB = (comment_id = null, post_id = null) => async( dispatch ) => {
  if(!comment_id || !post_id){return}
  const commentDoc = await firestore.collection("comment").doc(comment_id);
  commentDoc.delete();
  dispatch(delComment(post_id, comment_id));
}


export default handleActions(
  {
    [SET_COMMENT]: (state, action) => produce(state, draft => {
      draft.list[action.payload.post_id] = action.payload.comment_list;
    }),
    [ADD_COMMENT]: (state, action) => produce(state, draft => {
      draft.list[action.payload.post_id].unshift(action.payload.comment);
    }),
    [DEL_COMMENT]: (state, action) => produce(state, draft => {
      const idx = draft.list[action.payload.post_id].findIndex(d => d.id === action.payload.comment_id);
      draft.list[action.payload.post_id].splice(idx, 1)
    })
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  addCommentFB,
  delCommentFB,
  setComment,
  addComment,
};

export { actionCreators };