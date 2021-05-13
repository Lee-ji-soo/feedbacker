import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { storage } from "../../shared/firebase";

const UPLOADING = "UPLOADING";
const UPLOAD_IMG = "UPLOAD_IMG";
const SET_PREVIEW = "SET_PREVIEW";

const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImg = createAction(UPLOAD_IMG, (image_url) => ({ image_url }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const initialState = {
  image_url: "",
  uploading: false,
  preview: null,
};

//File로 이미지 업로드하기.
const uploadImgFB = (img) => {
  return function (dispatch, getState, { history }) {
    dispatch(uploading(true));

    const _upload = storage.ref(`images/${img.name}`).put(img);

    _upload.then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        dispatch(uploadImg(url));
        console.log(url);
      });
    });
  };
};

export default handleActions(
  {
    [UPLOAD_IMG]: (state, action) =>
      produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = false;
      }),
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

const actionCreators = {
  uploadImgFB,
  setPreview,
};

export { actionCreators };
