import * as React from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../redux/modules/users/types";
import { Comment } from "../redux/modules/comment/types";
import { Grid, Image, Text, Button } from "../elements";
import { commentStyle } from "../utils/styleUtils";
import { actionCreators as commentActions } from "../redux/modules/comment";

interface CommentProps extends User, Comment {}

const Comment = memo((props: CommentProps) => {
  const dispatch = useDispatch();
  const {
    user_id,
    user_name = "soo",
    user_profile = "https://1wecodereact.s3.ap-northeast-2.amazonaws.com/wishlist-blk-focus.svg",
    id,
    post_id,
    contents = "",
    insert_dt,
  } = props;
  const uid = useSelector((state) => state.user.user?.uid);
  const isMyComment = user_id === uid;

  return (
    <Grid is_flex height="max-content" margin="8px 0 0 0">
      <Grid is_flex justify="flex-start">
        <Grid width="50px" margin="0 10px 0 0 " is_flex justify="flex-start">
          <Image shape="circle" src={user_profile} />
        </Grid>
        <Grid>
          <Text align="start" bold size={commentStyle.fontSize}>
            {user_name}
          </Text>
          <Text align="start" size={commentStyle.fontSize}>
            {contents}
          </Text>
          <Text align="start" color="#a9a9a9" size="12px">
            {insert_dt}
          </Text>
        </Grid>
      </Grid>
      {isMyComment && (
        <Button
          width="10%"
          bg="white"
          color="#a9a9a9"
          txt="X"
          _onClick={() => {
            dispatch(commentActions.delCommentFB({ comment_id: id, post_id }));
          }}
        />
      )}
    </Grid>
  );
});

export default Comment;
