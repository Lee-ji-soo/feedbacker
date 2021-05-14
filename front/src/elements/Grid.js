import React, { Fragment } from "react";
import styled from "styled-components";

const Grid = (props) => {
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
    className,
    children
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
  };

  return (
    <Fragment>
      <GridBox className={className} {...styles}>{children}</GridBox>
    </Fragment>
  );
};

Grid.defaultProps = {
  is_flex: false,
  justify: "space-between",
  align: "center", 
  direction: "row",
  position:"",
  width: "100%",
  height: "100%",
  padding: false,
  margin: "0 auto",
  bg: false,
  children: null,
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
`;

export default Grid;
