import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "../elements";
import { paddingStyle } from "../utils/styleUtils";
import { actionCreators as commentActions } from "../redux/modules/comment";
import styled from "styled-components";
import Comment from "./Comment";

interface CommentListProps {
  id: string;

}
const CommentList = (props: CommentListProps) => {
  const dispatch = useDispatch();
  const { id } = props;
  const comment_list = useSelector((state) => state.comment.list);

  useEffect(() => {
    if (!comment_list[id]) {
      dispatch(commentActions.getCommentFB({post_id: id}));
    }
  }, []);

  if (!comment_list[id] || !id) {
    return null;
  }

  return (
    <CommentListBox
      className="comment_list_box"
      height="410px"
      margin={paddingStyle.down20}
      is_flex
      justify=""
      direction="column-reverse"
    >
      {comment_list[id].map((comment, id) => (
        <Comment key={`COMMENT_${id}`} {...comment} />
      ))}
    </CommentListBox>
  );
};

const CommentListBox = styled(Grid)`
  &&&.comment_list_box{
    overflow-y: scroll;
  }
`

export default CommentList;
