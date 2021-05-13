import React, { Fragment } from "react";
import styled from "styled-components";
import { Button, Grid, Image, Input, Text } from "../elements";

const PostWrite = (props) => {
  return(
    <Fragment>
      <Text bold size="25px">게시글 작성</Text>
      <Input type="file"/>
      <Grid>
        <Text bold size="16px">미리보기</Text>
        <Image shape="rectangle"/>
      </Grid>
      <Grid>
        <Text>게시글 내용</Text>
        <TextArea placeholder="게시글 작성"/>
      </Grid>
      <Button bg="dark" txt="게시글 작성"/>
    </Fragment>
  )
}

const TextArea = styled.textarea`
  width: 100%;
  height: 350px;
  padding: 20px;
  box-sizing: border-box;
`

export default PostWrite