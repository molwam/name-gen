import React from "react";
import MainPage from "./Components/MainPage/MainPage";
import Settings from "./Components/Settings/Settings";
import * as Types from "./types";
import styled, { createGlobalStyle } from "styled-components";
import { Colors } from "./cssConstants";

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
    categories: [Types.Category.Food, Types.Category.Title],
    // gender: Types.Gender.Female,
    maxChars: 12,
  });

  const [settingsVisible, setSettingsVisible] = React.useState<boolean>(false);

  return (
    <AppWrapper>
      <GlobalStyle />
      <Settings currentSettings={settings} setSettings={setSettings} settingsVisible={settingsVisible} setSettingsVisible={setSettingsVisible}/>
      <MainPage currentSettings={settings} />
    </AppWrapper>
  );
}

export default App;
