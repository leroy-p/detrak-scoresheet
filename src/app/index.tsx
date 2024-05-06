import { useContext } from "react";
import { ThemeProvider } from "styled-components";

import { ThemeContext } from "./context/theme";
import GlobalStyle from "./global-style";
import Router from "./router";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
