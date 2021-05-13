import React, { Fragment } from "react";
import { Post, CommentList, CommentInput } from "../components";

const PostDetail = (props) => {
  return(
    <Fragment>
      <Post/>
      <CommentInput/>
      <CommentList/>
    </Fragment>
  )
}

export default PostDetail