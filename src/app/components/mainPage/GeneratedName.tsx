import styled from "styled-components";
import React from "react";
import "velocity-animate";
import "velocity-animate/velocity.ui";
import { VelocityTransitionGroup, velocityHelpers } from "velocity-react";
import { Colors, shadowColor } from "../../../cssConstants";

const velocityHelpersFixed = velocityHelpers as any;

var Animations = {
  // Register these with UI Pack so that we can use stagger later.
  In: velocityHelpersFixed.registerEffect({
    calls: [
      [
        {
          transformPerspective: [800, 800],
          transformOriginX: ["50%", "50%"],
          transformOriginY: ["70%", "70%"],
          marginBottom: 0,
          opacity: 1,
          rotateX: [0, 130],
        },
        1,
        {
          easing: "ease-out",
          display: "flex",
        },
      ],
    ],
  }),

  Out: velocityHelpersFixed.registerEffect({
    calls: [
      [
        {
          transformPerspective: [800, 800],
          transformOriginX: ["50%", "50%"],
          transformOriginY: ["0%", "0%"],
          marginBottom: -30,
          opacity: 0,
          rotateX: -70,
        },
        1,
        {
          easing: "ease-out",
          display: "flex",
        },
      ],
    ],
  }),
};

const NameWrapper = styled.div`
  color: ${Colors.color4.base};
  font-family: "Fredoka One", cursive;
  font-size: 8vw;
  margin: 10px 0;
  text-shadow: 0px 4px 6px ${shadowColor};
  text-align: center;
`;
const NamePart = styled.div`
  color: ${Colors.color4.base};
`;
const VTGroup = styled(VelocityTransitionGroup)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 10vw;
`;

interface Props {
  nameParts: string[];
}

var enterAnimation = {
  animation: Animations.In,
  stagger: 50,
  duration: 400,
  delay: 250,
  backwards: false,
  display: "flex",
  style: {
    display: "none",
  },
};

var leaveAnimation = {
  animation: Animations.Out,
  stagger: 50,
  duration: 200,
  backwards: false,
};

const GeneratedName: React.FC<Props> = (props) => {
  return (
    <NameWrapper>
      <VTGroup enter={enterAnimation} leave={leaveAnimation}>
        <NamePart key={props.nameParts[0]}>{props.nameParts[0]}</NamePart>
        <NamePart key={props.nameParts[1]}>{props.nameParts[1]}</NamePart>
      </VTGroup>
    </NameWrapper>
  );
};

export default GeneratedName;
