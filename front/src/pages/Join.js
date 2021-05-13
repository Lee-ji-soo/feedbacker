// PostList.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Text, Grid, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/utils";
import { inputStyle, paddingStyle } from "../shared/styleUtils";

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
      <Grid is_flex direction="column" justify="center" padding="16px">
        <Grid width={inputStyle.login.width}>
          <Text 
            bold
            size="20px"
            align="start"
            padding={paddingStyle.down10}
          >
            JOIN
          </Text>
        </Grid>
        <Input
          width={inputStyle.login.width}
          color={inputStyle.login.color}
          padding={paddingStyle.left8}
          padding_p={paddingStyle.down10}
          placeholder="아이디를 입력하세요."
          _onChange={e => setId(e.target.value)}
        />
        <Input
          width={inputStyle.login.width}
          color={inputStyle.login.color}
          padding={paddingStyle.left8}
          padding_p={paddingStyle.down10}
          placeholder="닉네임을 입력하세요."
          _onChange={e => setUserName(e.target.value)}
        />
        <Input
          width={inputStyle.login.width}
          color={inputStyle.login.color}
          padding={paddingStyle.left8}
          padding_p={paddingStyle.down10}
          type="password"
          placeholder="비밀번호를 입력하세요."
          _onChange={e => setPwd(e.target.value)}
        />
        <Input
          width={inputStyle.login.width}
          color={inputStyle.login.color}
          padding={paddingStyle.left8}
          padding_p={paddingStyle.down10}
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          _onChange={e => setPwdCheck(e.target.value)}
        />
        <Button
          width={inputStyle.login.width}
          bg="dark"
          txt="JOIN IN"
          _onClick={() => join()}
        />
      </Grid>
    </>
  );
};

export default Join;
