import React, { Fragment } from "react";
import {Grid, Text, Input, Button} from "../elements";

const CommentInput = (props) => {
  return(
    <Grid is_flex>
      <Input width="90%" placeholder="댓글 내용을 입력해주세요 :)"/>
      <Button width="10%" bg="light" txt="작성"/>
    </Grid>
  )
};

CommentInput.defaultProps = {};

export default CommentInput;