import React, { Fragment } from "react";
import styled from "styled-components";

const Grid = (props) => {
  const { 
    is_flex,
    justify,
    direction,
    width, 
    padding, 
    margin, 
    bg, 
    children 
  } = props;

  const styles = {
    is_flex,
    justify,
    direction,
    width,
    margin,
    padding,
    bg,
  };

  return (
    <Fragment>
      <GridBox {...styles}>{children}</GridBox>
    </Fragment>
  );
};

Grid.defaultProps = {
  is_flex: false,
  justify: "space-between",
  direction: "row",
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  children: null,
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  padding: ${(props) => (props.padding ? props.padding : null)};
  margin: ${(props) => (props.margin ? props.margin : null)};
  background-color: ${(props) => (props.bg ? props.bg : null)};
  ${(props) =>
    props.is_flex
      ? `
      display: flex;
      align-items: center;
    `
      : null}
  flex-direction: ${props => props.direction};
  justify-content: ${(props) => props.justify};
`;

export default Grid;
