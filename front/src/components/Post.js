import React, { Fragment } from "react";
import {Grid, Image, Text} from "../elements";

const Post = (props) => {
  return(
    <Fragment>
      <Grid>
        <Grid is_flex>
          <Image shape="circle" src={props.image_url}/>
          <Text bold>{props.user_info.user_name}</Text>
          <Text>{props.insert_dt}</Text>
        </Grid>
        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.image_url}/>
        </Grid>
        <Grid padding="16px">
          <Text bold>댓글 {props.comment_cnt}개</Text>
        </Grid>
      </Grid>
    </Fragment>
  )
};

Post.defaultProps = {
  user_info:{
    user_name: "soo",
    user_profile: "https://1wecodereact.s3.ap-northeast-2.amazonaws.com/wishlist-blk-focus.svg",
  },
  image_url: "https://1wecodereact.s3.ap-northeast-2.amazonaws.com/wishlist-blk-focus.svg",
  contents: "귀여운 강아지 입니다용",
  comment_cnt: 10,
  insert_dt:"2021-02-27 10:00:00"
};

export default Post;