import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Report from "../UpcomingReport/Report";

const Weather = ({ lat, lon }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a7be5d666d7e9d01e1f0b552b05775a9&units=metric`
      )
      .then((res) => {
        setData(res?.data);
        setLoading(false);
      })
      .catch((e) => {
        alert("something went wrong!");
        setLoading(true);
      });
  }, []);

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <ScrollView>
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.cityField}>
              <Text style={styles.city}>
                <Text>
                  <SimpleLineIcons
                    name="location-pin"
                    size={20}
                    color="white"
                  />
                </Text>{" "}
                {data?.name}
              </Text>
            </View>

            <View style={styles.report}>
              <Text style={styles.tr}>Today's Report</Text>

              <View style={styles.icon}>
                {data?.weather?.map((e, i) => {
                  return (
                    <>
                      <View key={e.main}>
                        <Image
                          source={{
                            uri: `https://openweathermap.org/img/wn/${e.icon}@2x.png`,
                          }}
                          style={{ width: 200, height: 200 }}
                          resizeMode="cover"
                        />
                        <Text style={styles.main}>{e.main}</Text>
                      </View>
                    </>
                  );
                })}
              </View>

              <View>
                <Text style={styles.temp}>
                  {data?.main?.temp}
                  <MaterialCommunityIcons
                    name="temperature-celsius"
                    size={40}
                    color="white"
                  />
                </Text>
              </View>
              <View style={styles.subMain}>
                <View>
                  <Text style={styles.subText}>
                    {data?.main?.feels_like}
                    <MaterialCommunityIcons
                      name="temperature-celsius"
                      size={20}
                      color="white"
                    />
                  </Text>
                  <Text style={styles.subP}>Feels Like</Text>
                </View>

                <View>
                  <Text style={styles.subText}>{data?.wind?.speed}</Text>
                  <Text style={styles.subP}>Wind Speed</Text>
                </View>
                <View>
                  <Text style={styles.subText}>{data?.main?.humidity}</Text>
                  <Text style={styles.subP}>Humidity</Text>
                </View>
              </View>
            </View>

            <Report lat={lat} lon={lon} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Weather;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  loader: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    backgroundColor: "#001C30",
  },

  city: {
    textAlign: "center",
    width: "100%",
    color: "white",
    fontFamily: "PPRegular",
    fontSize: 20,
    paddingTop: 10,
    alignItems: "center",
    textAlign: "center",
  },
  report: {
    marginTop: 40,
  },
  tr: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    fontFamily: "PPBold",
    letterSpacing: 1,
    paddingLeft: 20,
  },
  icon: {
    alignItems: "center",
  },
  main: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    fontWeight: 600,
    fontFamily: "PPRegular",
    letterSpacing: 2,
  },
  temp: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "PPBold",
    letterSpacing: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  subMain: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 80,
  },
  subText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    flexDirection: "column",
    fontWeight: 500,
  },
  subP: {
    color: "white",
    fontSize: 18,
  },
});
