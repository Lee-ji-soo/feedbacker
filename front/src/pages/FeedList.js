import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "../elements";
import { Feed } from "../components";
import { actionCreators as postAction } from "../redux/modules/post";

const FeedList = (props) => {
  const dispatch = useDispatch();
  const feed_list = useSelector((state) => state.post.list);

  useEffect(() => {
    if (feed_list.length === 0) {
      dispatch(postAction.getPostFB());
    }
  }, []);

  return (
    <Grid padding="30px 0">
      {feed_list.map((data, i) => (
        <Feed key={`FEED_${i}`} {...data} />
      ))}
    </Grid>
  );
};

export default FeedList;
