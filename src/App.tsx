import React from "react";
import MainPage from "./Components/MainPage/MainPage";
import Settings from "./Components/Settings/Settings";
import * as Types from "./types";
import styled from "styled-components";

const AppWrapper = styled.div`
  margin: 0;
  background: black;
  width: 100%;
  height: 100%;
`;

function App() {
  const [settings, setSettings] = React.useState<Types.GeneratorSettings>({
    categories: [Types.Category.Food, Types.Category.Title],
    // gender: Types.Gender.Female,
    maxChars: 12,
  });

  return (
    <AppWrapper>
      <Settings currentSettings={settings} setSettings={setSettings} />
      <MainPage currentSettings={settings} />
    </AppWrapper>
  );
}

export default App;
