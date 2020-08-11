import React from "react";
import styled from "styled-components";
import * as Types from "../../types";
import * as Data from "../../Data/NameParts";
import * as GeneratorUtils from "./generatorUtils";
import { Colors, shadowColor } from "../../cssConstants";
import IconButton from "../Common/IconButton";
import { Casino } from "@material-ui/icons";
import { VelocityTransitionGroup } from "velocity-react";

const dataTree = Data.buildNameDataTree();

const Heading = styled.h1`
  color: ${Colors.color4.base};
  font-family: "Fredoka One", cursive;
  font-size: 4rem;
  margin: 10px 0;
  text-shadow: 0px 4px 6px ${shadowColor};
`;
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
      <VelocityTransitionGroup
        enter={{ animation: "slideDown" }}
        leave={{ animation: "slideUp" }}
      >
        <Heading key={history[history.length - 1]}>
          {history[history.length - 1]}
        </Heading>
      </VelocityTransitionGroup>

      <IconButton onClick={generateNewName}>
        <Casino />
      </IconButton>
    </PageWrapper>
  );
};

export default MainPage;
