import React, { Fragment, useState } from "react";
import styled from "styled-components";

const Input = ( props ) => {
  const {width, padding, padding_p, label, type, color, placeholder, _onChange} = props;
  const styles = { width, color, padding, padding_p};
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
  padding_p: "0",
  label : "",
  name: "",
  type: "",
  color: "light",
  placeholder : "",
  _onChange: () => {},
};

const BG = color => {
  if (color === "light"){
    return `
      border: 1px solid #eaeaea;
    `
  } else if (color === "dark") {
    return `
      border: 1px solid #111;
  `
  }

} 
const Ipt = styled.p`
  width: ${props=> props.width};
  padding: ${props => props.padding_p};
  label{
    display: block;
  }
  input{
    width: 100%;
    height: 40px;
    padding: ${props => props.padding};
    box-sizing: border-box;
    ${props => BG(props.color)}
    color: #111;
  }
` 

export default Input;