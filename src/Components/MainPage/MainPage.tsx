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
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
      <Heading active={true}>{history[history.length - 1]}</Heading>
      <button onClick={generateNewName}>neuer Name</button>
    </PageWrapper>
  );
};

export default MainPage;
