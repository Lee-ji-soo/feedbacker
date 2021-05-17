import React, { Fragment } from "react";
import styled from "styled-components";

const Image = (props) => {
  const { shape, src, size, padding, bgSize, border } = props;

  const styles = {
    src,
    size,
    padding,
    bgSize,
    border
  };

  if (shape === "circle") {
    return <ImageCircle {...styles}></ImageCircle>;
  }

  if (shape === "rectangle") {
    return (
      <AspectOuter {...styles}>
        <AspectInner {...styles} />
      </AspectOuter>
    );
  }

  return <Fragment></Fragment>;
};

Image.defaultProps = {
  width: "100%",
  shape: "rectangle",
  padding: "0",
  src: "https://1wecodereact.s3.ap-northeast-2.amazonaws.com/wishlist-blk-focus.svg",
  size: 36,
  bgSize: "contain",
  border: "none"
};

const AspectOuter = styled.div`
  width: ${(props) => props.size};
  min-width: 70px;
  background-color: #f8f8f8;
`;

const AspectInner = styled.div`
  position: relative;
  overflow: hidden;
  padding: ${props => props.padding};
  padding-top: 70%;
  box-sizing: border-box;
  background-image: url(${props => props.src});
  background-size: ${props => props.bgSize};
  background-repeat: no-repeat;
  background-position: center;
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  padding: ${props => props.padding};
  margin: 4px;
  border : ${props => props.border};
  border-radius: var(--size);
  box-sizing: border-box;
  background-color: #c4c4c4;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`;

export default Image;
