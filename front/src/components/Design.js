import React, { Fragment } from "react";
import {Grid, Image, Text} from "../elements";
import { paddingStyle } from "../shared/styleUtils";
import moment from "moment";

const Design = (props) => {
  const { user_info, content, src, from, insert_dt  } = props;

  return(
   <Fragment>
     <Grid>
       <Grid is_flex justify="flex-start">
         <Image shape="circle" src={src} padding={paddingStyle.right8}/>
         <Text padding={paddingStyle.right8} bold>{user_info.user_name}</Text>
         <Text>{moment(insert_dt).format("YYYY.MM.DD HH:mm")}</Text>
       </Grid>
       <Grid>
         <Image size="550px" shape="rectangle" src={src}/>
       </Grid>
       <Grid padding="16px">
         <Text align="start" >{content}</Text>
       </Grid>
     </Grid>
   </Fragment>
  )
  };
  
  Design.defaultProps = {
    user_info:{
      user_id:"",
      user_profile:"",
      user_name:"thisisneverthat",
    },
    src: "https://1wecodereact.s3.ap-northeast-2.amazonaws.com/wishlist-blk-focus.svg",
    contents: "귀여운 강아지 입니다용",
    insert_dt: new Date(),
  };

  export default Design;