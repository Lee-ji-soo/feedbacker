// PostList.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Grid, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/utils";

const Join = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd_check, setPwdCheck] = useState("");
  const [user_name, setUserName] = useState("");

  const join = () => {
    if (id === "" || pwd === "" || user_name === "") {
      return;
    }
    if (pwd !== pwd_check) {
      return;
    }
    if (!emailCheck(id)) {
      window.alert("email form is not correct");
      return;
    }
    dispatch(userActions.joinFB(id, pwd, user_name));
  };

  return (
    <>
      <Grid padding="16px">
        <h1>회원가입</h1>
        <Input
          label="아이디"
          placeholder="아이디를 입력하세요."
          _onChange={(e) => setId(e.target.value)}
        />
        <Input
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력하세요."
          _onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요."
          _onChange={(e) => setPwd(e.target.value)}
        />
        <Input
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력하세요."
          _onChange={(e) => setPwdCheck(e.target.value)}
        />
        <Button
          _onClick={() => {
            join();
          }}
          width="100%"
          bg="dark"
          txt="회원가입하기"
        />
      </Grid>
    </>
  );
};

export default Join;
