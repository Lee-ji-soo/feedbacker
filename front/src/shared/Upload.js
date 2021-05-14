import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";
import styled from "styled-components";

const Upload = (props) => {
  const dispatch = useDispatch();
  const { width } = props;
  const styles = {
    width,
  };

  const inputRef = useRef();
  const is_uploading = useSelector((state) => state.image.uploading);

  const selectFile = () => {
    const reader = new FileReader();
    const file = inputRef.current.files[0];

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  return (
    <InputWrap {...styles}>
      <label htmlFor="input_file">file upload + </label>
      <input
        ref={inputRef}
        id="input_file"
        type="file"
        disabled={is_uploading}
        onChange={selectFile}
      />
    </InputWrap>
  );
};

const InputWrap = styled.p`
  width: ${(props) => props.width};
  label {
    display: inline-block;
    padding: 0.3em 0.75em;
    border: 1px solid #ebebeb;
    border-bottom-color: #e2e2e2;
    border-radius: 0.25em;
    background-color: #2c80ff;
    color: #fff;
    font-family: "Roboto, san-serif";
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
  input[type="file"] {
    //hidden
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

export default Upload;
