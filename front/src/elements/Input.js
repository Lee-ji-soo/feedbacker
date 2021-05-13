import React, { Fragment, useState } from "react";
import styled from "styled-components";

const Input = ( props ) => {
  const {width, padding, label, type, color, placeholder, _onChange} = props;
  const styles = { width, color, padding};
  return (
    <Ipt {...styles}>
      <label>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
      />
    </Ipt>
  )
};

Input.defaultProps = {
  width : "100%",
  padding: "0",
  label : "",
  name: "",
  type: "",
  color: "light",
  placeholder : "",
  _onChange: () => {},
};

const Color = color => {
  if (color === "light"){
    return `
      border: 1px solid #c4c4c4;
    `
  } else if (color === "dark") {
    return `
      border: 1px solid #111;
  `
  }

} 
const Ipt = styled.p`
  width: ${props=> props.width};
  label{
    display: block;
  }
  input{
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    ${props => Color(props.color)}
    color: #111;
  }
  padding: ${props => props.padding};
` 

export default Input;