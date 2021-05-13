import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { apiKey } from "./firebase";

const Permit = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const _ssesion_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_ssesion_key) ? true : false;

  console.log(is_login, is_session);
  if(is_login && is_session){
    return(<Fragment>{props.children}</Fragment>)
  }
  return null;
};

export default Permit;