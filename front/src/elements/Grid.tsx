import * as React from "react";
import { Fragment } from "react";
import styled from "styled-components";

interface GridProps {
  is_flex?: boolean;
  justify?: "space-between" | "flex-start" | "flex-end" | "space-around";
  align?: "center" | "start" | "end";
  direction?: "row" | "column";
  position?: "absolute" | "fixed" | "sticky";
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  bg?: boolean;
  extras?: string;
  className?: string;
  children: React.ReactNode;
  _onClick?: () => void;
}
const Grid = (props: GridProps) => {
  const {
    is_flex,
    justify,
    align,
    direction,
    position,
    width,
    height,
    padding,
    margin,
    bg,
    extras,
    className,
    children,
    _onClick,
  } = props;

  const styles = {
    is_flex,
    justify,
    align,
    direction,
    position,
    width,
    height,
    margin,
    padding,
    bg,
    extras,
  };

  return (
    <Fragment>
      <GridBox onClick={_onClick} className={className} {...styles}>
        {children}
      </GridBox>
    </Fragment>
  );
};

const GridBox = styled.div`
  ${(props) =>
    props.is_flex
      ? `
      display: flex;
    `
      : null}
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
  position: ${props => props.position};
  width: ${props => props.width};
  max-width: 1100px;
  height: ${props => props.height};
  padding: ${props => props.padding ? props.padding : null};
  margin: ${props => props.margin ? props.margin : null};
  box-sizing: border-box;
  background-color: ${props => props.bg ? props.bg : null};
  ${props => props.extras}
`;

export default Grid;
