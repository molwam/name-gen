import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import * as Types from "../../types";

const Heading = styled.h1<{ active: boolean }>`
  color: ${(props) => (props.active ? "red" : "blue")};
  background: blue;
`;

interface Props {
  currentSettings: Types.GeneratorSettings;
  setSettings: Dispatch<SetStateAction<Types.GeneratorSettings>>;
}

const Settings: React.FC<Props> = (props) => {
  return <Heading active={true}>Settings</Heading>;
};

export default Settings;
