import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Image, Button, Text } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import { apiKey } from "./firebase";
import Permit from "./Permit";
import styled from "styled-components";

const Header = () => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const _ssesion_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_ssesion_key) ? true : false;
  const [location, setLocation] = useState("feed");

  const listenLocation = history.listen((location, action) => {
    const curLocation = history.location.pathname.substr(1);
    setLocation(curLocation);
  });

  const naviStyle ={
    width: "70px",
    size: "19px",
    bg: "white",
    fontFamily: "Teko",
  }

  return (
    <>
      <H1>FEEDBACKER</H1>
      {is_login && is_session 
      ? (<Grid is_flex justify="center" padding="16px">
          <Button
            width={naviStyle.width}
            txt="FEED"
            bg={naviStyle.bg}
            size={naviStyle.size}
            fontFamily={naviStyle.fontFamily}
            deco={location === "feed" ? "underline" : ""}
            _onClick={() => {
              history.push("/feed");
            }}
          />
          <Button
            width={naviStyle.width}
            txt="POST"
            bg={naviStyle.bg}
            size={naviStyle.size}
            fontFamily={naviStyle.fontFamily}
            deco={location === "post" ? "underline" : ""}
            _onClick={() => {
              history.push("/post");
            }}
          />
          <Button
            width={naviStyle.width}
            txt="LOGOUT"
            bg={naviStyle.bg}
            size={naviStyle.size}
            fontFamily={naviStyle.fontFamily}
            _onClick={() => {
              dispatch(userActions.logoutFB());
            }}
          />
        </Grid>) 
      : (<Grid is_flex justify="center" padding="16px">
          <Button
            width={naviStyle.width}
            txt="FEED"
            bg={naviStyle.bg}
            size={naviStyle.size}
            fontFamily={naviStyle.fontFamily}
            deco={location === "feed" ? "underline" : ""}
            _onClick={() => {
              history.push("/feed");
            }}
          />
          <Button
            width={naviStyle.width}
            txt="LOGIN"
            bg={naviStyle.bg}
            size={naviStyle.size}
            fontFamily={naviStyle.fontFamily}
            deco={location === "login" ? "underline" : ""}
            _onClick={() => {
              history.push("/login");
            }}
          />
          <Button
            width={naviStyle.width}
            txt="JOIN"
            bg={naviStyle.bg}
            size={naviStyle.size}
            fontFamily={naviStyle.fontFamily}
            deco={location === "join" ? "underline" : ""}
            _onClick={() => {
              history.push("/join");
            }}
          />
        </Grid>)}
    </>
  );
};

const H1 = styled.h1`
  position: relative;
  text-align: center;
  font-weight: 900;
  font-size: 50pt;
`;
Header.defaultProps = {};

export default Header;
