import * as React from "react";
import styled from "styled-components";

interface TextProps {
  children: React.ReactNode;
  padding: string;
  bold: boolean;
  color: string;
  size: string;
  align: "center" | "start" | "end";
  fontFamily: string;
}

const Text = (props: TextProps) => {
  const { padding, bold, color, size, fontFamily, align, children } = props;
  const styles = { padding, bold, color, size, align, fontFamily };
  return <P {...styles}>{children}</P>;
}

const P = styled.p<TextProps>`
  padding: ${(props) => props.padding};
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-family: ${(props) => props.fontFamily};
  font-weight: ${(props) => (props.bold ? "800" : "400")};
  line-height: 1.5;
  text-align: ${(props) => props.align};
`;

export default Text;
