import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { apiKey } from "../../utils/firebaseUtils";

const Permit = (props) => {
  if(isLogined()){
    return(<Fragment>{props.children}</Fragment>)
  }
  return null;
};

export default Permit;

export const isLogined = () => {
  const is_login = useSelector((state) => state.user.is_login);
  const _ssesion_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_ssesion_key) ? true : false;

  return (is_login && is_session)
};
