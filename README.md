# 날씨 정보 애플리케이션

## 프로젝트 개요

이 프로젝트는 React Native와 Expo를 활용한 모바일 날씨 정보 애플리케이션입니다. 사용자의 현재 위치를 기반으로 실시간 날씨 정보, 일일 날씨 예보, 그리고 주간 날씨 예보를 제공합니다.

## 기술 스택

- **프레임워크**: React Native (v0.79.4)
- **개발 플랫폼**: Expo (v53.0.13)
- **언어**: TypeScript
- **주요 라이브러리**:
  - expo-location: 사용자 위치 정보 획득
  - expo-image: 이미지 처리
  - @expo/vector-icons: 아이콘 사용
  - react-native-dotenv: 환경 변수 관리

## 주요 기능

### 1. 위치 기반 서비스

- 사용자의 현재 위치 정보를 가져와 해당 지역의 날씨 정보를 표시
- Google Maps Geocoding API를 활용하여 위도/경도 좌표를 실제 주소로 변환

### 2. 날씨 정보 표시

- **현재 날씨**: 온도, 날씨 상태, 습도, 풍속, 가시성 등 표시
- **일일 날씨**: 일별 상세 날씨 정보를 스크롤 가능한 형태로 제공
- **주간 날씨**: 향후 7일간의 날씨 예보를 스크롤 가능한 형태로 제공

### 3. 사용자 인터페이스

- 직관적이고 모던한 디자인
- 수평 스크롤을 통한 날짜별 날씨 정보 탐색
- 날씨 상태에 맞는 아이콘 표시

## 프로젝트 구조

```
rn_basic1_25_06_28/
├── app/                  # 메인 애플리케이션 코드
│   ├── index.tsx         # 메인 컴포넌트 및 날씨 관련 로직
│   └── _layout.tsx       # 레이아웃 구성
├── assets/               # 이미지, 폰트 등 정적 자원
├── android/              # Android 플랫폼 관련 파일
└── node_modules/         # 의존성 패키지
```

## 주요 컴포넌트 설명

### 1. Index 컴포넌트

- 애플리케이션의 진입점
- 위치 권한 요청 및 현재 위치 정보 획득
- Google Maps API를 통한 주소 정보 변환
- WeatherComponent 렌더링

### 2. WeatherComponent

- OpenWeatherMap API를 통한 날씨 데이터 획득
- 일일 날씨 정보 표시 (ScrollView 활용)
- 주간 날씨 정보 표시 (ScrollView 활용)

### 3. RenderWeeklyWeatherItem

- 주간 날씨 아이템을 렌더링하는 컴포넌트
- 날짜, 온도, 날씨 아이콘 표시

## API 활용

### 1. OpenWeatherMap API

- 실시간 날씨 정보 및 예보 데이터 획득
- One Call API 3.0 사용 (metric 단위계)
- 언어 설정: 한국어(ko)

### 2. Google Maps Geocoding API

- 위도/경도 좌표를 실제 주소로 변환
- 도시 이름 추출 및 표시

## 환경 설정

프로젝트 실행을 위해 다음 환경 변수가 필요합니다:

- `EXPO_PUBLIC_WEATHER_API_KEY`: OpenWeatherMap API 키
- `EXPO_PUBLIC_API_KEY`: Google Maps API 키

## 실행 방법

1. 의존성 패키지 설치:

```bash
npm install
```

2. 개발 서버 실행:

```bash
npm start
```

3. 안드로이드 에뮬레이터/기기에서 실행:

```bash
npm run android
```

4. iOS 시뮬레이터/기기에서 실행:

```bash
npm run ios
```

## 주요 기술적 구현 사항

### 1. 위치 정보 처리

- Expo Location API를 사용하여 사용자의 현재 위치 정보 획득
- 위치 권한 요청 및 처리 로직 구현

### 2. 날씨 데이터 처리

- OpenWeatherMap API 응답 데이터 파싱 및 상태 관리
- 온도, 습도, 풍속 등 다양한 기상 정보 표시

### 3. UI/UX 최적화

- 반응형 레이아웃 구현 (Dimensions API 활용)
- 스크롤 가능한 날씨 정보 컨테이너
- 날씨 아이콘 및 정보 시각화

### 4. 날짜/시간 처리

- 타임스탬프를 사용자 친화적인 형식으로 변환
- 한국 시간대 기준 날짜 포맷팅

## 향후 개선 사항

1. 날씨 알림 기능 추가
2. 다양한 테마 지원 (다크 모드/라이트 모드)
3. 위치 검색 기능 구현
4. 날씨 데이터 캐싱 및 오프라인 지원
5. 다국어 지원 확장
