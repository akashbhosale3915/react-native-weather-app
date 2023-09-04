import axios from "axios";
import { useState } from "react";
import {
  Text,
  SafeAreaView,
  TextInput,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
} from "react-native";

const androidElevation = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  android: {
    elevation: 1,
    shadowColor: "#333",
  },
});

let apikey = "f8520a623608c0dd76cddb2116c822cb";

const current = new Date();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const date = `${
  day[current.getDay()]
} ${current.getDate()}th ${
  monthNames[current.getMonth()]
} ${current.getFullYear()}`;

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setweather] = useState({});

  const handleCity = (city) => {
    setCity(city);
  };

  const fetchWeather = () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apikey}`;

    axios
      .get(url)
      .then((response) => {
        setweather(response.data);
        setCity("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("../assets/bg.jpg")}
        style={styles.bg}
      >
        <View style={[styles.container, styles.overlay]}>
          <TextInput
            placeholder="Enter Location"
            style={[styles.input, androidElevation]}
            onChangeText={handleCity}
            value={city}
            cursorColor="#333"
            placeholderTextColor="#fff"
            caretHidden={true}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={fetchWeather}
          >
            <Text style={styles.btnText}>Search</Text>
          </TouchableOpacity>
          <View>
            {typeof weather.main !== "undefined" ? (
              <View style={styles.bottomContainer}>
                <Text style={styles.city}>
                  {weather.name}
                </Text>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.temp}>
                  {Math.round(weather.main.temp) +
                    "\u00B0C"}
                </Text>
                <View style={styles.iconContainer}>
                  <Image
                    source={{
                      uri: `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`,
                    }}
                    style={styles.icon}
                  />
                  <Text style={styles.iconDesc}>
                    {weather.weather[0].description}
                  </Text>
                </View>
                <Text style={styles.designed}>
                  developed with❤️ by Akash
                </Text>
              </View>
            ) : (
              <View>
                <Text style={styles.city}>
                  Enter a Location
                </Text>
                <Text style={styles.designed}>
                  developed with❤️ by Akash
                </Text>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  bg: { flex: 1, resizeMode: "cover" },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust the opacity as desired
  },
  city: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  date: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  temp: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    backgroundColor: "#ffffff66",
    borderRadius: 8,
    padding: 20,
    fontSize: 50,
  },
  input: {
    height: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    textAlign: "center",
    fontWeight: "500",
    backgroundColor: "#fff9",
    width: "95%",
    fontSize: 18,
    paddingHorizontal: 8,
  },
  btn: {
    backgroundColor: "#ffffff4d",
    borderRadius: 25,
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  searchBtnView: {
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 1,
    gap: 30,
    alignItems: "center",
  },
  icon: {
    height: 50,
    width: 50,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  iconDesc: {
    color: "#fff",
    textTransform: "capitalize",
    fontSize: 20,
    fontWeight: "bold",
  },
  designed: {
    fontSize: 10,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Home;
