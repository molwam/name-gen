import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import * as Types from "../../types";
import IconButton from "../Common/IconButton";
import { Settings as SettingsIcon } from "@material-ui/icons";
import { Colors } from "../../cssConstants";


const SettingsMenu = styled.div`
`;

interface Props {
  currentSettings: Types.GeneratorSettings;
  setSettings: Dispatch<SetStateAction<Types.GeneratorSettings>>;
  settingsVisible:boolean;
  setSettingsVisible: Dispatch<SetStateAction<boolean>>;
}

const Settings: React.FC<Props> = (props) => {
  const {currentSettings, setSettings, settingsVisible, setSettingsVisible} = props;
  const toggleVisibility = () => {setSettingsVisible(!settingsVisible)}
  return <React.Fragment>
            {settingsVisible ? <SettingsMenu>Settings</SettingsMenu> : null}
            <IconButton onClick={toggleVisibility}>
              <SettingsIcon />
            </IconButton>
          </React.Fragment>;
};

export default Settings;
