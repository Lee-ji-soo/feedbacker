import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Text, Grid, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user"; 
import { emailCheck } from "../shared/utils";
import { inputStyle, paddingStyle } from "../shared/styleUtils";

const Login = () => {
  const dispatch = useDispatch();
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
          padding={paddingStyle.down10}
          placeholder="아이디를 입력하세요."
          _onChange={e => setId(e.target.value)}
        />
        <Input
          width={inputStyle.login.width}
          color={inputStyle.login.color}
          padding={paddingStyle.down10}
          type="password"
          placeholder="비밀번호를 입력하세요."
          _onChange={e => setPwd(e.target.value)}
        />
        <Button 
          width="400px" 
          bg="dark" 
          txt="LOG IN"
          _onClick={()=>{
            console.log("로그인 했어");
            login();
          }}
        />
      </Grid>
    </>
  )
}

export default Login;