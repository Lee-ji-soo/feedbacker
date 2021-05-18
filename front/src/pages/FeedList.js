import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "../elements";
import { Feed } from "../components";
import { actionCreators as postAction } from "../redux/modules/post";
import { Helmet } from "react-helmet";

const FeedList = (props) => {
  const dispatch = useDispatch();
  const feed_list = useSelector(state => state.post.list);
  const user_info = useSelector(state => state.user.user);
  
  useEffect(() => {
    dispatch(postAction.getPostFB());
  }, []);

  return (
    <div>
      <Helmet>
        <title>feedbacker</title>
        <meta property="og:title" content="og page feedbacker"/>
        <meta property="og:description" content="feed for designer, 디자인 솔직 리뷰. 디자이너를 위한 피드백, 고객의 소리."/>
        <meta name="robots" content="index,follow" />
        <meta name="keywords" content="피드백, 디자이너, 디자인, 리뷰, 솔직, 후기, 고객의소리, 디자인반영, 디자인피드백, 크리틱" />
        <meta property="og:image" content=""/>
      </Helmet>
      <Grid padding="30px 0">
        {feed_list.map((feed, i) => {
          const isMe = user_info && feed.user_info.user_id === user_info.uid
            return <Feed key={`FEED_${i}`} {...feed} isMe={isMe}/>
        })}
      </Grid>
    </div>
  );
};

export default FeedList;
