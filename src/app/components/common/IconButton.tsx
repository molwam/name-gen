import styled from "styled-components";
import React from "react";
import { Colors, shadowColor } from "../../../cssConstants";

const ButtonContainer = styled.button`
  display: flex;
  padding: 10px;
  background: ${Colors.color2.base};
  color: ${Colors.color3.base};
  border-radius: 113px;
  box-shadow: 0px 4px 6px ${shadowColor};
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  :hover {
    background: ${Colors.color2.light1};
    color: ${Colors.color3.light1};
  }
  :active {
    background: ${Colors.color2.dark1};
    color: ${Colors.color3.dark1};
  }
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
