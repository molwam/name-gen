import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import * as Types from "../../types";
import { Colors } from "../../cssConstants";

const Heading = styled.h1`
  color: ${Colors.color3.base};
  background: ${Colors.color2.base};
`;

interface Props {
  currentSettings: Types.GeneratorSettings;
  setSettings: Dispatch<SetStateAction<Types.GeneratorSettings>>;
}

const Settings: React.FC<Props> = (props) => {
  return <Heading>Settings</Heading>;
};

export default Settings;
