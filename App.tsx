import { ActivityIndicator } from "react-native";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Groups } from "@screens/Groups";
import theme from "@themes/default";

export default function App() {
  const [isFontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      {isFontsLoaded ? <Groups /> : <ActivityIndicator />}
    </ThemeProvider>
  );
}
