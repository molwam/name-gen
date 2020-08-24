import styled from "styled-components";
import React from "react";

const StyledC = styled.h1<{ active: boolean }>`
  color: ${(props) => (props.active ? "red" : "blue")};
  background: blue;
`;

interface Props {
  dummyText: string;
}

const Dummy: React.FC<Props> = (props) => {
  const test = () => {
    return 123;
  };
  return (
    <StyledC active={true}>
      {props.dummyText}
      {test()}
    </StyledC>
  );
};

export default Dummy;
