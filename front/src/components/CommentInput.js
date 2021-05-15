import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Input, Button } from "../elements";
import { isLogined } from "../shared/Permit";
import { paddingStyle } from "../shared/styleUtils";
import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentInput = (props) => {
  const dispatch = useDispatch();
  const [comment_text, setCommentText ] = useState();
  const { id } = props;

  const write = e => {
    e.stopPropagation();
    setCommentText("");
    dispatch(commentActions.addCommentFB(id, comment_text))
  }

  return(
    <Grid is_flex justify="center" height="maxcontent">
      {isLogined()
      ? (<Input 
            width="90%" 
            placeholder="디자이너가 피드백을 기다리고 있습니다!"
            padding={paddingStyle.surround10}
            value={comment_text}
            _onChange={e => setCommentText(e.target.value)}
            onSubmit={write}
        />)
      : (<Input 
            width="90%" 
            placeholder="피드백을 남기기 위해 로그인해주세요!"
            padding={paddingStyle.surround10}
            value=""
        />)
      }
      <Button 
        width="10%" 
        bg="light" 
        txt="⏃" 
        size="25px"
        _onClick={write}
      />
    </Grid>
  )
};

CommentInput.defaultProps = {};

export default CommentInput;