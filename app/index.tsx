import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.cityWrap}>
          <Text style={styles.cityName}>Ansan</Text>
        </View>
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "red",
  },
  cityName: {
    fontSize: 40,
    fontWeight: "bold",
  },
  mainWrap: {
    flex: 15,
    borderWidth: 3,
    borderColor: "blue",
    position: "relative",
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
