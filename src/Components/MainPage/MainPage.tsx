import React from "react";
import styled from "styled-components";
import * as Types from "../../types";
import * as Data from "../../Data/NameParts";
import * as GeneratorUtils from "./generatorUtils";

const dataTree = Data.buildNameDataTree();

const Heading = styled.h1<{ active: boolean }>`
  color: ${(props) => (props.active ? "red" : "blue")};
  background: blue;
`;
const MainPage: React.FC<{
  currentSettings: Types.GeneratorSettings;
}> = (props) => {
  // const [history, setHistory] = React.useState<Types.NameHistory>([]);
  console.log(dataTree);
  return (
    <Heading active={true}>
      {GeneratorUtils.generateName(props.currentSettings, dataTree)}
    </Heading>
  );
};

export default MainPage;
