import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import Weather from "../src/components/Weather/Weather";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();
  const [location, setLocation] = useState(null);

  const locationDetector = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status == "granted") {
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    } else {
      console.log("permission denied");
    }
  };

  useEffect(() => {
    locationDetector();
  }, []);

  return (
    <>
      {!location && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {location && (
        <Weather
          lat={location?.coords?.latitude}
          lon={location?.coords?.longitude}
        />
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  loader: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
