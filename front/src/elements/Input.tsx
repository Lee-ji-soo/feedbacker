import * as React from "react";
import { Fragment, useState } from "react";
import styled from "styled-components";

interface IntputStylesProps {
  width?: string;
  padding?: string;
  padding_p?: string;
  color?: "light" | "dark";
}

interface InputProps extends IntputStylesProps {
  label?: string;
  value?: string;
  type?: string;
  placeholder: string;
  _onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  const {
    width= '100%',
    padding = '0px',
    padding_p = '0px',
    label = '',
    type = 'text',
    value = '',
    color = 'light',
    placeholder,
    _onChange = () => {},
    onSubmit = () => {},
  } = props;

  const styles = { width, color, padding, padding_p };

  const handleKeyPress = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSubmit(e);
      }
    },
    []
  );

  return (
    <Ipt {...styles}>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
        value={value}
        onKeyPress={handleKeyPress}
      />
    </Ipt>
  );
};

const BG = (color: "light" | "dark") => {
  if (color === "light") {
    return `
      border: 1px solid #eaeaea;
    `;
  } else if (color === "dark") {
    return `
      border: 1px solid #111;
  `;
  }
};

const Ipt = styled.p<IntputStylesProps>`
  width: ${(props) => props.width};
  padding: ${(props) => props.padding_p};
  label {
    display: block;
  }
  input {
    width: 100%;
    height: 40px;
    padding: ${(props) => props.padding};
    box-sizing: border-box;
    ${(props) => BG(props.color)}
    color: #111;
  }
`;

export default Input;
