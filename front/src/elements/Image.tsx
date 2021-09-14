import * as React from "react";
import { Fragment } from "react";
import styled from "styled-components";

interface ImageStylesProps {
  padding?: string;
  src: string;
  size?: string;
  bgSize?: "contain" | "cover" | "inherit";
  border?: string;
}

interface ImageProps extends ImageStylesProps {
  width?: string;
  shape: "rectangle" | "circle";
}
const Image = (props: ImageProps) => {
  const { width = "100%", shape, src, padding, bgSize, border } = props;

  const styles = {
    src,
    width,
    padding,
    bgSize,
    border,
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

const AspectOuter = styled.div<ImageStylesProps>`
  width: ${(props) => props.width};
  min-width: 70px;
  background-color: #f8f8f8;
`;

const AspectInner = styled.div<ImageStylesProps>`
  position: relative;
  overflow: hidden;
  padding: ${(props) => props.padding};
  padding-top: 70%;
  box-sizing: border-box;
  background-image: url(${(props) => props.src});
  background-size: ${(props) => props.bgSize};
  background-repeat: no-repeat;
  background-position: center;
`;

const ImageCircle = styled.div<ImageStylesProps>`
  --size: ${(props) => props.width}px;
  width: var(--size);
  height: var(--size);
  padding: ${(props) => props.padding};
  margin: 4px;
  border: ${(props) => props.border};
  border-radius: var(--size);
  box-sizing: border-box;
  background-color: #c4c4c4;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

export default Image;
