import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "../elements";
import { Feed } from "../components";
import { actionCreators as postAction } from "../redux/modules/post";

const FeedList = (props) => {
  const dispatch = useDispatch();
  const feed_list = useSelector(state => state.post.list);
  const user_info = useSelector(state => state.user.user);
  
  useEffect(() => {
    dispatch(postAction.getPostFB());
  }, []);

  return (
    <Grid padding="30px 0">
      {feed_list.map((feed, i) => {
        const isMe = user_info && feed.user_info.user_id === user_info.uid
          return <Feed key={`FEED_${i}`} {...feed} isMe={isMe}/>
      })}
    </Grid>
  );
};

export default FeedList;
