
import React from "react";
import {Grid, Image, Text, Input, Button} from "../elements";

const fakeData = [
  {
    user_name: "soo",
    user_profile: "https://1wecodereact.s3.ap-northeast-2.amazonaws.com/wishlist-blk-focus.svg",
    content: "우와 노란 고양이네요!",
  },
  {
    user_name: "mki",
    user_profile: "https://1wecodereact.s3.ap-northeast-2.amazonaws.com/wishlist-blk-focus.svg",
    content: "우와 빨간 고양이네요!",
  }, {
    user_name: "hello",
    user_profile: "https://1wecodereact.s3.ap-northeast-2.amazonaws.com/wishlist-blk-focus.svg",
    content: "우와 파란 고양이네요!",
  },
]

const CommentList = () => {
  return(
    <>
      <Grid padding="16px">
        {fakeData.map((data,id) => (
          <Comment key={`COMMENT_${id}`} {...data}/>
        ))}
      </Grid>
    </>
  )
}

export default CommentList;

const Comment = (props) => {
  const { user_name, user_profile, user_id, post_id, content, insert_dt } = props;
  return(
    <Grid is_flex>
      <Grid is_flex justify="flex-start">
        <Grid width="70px" is_flex justify="flex-start">
          <Image shape="circle" src={user_profile}/>
          <Text bold size="12px">{user_name}</Text>
        </Grid>
        <Grid padding="0 20px">
          <Text align="start">{content}</Text>
        </Grid>
      </Grid>
      <Button width="10%" bg="light" txt="삭제"/>
    </Grid>
  )
};

Comment.defaultProps = {
  user_name: "soo",
  user_profile: "https://1wecodereact.s3.ap-northeast-2.amazonaws.com/wishlist-blk-focus.svg",
  content: "우와 노란 고양이네요!",
};

