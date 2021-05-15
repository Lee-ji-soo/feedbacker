import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { 
    width, 
    margin,
    bg, 
    color, 
    fontFamily, 
    deco, 
    size,
    _onClick, 
    txt, 
    is_float 
  } = props;

  if (is_float) {
    return <FloatBtn onClick={_onClick}>{txt}</FloatBtn>;
  }

  const styles = { width, bg, margin, size, deco, color, fontFamily };
  return (
    <Btn onClick={_onClick} {...styles}>
      {txt}
    </Btn>
  );
};

Button.defaultProps = {
  width: "100%",
  margin: "0",
  bg: "light" | "dark" | "white",
  color: "",
  fontFamily: "",
  size: "",
  deco: "none",
  txt: "",
  _onClick: () => {},
  is_float: false,
};

const BG = (bg) => {
  if (bg === "light") {
    return `
      background-color: #eaeaea; 
      color: #111;`;
  } else if (bg === "dark") {
    return `
      background-color: #000; 
      color: #fff;`;
  } else if (bg === "white") {
    return `
      background-color: #fff;
      color: #111;
    `;
  }
};

const Btn = styled.button`
  width: ${props => props.width};
  height: 40px;
  margin: ${props => props.margin};
  ${props => BG(props.bg)}
  color: ${props => props.color};
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  text-decoration: ${props => props.deco};
  font-size: ${props => props.size};
  font-family: ${props => props.fontFamily}, sans-serif;
`;

const FloatBtn = styled.button`
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  box-sizing: border-box;
  background-color: #212121;
  color: #fff;
  font-size: 30px;
  font-weight: 500;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
`;

export default Button;
