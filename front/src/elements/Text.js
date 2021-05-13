import React from "react";
import styled from "styled-components";

const Text = ( props ) => {
  const {padding, bold, color, size, fontFamily, align, children} = props;
  const styles = {padding, bold, color, size, align, fontFamily};
  return (
    <P {...styles}>{children}</P>
  )
};

Text.defaultProps = {
  children: null,
  padding: "0",
  bold: false,
  color: "#222831",
  size: "14px",
  align: "center",
  fontFamily: "Roboto, san-serif"
};

const P = styled.p`
  padding: ${props => props.padding};
  color: ${props => props.color};
  font-size: ${props => props.size};
  font-weight: ${props => props.bold ? "800" : "400" };
  text-align: ${props => props.align};
  font-family: ${props => props.fontFamily};
` 

export default Text;