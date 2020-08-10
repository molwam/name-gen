import styled from "styled-components";
import React from "react";
import { Colors, shadowColor } from "../../cssConstants";

const ButtonContainer = styled.button<{ color?: string }>`
  background: ${(props) => (props.color ? props.color : Colors.color2.base)};
  padding: 7px;
  color: inherit;
  box-shadow: 0px 4px 6px ${shadowColor};
`;

interface Props {
  onClick: () => void;
  color?: string;
}

const IconButton: React.FC<Props> = (props) => {
  return (
    <ButtonContainer onClick={props.onClick} color={props.color}>
      {props.children}
    </ButtonContainer>
  );
};

export default IconButton;
