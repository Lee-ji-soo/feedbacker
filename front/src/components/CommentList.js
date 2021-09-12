import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Image, Text, Button } from "../elements";
import { paddingStyle, commentStyle } from "../utils/styleUtils";
import { actionCreators as commentActions } from "../redux/modules/comment";
import styled from "styled-components";

const CommentList = props => {
  const dispatch = useDispatch();
  const { id } = props;
  const comment_list = useSelector(state => state.comment.list);

  useEffect(()=>{
    if(!comment_list[id]){
      dispatch(commentActions.getCommentFB(id))
    }
  },[]);

  if(!comment_list[id] || !id ){
    return null;
  }

  return(
    <CommentListBox
      className="comment_list_box"
      height="410px"
      margin={paddingStyle.down20}
      is_flex
      justify=""
      direction="column-reverse"
    >
      { comment_list[id].map((comment, id) => (
        <Comment key={`COMMENT_${id}`} {...comment}/>
      ))}
    </CommentListBox>
  )
}

const CommentListBox = styled(Grid)`
  &&&.comment_list_box{
    overflow-y: scroll;
  }
`

const Comment = memo((props) => {
  const dispatch = useDispatch();
  const { user_id, user_name, user_profile, id, post_id, contents, insert_dt } = props;
  const uid = useSelector(state => state.user.user?.uid);
  const isMyComment = user_id === uid;

  return(
    <Grid is_flex height="max-content" margin="8px 0 0 0">
      <Grid is_flex justify="flex-start">
        <Grid width="50px" margin="0 10px 0 0 " is_flex justify="flex-start">
          <Image shape="circle" src={user_profile}/>
        </Grid>
        <Grid>
          <Text align="start" bold size={commentStyle.fontSize}>{user_name}</Text>
          <Text align="start" size={commentStyle.fontSize}>{contents}</Text>
          <Text align="start" color="#a9a9a9" size="12px">{insert_dt}</Text>
        </Grid>
      </Grid>
      {
       isMyComment && 
        <Button 
          width="10%" 
          bg="white" 
          color="#a9a9a9" 
          txt="X"
          _onClick={()=>{dispatch(commentActions.delCommentFB(id, post_id))}}
        />
      }
    </Grid>
  )
});

Comment.defaultProps = {
  user_name: "soo",
  user_profile: "https://1wecodereact.s3.ap-northeast-2.amazonaws.com/wishlist-blk-focus.svg",
  content: "우와 노란 고양이네요!",
};

export default CommentList;
