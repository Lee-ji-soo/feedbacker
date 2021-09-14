import * as React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Grid, Image, Input, Text, Spinner } from "../elements";
import { actionCreators as postAction } from "../redux/modules/post";
import Upload from "../shared/Upload";
import { inputStyle } from "../utils/styleUtils";

const Post = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector(state => state.user.is_login);
  const preview = useSelector(state => state.image.preview);
  const post_list = useSelector(state => state.post.list);
  const loading = useSelector(state => state.post.loading);
  const cur_post_id = props.match.params.id;
  const cur_post = post_list.filter(post => {return post.id === cur_post_id})[0]
  const is_editing = cur_post !== undefined ; 
  
  const [contents, setContents] = useState( is_editing ? cur_post.contents : "");
  
  const src = () => {
    if(is_editing && preview === null ){
      return cur_post.image_url
    } else if(is_editing && preview !== null){
      return preview
    } else if( !is_editing && preview !== null){
      return preview
    }else{
      return emptyImg
    }
  }

  const handleAdd = () => {
    if(contents === ""){
      window.alert("내용을 입력해 주세요!")
    }else if( !is_editing && preview === null ){
      window.alert("이미지를 업로드 해주세요!")
    }else{
      return dispatch(postAction.addPostFB(contents)) 
    }
  }
  
  if (!is_login) {
    return(
      <Grid marin="100px 0px" padding="16px">
        <Text bold size="15px">로그인 해주세요 :)</Text>
      </Grid>
    );
  }
  return (
    <Grid is_flex direction="column" margin="20px 0">
      { loading && <Spinner is_dim/> }
      <Upload
        sizeGuide="550x385"
        width={inputStyle.post.width} 
      />
      <Grid width={inputStyle.post.width} margin="20px 0">
        <Image bgSize="cover" shape="rectangle" src={src()} />
      </Grid>
      <TextArea
        width={inputStyle.post.width}
        placeholder="design info..."
        onChange={(e) => setContents(e.target.value)}
        value={contents}
      />
      {
        is_editing
        ? <Button
            width={inputStyle.post.width}
            bg="dark"
            txt={ loading ? "WAITING..." : "UPDATE" }
            _onClick={() => {
              dispatch(postAction.updatePostFB(contents, cur_post_id))
             }}
          />
        : <Button
            width={inputStyle.post.width}
            bg="dark"
            txt={ loading ? "WAITING..." : "UPLOAD" }
            _onClick={handleAdd}
          />
      }
      <Button
        width={inputStyle.post.width}
        margin="10px 0 0 0"
        bg="light"
        txt={ loading ? "WAITING..." : "DELETE" }
      />
    </Grid>
  );
};

const TextArea = styled.textarea`
  width: ${(props) => props.width};
  height: 300px;
  padding: 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid #eaeaea;
`;

export default Post;

const emptyImg =
  "https://firebasestorage.googleapis.com/v0/b/imgcommunity-46e15.appspot.com/o/images%2Fnoimage.jpg?alt=media&token=50168189-63e0-4422-8569-e3fe80f95f5b";
