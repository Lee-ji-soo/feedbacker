import React from "react";
import {Grid, Image, Text, Button} from "../elements";
import { paddingStyle } from "../shared/styleUtils";

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
      <Grid padding={paddingStyle.down20}>
        {fakeData.map((data,id) => (
          <Comment key={`COMMENT_${id}`} {...data}/>
        ))}
      </Grid>
    </>
  )
}

const Comment = (props) => {
  const { user_name, user_profile, user_id, post_id, content, insert_dt } = props;
  return(
    <Grid is_flex>
      <Grid is_flex justify="flex-start">
        <Grid width="50px" is_flex justify="flex-start">
          <Image shape="circle" src={user_profile}/>
        </Grid>
        <Grid>
          <Text align="start" bold size="13px">{user_name}</Text>
          <Text align="start" size="13px">{content}</Text>
        </Grid>
      </Grid>
      <Button width="10%" bg="white" txt="X"/>
    </Grid>
  )
};

Comment.defaultProps = {
  user_name: "soo",
  user_profile: "https://1wecodereact.s3.ap-northeast-2.amazonaws.com/wishlist-blk-focus.svg",
  content: "우와 노란 고양이네요!",
};

export default CommentList;
