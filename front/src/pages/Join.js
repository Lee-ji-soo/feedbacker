import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Image, Text, Grid, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck } from "../shared/utils";
import { inputStyle, paddingStyle } from "../utils/styleUtils";
import Upload from "../shared/Upload";
const emptyProfile = "https://firebasestorage.googleapis.com/v0/b/imgcommunity-46e15.appspot.com/o/images%2Fprofile.jpg?alt=media&token=457004c6-3282-4fb2-9052-ea1b1a6dd7c9"

const Join = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading);
  const profile = useSelector(state => state.user.user_profile);
  const preview = useSelector(state => state.image.preview);
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd_check, setPwdCheck] = useState("");
  const [user_name, setUserName] = useState("");

  const join = () => {
    if (id === "" || pwd === "" || user_name === "") {
      window.alert("빈칸을 채워주세요");
      return;
    }else if (pwd !== pwd_check) {
      window.alert("패스워드가 일치하지 않습니다.");
      return;
    }else if (pwd.length < 6 ){
      window.alert("패스워드는 최소 6자 이상이어야 합니다.")
    }else if (!emailCheck(id)) {
      window.alert("이메일 폼이 정확하지 않습니다.");
      return;
    }else if (profile === null){
      window.alert("프로필 사진을 업로드해주세요");
      return;
    }else{
      dispatch(userActions.joinFB(id, pwd, user_name, preview));
    }
  };

  const src = () =>{
    if(!profile && preview){
      return preview
    }else if(!profile && !preview){
      return emptyProfile
    }else if (profile){
      return profile
    }else if(profile && preview){
      return profile
    }
    else return emptyProfile
  }

  return (
    <>
      <Grid is_flex direction="column" justify="center" padding="16px">
        <Grid width={inputStyle.login.width}>
          <Text 
            bold
            size="20px"
            align="start"
            padding={paddingStyle.down10}
          >JOIN
          </Text>
        </Grid>
        <Grid is_flex width={inputStyle.login.width}>
          <Image src={src()} size="250px" height="250px" bgSize="cover"/>
          <Upload padding="0 0 0 20px" sizeGuide="free"/>
        </Grid>
        <Input
          width={inputStyle.login.width}
          color={inputStyle.login.color}
          padding={paddingStyle.left8}
          padding_p="20px 0 10px 0"
          placeholder="이메일을 입력하세요."
          value={id}
          _onChange={e => setId(e.target.value)}
        />
        <Input
          width={inputStyle.login.width}
          color={inputStyle.login.color}
          padding={paddingStyle.left8}
          padding_p={paddingStyle.down10}
          placeholder="닉네임을 입력하세요."
          value={user_name}
          _onChange={e => setUserName(e.target.value)}
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
        />
        <Input
          width={inputStyle.login.width}
          color={inputStyle.login.color}
          padding={paddingStyle.left8}
          padding_p={paddingStyle.down10}
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          value={pwd_check}
          _onChange={e => setPwdCheck(e.target.value)}
          onSubmit={join}
        />
        <Button
          width={inputStyle.login.width}
          bg="dark"
          txt={loading ? "WAITING...😊" : "JOIN IN"}
          _onClick={join}
        />
      </Grid>
    </>
  );
};

export default Join;
