import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const getGoogleMapGeocode = async (latitude: number, longitude: number) => {
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("구글 맵 API 호출 실패 : " + error);
    return null;
  }
};

const SCREEN_WIDTH: number = Dimensions.get("window").width;

export default function Index() {
  const [ok, setOk] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [city, setCity] = useState<string | null>("");

  const locationData = async () => {
    // Location.requestForegroundPermissionsAsync : 위치 권한 부여
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (!granted) {
      setOk(false);
      setErrorMsg("위치에 대한 권한 부여가 거부되었습니다.");
    }

    // Location.getCurrentPositionAsync : 현재 위치 정보 가져오기
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({});
    console.log(latitude, longitude);

    const address = await getGoogleMapGeocode(latitude, longitude);
    console.log(address);
    console.log(address.results[3].formatted_address);

    const cityAddress = address.results[3].formatted_address;
    const citySplit = cityAddress.split(" ");
    console.log(citySplit);

    const city = `${citySplit[1]} ${citySplit[2]} ${citySplit[3]}`;
    console.log(city);
    setCity(city);

    return;
  };

  useEffect(() => {
    locationData();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.cityWrap}>
          <Text style={styles.cityName}>{city}</Text>
        </View>
        <ScrollView
          horizontal
          pagingEnabled
          contentContainerStyle={styles.mainContentView}
        >
          <View style={styles.mainWrap}>
            <View style={styles.header}>
              <Text style={styles.regDate}>일요일, 2025-06-29</Text>
              <Text style={styles.weather}>맑음</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.temperature}>29</Text>
              <Text style={styles.temperatureUnit}>°</Text>
            </View>
            <View style={styles.footer}></View>
          </View>
          <View style={styles.mainWrap}>
            <View style={styles.header}>
              <Text style={styles.regDate}>월요일, 2025-06-30</Text>
              <Text style={styles.weather}>맑음</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.temperature}>29</Text>
              <Text style={styles.temperatureUnit}>°</Text>
            </View>
            <View style={styles.footer}></View>
          </View>
          <View style={styles.mainWrap}>
            <View style={styles.header}>
              <Text style={styles.regDate}>화요일, 2025-07-01</Text>
              <Text style={styles.weather}>맑음</Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.temperature}>29</Text>
              <Text style={styles.temperatureUnit}>°</Text>
            </View>
            <View style={styles.footer}></View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fee142",
  },
  cityWrap: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "red",
  },
  cityName: {
    fontSize: 30,
    fontWeight: "bold",
  },
  mainContentView: {},
  mainWrap: {
    borderWidth: 3,
    borderColor: "blue",
    position: "relative",
    width: SCREEN_WIDTH,
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "purple",
  },
  regDate: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fee142",
    backgroundColor: "#000",
    borderRadius: 50,
    paddingBlockStart: 5,
    paddingBlockEnd: 10,
    paddingInlineStart: 10,
    paddingInlineEnd: 10,
  },
  weather: {
    fontSize: 30,
    fontWeight: "bold",
    marginBlockStart: 10,
  },
  body: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "green",
  },
  temperature: {
    fontSize: 200,
    fontWeight: "bold",
    position: "absolute",
    top: 68,
    left: 70,
  },
  temperatureUnit: {
    fontSize: 180,
    fontWeight: "bold",
    position: "absolute",
    top: 78,
    right: 27,
  },
  footer: {
    flex: 1,
    backgroundColor: "#fee142",
    borderWidth: 3,
    borderColor: "orange",
  },
});
