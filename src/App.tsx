import React from "react";
import MainPage from "./app/components/mainPage/MainPage";
import Settings from "./app/components/settings/Settings";
import * as Types from "./types";
import styled, { createGlobalStyle } from "styled-components";
import { Colors } from "./cssConstants";
import * as NameService from "./app/services/NameService";

const AppWrapper = styled.div``;

const noiseTextureUrl = `url("http://api.thumbr.it/whitenoise-361x370.png?background=${Colors.color1.base.substr(
  1
)}&noise=${Colors.color1.dark1.substr(1)}&density=30&opacity=100")`;

const GlobalStyle = createGlobalStyle`
  body {
    background: ${Colors.color3.dark2} ${noiseTextureUrl} ;
    color: ${Colors.color1.light4}; 
    font-family: 'Josefin Sans', sans-serif;  
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
  margin: 0;
  padding: 0;
  border: none;
  } 

  :focus {
    outline: inherit
  }
`;

function App() {
  const [settings, setSettings] = React.useState<Types.GeneratorSettings>({
    category1: Types.Category.All,
    category2: Types.Category.All,
    // gender: Types.Gender.Female,
    maxChars: 12,
    isAnagram: true,
  });

  const [settingsVisible, setSettingsVisible] = React.useState<boolean>(false);

  NameService.generateNextNames(settings);

  return (
    <AppWrapper>
      <GlobalStyle />
      <Settings
        currentSettings={settings}
        setSettings={setSettings}
        settingsVisible={settingsVisible}
        setSettingsVisible={setSettingsVisible}
      />
      <MainPage />
    </AppWrapper>
  );
}

export default App;
