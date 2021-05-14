import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import moment from "moment";
import firebase from "firebase/app";
import { actionCreators as postActions } from "./post";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DEL_COMMENT = "DEL_COMMENT";
const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({post_id, comment_list}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({post_id, comment}));
const delComment = createAction(DEL_COMMENT, (post_id, comment_id) => ({post_id, comment_id}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

const addCommentFB = (post_id, contents) => {
  console.log("ADD_COMMENT");
  return function(dispatch, getState, {history}){
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

    commentDB
      .add(comment)
      .then(doc => {
        const postDB = firestore.collection("post");
        const post = getState().post.list.find( l => l.id === post_id)
        const increment = firebase.firestore.FieldValue.increment(1);
        comment = {...comment, id: doc.id}

        postDB
          .doc(post_id)
          .update({ comment_cnt : increment } )
          .then(()=>{
            dispatch(addComment(post_id, comment));
            if(post){
              dispatch(postActions.updatePost(post_id, { comment_cnt: parseInt(post.comment_cnt) + 1}))
            }
          }).catch(err => {
            console.log(err);
          })
      }).catch(err => {
        console.log(err)
      })
  }
};

const getCommentFB = (post_id = null) => {
  if(!post_id){return}
  return function(dispatch, getState, { history }){
    const commentDB = firestore.collection("comment");
    commentDB
      .where("post_id", "==", post_id)
      .orderBy("insert_dt", "desc")
      .get()
      .then(docs => {
        let list =[]
        
        docs.forEach(doc=>{
          list.push({...doc.data(), id: doc.id})
        })

        dispatch(setComment(post_id, list))
      }).catch(err=>{
        console.log('get comment err', err);
      });
  }
}

const delCommentFB = (comment_id = null, post_id = null) => {
  if(!comment_id || !post_id){return}
  return function(dispatch, getState, { history }){
    const commentDoc = firestore.collection("comment").doc(comment_id);
    commentDoc.delete()
    .then(()=>{
      dispatch(delComment(post_id, comment_id))
    }).catch(err => {
      console.log("delete error", err)
    })
  }
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
    }),
    [LOADING]: (state, action) => produce(state, draft => {
      draft.is_loading = action.payload.is_loading;
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