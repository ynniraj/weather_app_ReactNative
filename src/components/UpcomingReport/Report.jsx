import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Report = ({ lat, lon }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=7&appid=a7be5d666d7e9d01e1f0b552b05775a9&units=metric`
      )
      .then((r) => {
        setData(r?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time?.join(""); // return adjusted time or original string
  }
  //   tConvert("15:00:00");

  //   console.log(data.list);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.head}>Weather Report</Text>
      </View>

      <View>
        {data?.list?.map((e, i) => {
          return (
            <View style={styles.mainBox}>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${e?.weather[0]?.icon}@2x.png`,
                }}
                style={{ width: 80, height: 80 }}
                resizeMode="cover"
              />
              <Text style={styles.temp}>
                {e?.main?.temp}
                <MaterialCommunityIcons
                  name="temperature-celsius"
                  size={20}
                  color="white"
                />
              </Text>

              <Text style={styles.des}>{e?.weather[0]?.description}</Text>
              <Text style={styles.time}>
                at {tConvert(e?.dt_txt?.split(" ")[1])}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingLeft: 20,
  },
  head: {
    fontSize: 24,
    letterSpacing: 1,
    fontFamily: "PPRegular",
    color: "white",
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },
  mainBox: {
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
  },
  temp: {
    fontSize: 20,
    color: "white",
  },
  des: {
    fontSize: 18,
    paddingLeft: 10,
    color: "white",
  },
  time: {
    fontSize: 18,
    color: "white",
    paddingLeft: 20,
    fontWeight: "bold",
  },
});
