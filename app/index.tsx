import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

interface CurrentWeather {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Array<any>;
}

// 가시성을 피트에서 킬로미터로 변환하는 함수
function convertVisibilityFeetToKm(visibilityFeet?: number) {
  // 1 피트 = 0.0003048 킬로미터
  const feetToKmRatio = 0.0003048;

  // 변환 계산
  const visibilityKm = visibilityFeet ? visibilityFeet * feetToKmRatio : 0;

  // 소수점 2자리까지 반올림
  return Math.round(visibilityKm * 100) / 100;
}

const formatMonthDay = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  // 한국 시간대로 포맷팅
  const formattedDate = date.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formattedDate.split(". ");

  const partsMap = parts.map((str) => str.trim());

  const monthsData: { [key: string]: string } = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
  };

  const month = monthsData[partsMap[1]];
  const day = partsMap[2].replace(".", "");

  return `${month} ${day}`;
};

const RenderWeeklyWeatherItem = ({ dailyData }: { dailyData: Array<any> }) => {
  return (
    <>
      {dailyData.map((item: any, index: number) => {
        return (
          <View style={styles.weeklyWeatherItem} key={index}>
            <Text style={styles.temperatureItem}>
              {item.temp.day.toFixed(0)}°
            </Text>
            {/* 날씨 아이콘 표시 */}
            <Image
              source={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              style={styles.weeklyWeatherIcon}
            />
            <Text style={styles.weeklyWeatherMonthDay}>
              {formatMonthDay(item.dt)}
            </Text>
          </View>
        );
      })}
    </>
  );
};

const WeatherComponent = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>();
  const [dailyWeather, setDailyWeather] = useState<Array<any>>([]);

  useEffect(() => {
    getWeatherInfo();
  }, []);

  const getWeatherInfo = async () => {
    const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=alerts&appid=${apiKey}&lang=ko`
      );
      const data = await response.json();
      console.log(data);

      setWeatherData(data);
      setCurrentWeather(data.current);
      setDailyWeather(data.daily);

      console.log(data.daily);
    } catch (error) {
      console.error("웨더 API 호출 실패 : " + error);
    }
  };

  return (
    <>
      <View style={styles.dailyContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {dailyWeather.map((item: any, index: number) => {
            return (
              <View style={styles.mainWrap} key={index}>
                <View style={styles.header}>
                  <Text style={styles.regDate}>{convertDate(item.dt)}</Text>
                  <View style={styles.weatherWrap}>
                    <Text style={styles.weather}>{item.weather[0].main}</Text>
                    <Image
                      source={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                      style={styles.weatherIcon}
                    />
                  </View>
                </View>
                <View style={styles.weatherSection1}>
                  <View style={styles.temperatureWrap}>
                    <Text style={styles.temperature}>
                      {item.temp.day.toFixed(0)}
                    </Text>
                    <Text style={styles.temperatureUnit}>°</Text>
                  </View>
                  <View style={styles.summaryWrap}>
                    <Text style={styles.dailySummaryTitle}>일일 요약</Text>
                    <Text style={styles.summaryText}>{item.summary}</Text>
                  </View>
                </View>
                <View style={styles.weatherSection2}>
                  <View style={styles.subInfoWrap}>
                    <View style={styles.subInfoInner}>
                      <View style={styles.subInfoItem}>
                        <Feather name="wind" size={24} color="#fff" />
                        <Text style={styles.subInfoDes}>
                          {item.wind_speed.toFixed(0)}Km/h
                        </Text>
                        <Text style={styles.subInfoWeather}>wind</Text>
                      </View>
                      <View style={styles.subInfoItem}>
                        <Feather name="droplet" size={24} color="#fff" />
                        <Text style={styles.subInfoDes}>{item.humidity}%</Text>
                        <Text style={styles.subInfoWeather}>Humidity</Text>
                      </View>
                      <View style={styles.subInfoItem}>
                        <Feather name="eye" size={24} color="#fff" />
                        <Text style={styles.subInfoDes}>
                          {convertVisibilityFeetToKm(
                            currentWeather?.visibility
                          )}
                          km
                        </Text>
                        <Text style={styles.subInfoWeather}>Visibility</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.weeklyContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.weeklyWeatherTitle}>주간별 날씨</Text>
        </View>
        <View style={styles.sectionContent}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.weeklyWeatherInner}>
              <RenderWeeklyWeatherItem dailyData={dailyWeather} />
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
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

export default function Index() {
  const [ok, setOk] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [city, setCity] = useState<string | null>("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

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

    setLatitude(latitude);
    setLongitude(longitude);

    const address = await getGoogleMapGeocode(latitude, longitude);
    // console.log(address);
    // console.log(address.results[3].formatted_address);

    const cityAddress = address.results[4].formatted_address;
    const citySplit = cityAddress.split(" ");
    // console.log(citySplit);

    const city = `${citySplit[1]} ${citySplit[2]} ${citySplit[3]}`;
    // console.log(city);
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
        <WeatherComponent latitude={latitude} longitude={longitude} />
      </View>
    </>
  );
}

const SCREEN_WIDTH: number = Dimensions.get("window").width;
const ITEM_WIDTH: number = (SCREEN_WIDTH - 80) / 4; // 화면 너비에서 여백을 제외하고 4등분

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fee142",
  },
  cityWrap: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  cityName: {
    fontSize: 30,
    fontWeight: "bold",
  },
  dailyContainer: {
    flex: 1.5,
  },
  mainWrap: {
    width: SCREEN_WIDTH,
  },
  header: {
    flex: 0.35,
    alignItems: "center",
    justifyContent: "center",
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
  weatherSection1: {
    flex: 1,
  },
  temperatureWrap: {
    flex: 7,
    alignItems: "center",
    justifyContent: "center",
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
    flexGrow: 1,
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
  weatherSection2: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
  },
  subInfoWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  subInfoInner: {
    backgroundColor: "#000",
    width: 350,
    height: 110,
    borderRadius: 20,
    flexDirection: "row",
  },
  subInfoItem: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  subInfoDes: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
  },
  subInfoWeather: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  weeklyContainer: {
    flex: 0.5,
    paddingBlock: 5,
    paddingInline: 10,
    marginTop: 10,
  },
  weeklyWeatherTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionContent: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  weeklyWeatherInner: {
    flex: 1,
    flexDirection: "row",
    columnGap: 10,
    marginTop: 10,
  },
  sectionHeader: {},
  weeklyWeatherItem: {
    width: ITEM_WIDTH,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#000",
  },
  weeklyWeatherIcon: {
    width: 50,
    height: 50,
  },
  temperatureItem: {
    fontSize: 18,
    fontWeight: "bold",
  },
  weeklyWeatherMonthDay: {
    fontSize: 15,
    fontWeight: "bold",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fee142",
  },
});
