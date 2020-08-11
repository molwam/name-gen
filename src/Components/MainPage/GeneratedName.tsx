import styled from "styled-components";
import React from "react";
import { VelocityTransitionGroup } from "velocity-react";
import { Colors, shadowColor } from "../../cssConstants";

const NameWrapper = styled.div`
  color: ${Colors.color4.base};
  font-family: "Fredoka One", cursive;
  font-size: 4rem;
  margin: 10px 0;
  text-shadow: 0px 4px 6px ${shadowColor};
  text-align: center;
  min-height: 5rem;
`;
const NamePart = styled.div``;

interface Props {
  nameParts: string[];
}

const GeneratedName: React.FC<Props> = (props) => {
  return (
    <NameWrapper>
      <VelocityTransitionGroup
        enter={{ animation: "slideDown" }}
        leave={{ animation: "slideUp" }}
      >
        {props.nameParts.map((name) => (
          <NamePart key={name}>{name}</NamePart>
        ))}
      </VelocityTransitionGroup>
    </NameWrapper>
  );
};

export default GeneratedName;
