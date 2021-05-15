import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Badge } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { realtime } from "../shared/firebase";

const NotiBadge = props => {
  const user_id = useSelector(state => state.user.user.uid); 
  const { _onClick } = props
  const [is_read, setIsRead] = useState(true);

  const notiCheck = () => {
    const notiDB = realtime.ref(`noti/${user_id}`);
    notiDB.update({ read: true })
    _onClick();
  }

  useEffect(()=>{
    const notiDB = realtime.ref(`noti/${user_id}`);
    
    notiDB.on("value", snapshot => {
      setIsRead(snapshot?.val()?.read);
    }) 

    return () => notiDB.off();
  },[])

  return(
    <StyledBadge
      id="noti_badge"
      color="secondary" 
      variant="dot" 
      invisible={is_read}
      onClick={notiCheck}
    >
      {props.children}
    </StyledBadge>
  )
};

NotiBadge.defaultProps = {
  _onClick : () => {}
}

const StyledBadge = withStyles({
  badge: {
    right: 13,
    top: 10,
  },
})(Badge);

export default NotiBadge