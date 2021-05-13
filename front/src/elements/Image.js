import React, { Fragment } from "react"
import styled from "styled-components";

const Image = (props) => {
  const { shape, src, size } = props;

  const styles = {
    src,
    size
  }

  if(shape === "circle"){
    return (
      <ImageCircle {...styles}></ImageCircle>
    )
  }

  if(shape === "rectangle"){
    return(
      <AspectOuter>
        <AspectInner {...styles}/>
      </AspectOuter>
    )
  }

  return(
    <Fragment>

    </Fragment>
  )
};

Image.defaultProps = {
  shape: "rectangle",
  src: "https://1wecodereact.s3.ap-northeast-2.amazonaws.com/wishlist-blk-focus.svg",
  size: 36,
}

const AspectOuter = styled.div`
  width: 100%;
  min-width: 250px;
`
const AspectInner = styled.div`
  position: relative;
  padding-top: 50%;
  overflow: hidden;
  background-image: url(${(props)=> props.src});
  background-size: cover;
`

const ImageCircle = styled.div`
  --size : ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  
  background-color : #c4c4c4;
  background-image: url(${(props) => props.src});
  background-size: cover;
  margin: 4px;
`;

export default Image