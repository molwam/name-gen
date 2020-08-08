import styled from "styled-components";
import React from "react";
import { Colors, ColorGrading } from "../../cssConstants";

const ColorBox = styled.div<{ color: string }>`
  background: ${(props) => props.color};
  height: 20px;
  width: 100%;
`;
const Wrapper = styled.div``;

const ColorDemo: React.FC = (props) => {
  return (
    <Wrapper>
      {Object.values(Colors).map((color: ColorGrading) => {
        return (
          <React.Fragment>
            <ColorBox
              color={color.light4}
              id={color + ".light4"}
              key={color + ".light4"}
            />{" "}
            <ColorBox
              color={color.light3}
              id={color + ".light3"}
              key={color + ".light3"}
            />{" "}
            <ColorBox
              color={color.light2}
              id={color + ".light2"}
              key={color + ".light2"}
            />{" "}
            <ColorBox
              color={color.light1}
              id={color + ".light1"}
              key={color + ".light1"}
            />
            <ColorBox
              color={color.base}
              id={color + ".base"}
              key={color + ".base"}
            />
            <ColorBox
              color={color.dark1}
              id={color + ".dark1"}
              key={color + ".dark1"}
            />{" "}
            <ColorBox
              color={color.dark2}
              id={color + ".dark2"}
              key={color + ".dark2"}
            />{" "}
            <ColorBox
              color={color.dark3}
              id={color + ".dark3"}
              key={color + ".dark3"}
            />{" "}
            <ColorBox
              color={color.dark4}
              id={color + ".dark4"}
              key={color + ".dark4"}
            />
          </React.Fragment>
        );
      })}
    </Wrapper>
  );
};

export default ColorDemo;
