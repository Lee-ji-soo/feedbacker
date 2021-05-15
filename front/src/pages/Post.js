import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Button, Grid, Image, Input, Text } from "../elements";
import { actionCreators as postAction } from "../redux/modules/post";
import Upload from "../shared/Upload";
import { inputStyle } from "../shared/styleUtils";

const Post = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector(state => state.user.is_login);
  const preview = useSelector(state => state.image.preview);
  const post_list = useSelector(state => state.post.list);
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

  if (!is_login) {
    return <Grid marin="100px 0px" padding="16px"> 로그인 해주세요 :) </Grid>;
  }
  return (
    <Grid is_flex direction="column" margin="20px 0">
      <Upload
        sizeGuide="550x385"
        width={inputStyle.post.width} 
      />
      <Grid width={inputStyle.post.width} margin="20px 0">
        <Image shape="rectangle" src={src()} />
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
            txt="UPDATE"
            _onClick={() => dispatch(postAction.updatePostFB(contents, cur_post_id)) }
          />
        : <Button
            width={inputStyle.post.width}
            bg="dark"
            txt="UPLOAD"
            _onClick={() => dispatch(postAction.addPostFB(contents)) }
          />
      }
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
