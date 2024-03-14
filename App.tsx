import { ThemeProvider } from "styled-components/native";
import { Groups } from "@screens/Groups";
import theme from "@themes/default";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Groups />
    </ThemeProvider>
  );
}
