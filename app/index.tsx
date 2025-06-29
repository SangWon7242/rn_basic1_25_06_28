import { StyleSheet, View } from "react-native";

// View : 전체를 감싸는 컨테이너
// Text : 텍스트를 표시하는 컴포넌트
// - text를 감쌀 때는 Text 컴포넌트를 사용
// style : 스타일을 적용하는 props

export default function Index() {
  return (
    <>
      <View style={[styles.container]}>
        <View style={{ flex: 1, backgroundColor: "red" }} />
        <View style={{ flex: 1, backgroundColor: "blue" }} />
        <View style={{ flex: 1, backgroundColor: "green" }} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
