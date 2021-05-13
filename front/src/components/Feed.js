import React from "react";
import Design from "./Design";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import { Grid } from "../elements";

const Feed = (props) => {
  return(
    <Grid is_flex align="flex-end" padding="0 0 100px 0">
      <Grid width="550px">
        <Design {...props}/>
      </Grid>
      <Grid width="450px">
        <CommentList/>
        <CommentInput/>
      </Grid>
    </Grid>
  )
};

export default Feed;