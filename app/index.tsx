import { Image, ScrollView, StyleSheet, Text, TextInput } from "react-native";

// View : 전체를 감싸는 컨테이너
// Text : 텍스트를 표시하는 컴포넌트
// - text를 감쌀 때는 Text 컴포넌트를 사용
// style : 스타일을 적용하는 props

export default function Index() {
  return (
    <>
      {/* ScrollView : 스크롤을 할 수 있는 컨테이너 */}
      {/* View : 전체를 감싸는 컨테이너 / 스크롤이 적용 안됨 */}
      <ScrollView style={styles.scrollView}>
        <Text style={styles.mainText}>Hello World!!</Text>
        {/* resizeMode : 이미지의 크기를 조절하는 props */}
        {/* cover : 이미지가 커버하는 방식 / 이미지가 짤림이 발생 */}
        {/* contain : 이미지가 포함하는 방식 / 이미지 주위에 빈 공간이 발생 */}
        <Image
          source={{ uri: "https://picsum.photos/id/237/200/200" }}
          style={{ width: 200, height: 200 }}
        />
        <TextInput
          style={styles.inputText}
          placeholder="이름을 입력해주세요."
          placeholderTextColor="#000"
        />
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    // marginHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    fontSize: 20,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "red",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  inputText: {
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
    width: 200,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "red",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});
