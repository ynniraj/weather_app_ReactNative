import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Splash = () => {
  const router = useRouter();
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.clouds}>
          <Ionicons name="cloudy-night-sharp" size={200} color="white" />
        </View>
        <View style={styles.heading}>
          <Text style={styles.text}>Discover the Weather in Your City</Text>
          <Text style={styles.textSub}>
            Get to know your weather maps and radar precipitation forecast
          </Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => router.push("/home")}
          >
            <Text style={styles.btnText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#001C30",
    height: "100%",
    color: "white",
    justifyContent: "center",
    alignContent: "center",
  },
  clouds: {
    alignItems: "center",
  },
  heading: {
    alignItems: "center",
    margin: "auto",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    width: "80%",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
    color: "white",
    fontFamily: "PPBold",
  },
  textSub: {
    fontSize: 18,
    width: "80%",
    textAlign: "center",
    fontWeight: 500,
    color: "white",
    fontFamily: "PPRegular",
    marginTop: 20,
  },
  btn: {
    backgroundColor: "#64CCC5",
    width: "80%",
    marginTop: 50,
    padding: 20,
    borderRadius: 20,
    fontFamily: "PPRegular",
  },
  btnText: {
    fontSize: 18,
    fontWeight: 500,
    textAlign: "center",
    color: "white",
  },
});
