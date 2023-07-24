import * as React from "react";
import Splash from "../src/components/Splash/Splash";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    PPRegular: require("../assests/fonts/Poppins-Regular.ttf"),
    PPBold: require("../assests/fonts/Poppins-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Splash />
    </>
  );
}
