import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <>
      <View style={[styles.container]}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.cityName}>Ansan</Text>
          </View>
          <View style={styles.headerBottom}>
            <Text style={styles.regDate}>일요일, 2025-06-29</Text>
            <Text style={styles.weather}>맑음</Text>
          </View>
        </View>
        <View style={styles.mainWrap}></View>
        <View style={styles.footer}></View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fee142",
  },
  header: {
    flex: 1,
    backgroundColor: "#fee142",
    borderWidth: 3,
    borderColor: "red",
  },
  headerTop: {
    flex: 1,
  },
  cityName: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  headerBottom: {
    flex: 4,
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
  weather: {
    fontSize: 30,
    fontWeight: "bold",
    marginBlockStart: 10,
  },
  mainWrap: {
    flex: 2,
    backgroundColor: "#fee142",
    borderWidth: 3,
    borderColor: "blue",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fee142",
    borderWidth: 3,
    borderColor: "green",
  },
});
