import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import * as Types from "../../../types";
import IconButton from "../common/IconButton";
import { Settings as SettingsIcon } from "@material-ui/icons";
import "velocity-animate";
import "velocity-animate/velocity.ui";
import { VelocityTransitionGroup, velocityHelpers } from "velocity-react";
import { Colors } from "../../../cssConstants";
import CustomDropDown, { ItemId } from "../common/form/CustomDropDown";

const velocityHelpersFixed = velocityHelpers as any;

var Animations = {
  // Register these with UI Pack so that we can use stagger later.
  In: velocityHelpersFixed.registerEffect({
    calls: [
      [
        {
          transformPerspective: [800, 800],
          transformOriginX: ["50%", "50%"],
          transformOriginY: ["70%", "70%"],
          marginBottom: 0,
          opacity: 1,
          rotateX: [0, 130],
        },
        1,
        {
          easing: "ease-out",
          display: "flex",
        },
      ],
    ],
  }),
};

var formEnterAnimation = {
  animation: Animations.In,
  stagger: 150,
  duration: 300,
  delay: 100,
  backwards: false,
  display: "flex",
  style: {
    opacity: "0",
  },
};
var enterAnimation = {
  animation: "slideDown",
  duration: 100,
  delay: 0,
  backwards: false,
};
var leaveAnimation = {
  animation: "slideUp",
  duration: 100,
  delay: 0,
  backwards: false,
};

const SettingsMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  background: ${Colors.color2.base};
  color: ${Colors.color3.base};
`;
const VTGroup = styled(VelocityTransitionGroup)`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

interface Props {
  currentSettings: Types.GeneratorSettings;
  setSettings: Dispatch<SetStateAction<Types.GeneratorSettings>>;
  settingsVisible: boolean;
  setSettingsVisible: Dispatch<SetStateAction<boolean>>;
}

const Settings: React.FC<Props> = (props) => {
  const {
    currentSettings,
    setSettings,
    settingsVisible,
    setSettingsVisible,
  } = props;
  const toggleVisibility = () => {
    setSettingsVisible(!settingsVisible);
  };

  const Categories = Object.values(Types.Category).map((cat) => ({
    id: cat,
    content: cat,
  }));
  return (
    <React.Fragment>
      <VTGroup enter={enterAnimation} leave={leaveAnimation}>
        {settingsVisible ? (
          <SettingsMenu>
            <VTGroup enter={formEnterAnimation} runOnMount={true}>
              <CustomDropDown
                key={"cat1"}
                title={"Kategorie 1"}
                items={Categories}
                selectedItemId={currentSettings.category1}
                onChange={(selectedItemId: ItemId) => {
                  setSettings((settings) => ({
                    ...settings,
                    category1: selectedItemId as Types.Category,
                  }));
                }}
              ></CustomDropDown>
              <CustomDropDown
                key={"cat2"}
                title={"Kategorie 2"}
                items={Categories}
                selectedItemId={currentSettings.category2}
                onChange={(selectedItemId: ItemId) => {
                  setSettings((settings) => ({
                    ...settings,
                    category2: selectedItemId as Types.Category,
                  }));
                }}
              ></CustomDropDown>
            </VTGroup>
          </SettingsMenu>
        ) : null}
      </VTGroup>
      <IconButton onClick={toggleVisibility}>
        <SettingsIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default Settings;
