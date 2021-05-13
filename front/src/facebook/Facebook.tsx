import React, { Component, useState } from 'react';
import FacebookLogin from "react-facebook-login";
const dotenv = require("dotenv");
dotenv.config();

const API_URL = "http://localhost"
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;

type UserInfo = {
    isLoggedIn: boolean,
    userId : string | "",
    name : string | "",
    picture: string | ""
}

const Facebook = ()  => {
  let fbContent;      
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>();

  const loginClicked = () => {};  

  const logoutClicked = () => {
    setUserInfo({
      isLoggedIn: false,
      userId: '',
      name: '',
      picture: ''
    })
  }
  
  const responseFacebook = res => {
    setUserInfo({
      isLoggedIn: true,
      userId: res.userID,
      name: res.name,
      picture: res.picture.data.url
    })
    fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId : res.userID,
          name: res.name,
          picture: res.picture.data.url,
          token : res.accessToken,
          expiresIn : res.expiresIn
        }),
    })
    console.log(res);
  };

  if(userInfo){
    if(userInfo.isLoggedIn) {
      fbContent = (
        <>
          <div>
            <img src={userInfo.picture} />
            <h2>Welcome{userInfo.name}</h2>
          </div>
          <button onClick={logoutClicked}>logout</button>
        </>
      )
    }
  }else {
    fbContent = (
      <FacebookLogin
        appId={FACEBOOK_APP_ID}
        autoLoad={true}
        fields="name,email,picture"
        onClick={loginClicked}
        callback={responseFacebook} 
      />
    )
  }

  return (
    <div>{fbContent}</div>
  )
};

export default Facebook;
