import React from "react";
import styled from "styled-components";
import * as Types from "../../types";
import * as Data from "../../Data/NameParts";
import * as GeneratorUtils from "./generatorUtils";
import { Colors, shadowColor } from "../../cssConstants";
import IconButton from "../Common/IconButton";
import { Casino } from "@material-ui/icons";
import GeneratedName from "./GeneratedName";

const dataTree = Data.buildNameDataTree();

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainPage: React.FC<{
  currentSettings: Types.GeneratorSettings;
}> = (props) => {
  const initialName = GeneratorUtils.generateName(
    props.currentSettings,
    dataTree
  );

  const [history, setHistory] = React.useState<Types.NameHistory>([
    initialName ? initialName : "",
  ]);

  const generateNewName = () => {
    const newName = GeneratorUtils.generateName(
      props.currentSettings,
      dataTree
    );
    if (newName) {
      setHistory((history) => [...history, newName]);
    }
  };

  return (
    <PageWrapper>
      <GeneratedName nameParts={[history[history.length - 1]]} />
      <IconButton onClick={generateNewName}>
        <Casino />
      </IconButton>
    </PageWrapper>
  );
};

export default MainPage;
