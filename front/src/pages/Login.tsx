import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Text, Grid, Button } from "../elements";
import { emailCheck } from "../shared/utils";
import { inputStyle, paddingStyle } from "../utils/styleUtils";
import { actionCreators as userActions } from "../redux/modules/user"; 

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading);
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const login = () => {
    if( id === "" || pwd === ""){
      window.alert("id or pwd is empty")
      return;
    }
    if(!emailCheck(id)){
      window.alert("email form is not correct")
      return;
    }
    dispatch(userActions.loginFB(id, pwd));  
  }

  return(
    <>
      <Grid is_flex direction="column" justify="center" padding="16px">
        <Grid width={inputStyle.login.width}>
          <Text 
            bold
            size="20px"
            align="start"
            padding={paddingStyle.down10}
          >
            LOGIN
          </Text>
        </Grid>
        <Input
          width={inputStyle.login.width}
          color={inputStyle.login.color}
          padding={paddingStyle.left8}
          padding_p={paddingStyle.down10}
          placeholder="아이디를 입력하세요."
          value={id}
          _onChange={e => setId(e.target.value)}
        />
        <Input
          width={inputStyle.login.width}
          color={inputStyle.login.color}
          padding={paddingStyle.left8}
          padding_p={paddingStyle.down10}
          type="password"
          placeholder="비밀번호를 입력하세요."
          value={pwd}
          _onChange={e => setPwd(e.target.value)}
          onSubmit={login}
        />
        <Button 
          width={inputStyle.login.width}
          bg="dark" 
          txt={ loading ? "WAITING..." : "LOG IN"}
          _onClick={login}
        />
      </Grid>
    </>
  )
}

export default Login;