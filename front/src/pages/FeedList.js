import React from "react";
import { Grid } from "../elements";
import { Feed } from "../components";
import { feeds } from '../assets/feeds';

const FeedList = (props) => {
  return(
    <Grid padding="30px 0">
      {
        feeds.map((con, i) => (
          <Feed key={`FEED_${i}`} {...con}/>
        ))
      }
    </Grid>
  )
}

export default FeedList