import React from "react";
import styled from "styled-components";
import * as Types from "../../../types";
import * as Data from "../../data/NameParts";
import * as NameService from "../../services/NameService";
import { Colors, shadowColor } from "../../../cssConstants";
import IconButton from "../common/IconButton";
import { Casino } from "@material-ui/icons";
import GeneratedName from "./GeneratedName";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainPage: React.FC = (props) => {
  const [name, setName] = React.useState<Types.Name | undefined>(
    NameService.getNextName()
  );

  const generateNewName = () => {
    const newName = NameService.getNextName();
    if (newName) {
      setName(newName);
    }
  };

  return (
    <PageWrapper>
      <GeneratedName
        nameParts={[name ? name.firstPart : "", name ? name.secondPart : ""]}
      />
      <IconButton onClick={generateNewName}>
        <Casino />
      </IconButton>
    </PageWrapper>
  );
};

export default MainPage;
