import { Image } from "expo-image";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const getWeatherInfo = async (latitude: number, longitude: number) => {
  const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=alerts&appid=${apiKey}&lang=ko`
    );
    const data = await response.json();
    // console.log(data);

    return data;
  } catch (error) {
    console.error("웨더 API 호출 실패 : " + error);
    return null;
  }
};

const getGoogleMapGeocode = async (latitude: number, longitude: number) => {
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );
    const data = await response.json();
    // console.log(data);

    return data;
  } catch (error) {
    console.error("구글 맵 API 호출 실패 : " + error);
    return null;
  }
};

const convertDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  // 한국 시간대로 포맷팅
  const formattedDate = date.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return formattedDate;
};

const SCREEN_WIDTH: number = Dimensions.get("window").width;

export default function Index() {
  const [ok, setOk] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [city, setCity] = useState<string | null>("");
  const [dailyWeatherData, setDailyWeatherData] = useState<Array<any>>([]);

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
    // console.log(latitude, longitude);

    const address = await getGoogleMapGeocode(latitude, longitude);
    // console.log(address);
    // console.log(address.results[3].formatted_address);

    const cityAddress = address.results[4].formatted_address;
    const citySplit = cityAddress.split(" ");
    // console.log(citySplit);

    const city = `${citySplit[1]} ${citySplit[2]} ${citySplit[3]}`;
    // console.log(city);
    setCity(city);

    const weatherData = await getWeatherInfo(latitude, longitude);
    console.log(weatherData.daily);

    setDailyWeatherData(weatherData.daily);

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
          {dailyWeatherData.map((item: any, index: number) => (
            <View style={styles.mainWrap} key={index}>
              <View style={styles.header}>
                <Text style={styles.regDate}>{convertDate(item.dt)}</Text>

                <View style={styles.weatherWrap}>
                  <Text style={styles.weather}>{item.weather[0].main}</Text>
                  {/* 날씨 아이콘 표시 */}
                  <Image
                    source={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    style={styles.weatherIcon}
                  />
                </View>
              </View>
              <View style={styles.body}>
                <View style={styles.temperatureWrap}>
                  <Text style={styles.temperature}>
                    {/* 섭씨로 변환 */}
                    {item.temp.day.toFixed(0)}
                  </Text>
                  <Text style={styles.temperatureUnit}>°</Text>
                </View>
                <View style={styles.summaryWrap}>
                  <Text style={styles.dailySummaryTitle}>일일 요약</Text>
                  <Text style={styles.summaryText}>{item.summary}</Text>
                </View>
              </View>
              <View style={styles.footer}></View>
            </View>
          ))}
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
  weatherWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  weatherIcon: {
    width: 70,
    height: 70,
  },
  weather: {
    fontSize: 30,
    fontWeight: "bold",
  },
  body: {
    flex: 3,
    borderWidth: 3,
    borderColor: "green",
  },
  temperatureWrap: {
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "red",
    position: "relative",
  },
  temperature: {
    fontSize: 180,
    fontWeight: "bold",
    position: "absolute",
    left: 80,
  },
  temperatureUnit: {
    fontSize: 180,
    fontWeight: "bold",
    position: "absolute",
    right: 40,
  },
  summaryWrap: {
    flex: 0.3,
    borderWidth: 3,
    borderColor: "green",
    paddingInline: 20,
    paddingBlock: 10,
  },
  dailySummaryTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  summaryText: {
    fontSize: 18,
    marginTop: 10,
  },
  footer: {
    flex: 1,
    backgroundColor: "#fee142",
    borderWidth: 3,
    borderColor: "orange",
  },
});
