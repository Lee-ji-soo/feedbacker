import React from "react";
import { Grid, Input, Button } from "../elements";
import { isLogined } from "../shared/Permit";
import { paddingStyle } from "../shared/styleUtils";


const CommentInput = () => {
  return(
    <Grid is_flex justify="center">
      {isLogined()
      ? (<Input 
            width="90%" 
            placeholder="디자이너가 피드백을 기다리고 있습니다!"
            padding={paddingStyle.surround10}
        />)
      : (<Input 
            width="90%" 
            placeholder="피드백을 남기기 위해 로그인해주세요!"
            padding={paddingStyle.surround10}
        />)
      }
      <Button width="10%" bg="light" txt="⏃" size="25px"/>
    </Grid>
  )
};

CommentInput.defaultProps = {};

export default CommentInput;