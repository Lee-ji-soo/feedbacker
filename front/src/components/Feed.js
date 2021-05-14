import React from "react";
import Design from "./Design";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import { Grid, Button } from "../elements";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const Feed = (props) => {
  const { id, isMe } = props;
  return(
    <Grid is_flex align="flex-end" padding="0 0 100px 0">
      <Grid position="relative" width="550px">
        {isMe && 
          (<FixBtn>
              <Button
                width="30px"
                bg="white"
                txt="⚒︎"
                size="30px"
                color="#c4c4c4"
                _onClick={()=>{history.push(`/post/${id}`)}}
              />
            </FixBtn>)
        }
        <Design {...props}/>
      </Grid>
      <Grid 
        width="450px" 
        height="478px" 
        is_flex 
        direction="column" 
        justify="flex-end"
      >
        <CommentList {...props}/>
        <CommentInput {...props}/>
      </Grid>
    </Grid>
  )
};

const FixBtn = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`

export default Feed;