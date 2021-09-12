import * as React from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";
import { Text } from "../elements";
import styled from "styled-components";

const Upload = (props) => {
  const { width, sizeGuide, padding } = props;
  const dispatch = useDispatch();

  const styles = {
    width,
    padding,
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const is_uploading = useSelector((state) => state.image.uploading);

  const selectFile = () => {
    const reader = new FileReader();
    if (!inputRef.current) return;
    const file = inputRef.current.files[0];

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  return (
    <InputWrap {...styles}>
      <label htmlFor="input_file">file upload +</label>
      <Text align="start" size="13px" color="#c4c4c4" padding="5px 0 0 0">
        {props.sizeGuide}사이즈를 권장합니다 :)
      </Text>
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

Upload.defaultProps = {
  width: "100%",
  padding: "0",
  sizeGuide: "",
  user: false,
  post: false,
};

const InputWrap = styled.div`
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
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
