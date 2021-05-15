import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Image, Text } from "../elements";
import { realtime } from "../shared/firebase";
import styled from "styled-components";

const NotiList = (props) => { 
  const user = useSelector(state => state.user.user);
  const [noti, setNoti] = useState([]);

  useEffect(()=>{
    if(!user){ return };
    
    const notiDB = realtime.ref(`noti/${user.uid}/list`);
    
    const _noti = notiDB.orderByChild("insert_dt");

    _noti.once("value", snapshot => {
      if(snapshot.exists()){
        let _data = snapshot.val();

        let _noti_list = Object.keys(_data).reverse().map(s => {
          return _data[s];
        });
        setNoti(_noti_list);
      }
    })
    
  },[user])
  return(
    <NotiBg>
      {noti.map((data, idx)=>(
        <Noti key={`NEWS_${idx}`}{...data}/>
      ))}
    </NotiBg>
  )
}

NotiList.initialProsp = {
  user_name:"",
  post_id:"",
  image_url:"",
}

const NotiBg = styled.div`
  height: 800px;
  overflow-y: scroll;
`

export default NotiList;

const Noti = props => {
  const { image_url, user_name, post_id, insert_dt } = props;

  return(
    <Grid 
      is_flex
      justify="flex-start"
      width="500px"
      margin="20px auto 0 auto"
      padding="10px"
      height="max-content"
    >
      <Image src={image_url} shape="rectangle" size="100px"/>
      <Grid padding="20px">
        <Text align="start">
          <strong>{user_name}</strong>님이
          {insert_dt}에 게시글에 댓글을 남겼습니다 :) !
        </Text>
      </Grid>
    </Grid>
  )
}