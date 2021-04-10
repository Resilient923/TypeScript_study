# 유니언 타입(Union Types)

가끔 ```number``` 나 ```string``` 을 매개변수로 생각하는 라이브러리를 사용할 때가 있다. 예시를 들어보자.
```Javascript
/**
 * 문자열을 받고 왼쪽에 "padding"을 추가한다.
 * 만약 'padding'이 문자열이라면, 'padding'은 왼쪽에 더해질 것이다.
 * 만약 'padding'이 숫자라면, 그 숫자만큼의 공백이 왼쪽에 더해질 것이다.
 */
function padLeft(value: string, padding: any) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft("Hello world", 4); // "Hello world"를 반환한다.
```
```padLeft```의 문제는 매개변수 ```padding```이 ```any``` 타입으로 되어있다는 것이다. 즉, ```number```나 ```string``` 둘 다 아닌 인수로 함수를 호출할 수 있다
는 말이고, TS는 허용한다.

```Javascript
declare function padLeft(value: string, padding: any): string;
// ---생략---
// 컴파일 타임에는 통과하지만, 런타임에는 오류가 발생한다.
let indentedString = padLeft("Hello world", true);

```
아래 예제와 같이 ```any``` 대신에, 유니언 타입을 매개변수 ```padding```에 사용할 수 있다.
```Javascript
// @errors: 2345
/**
 * 문자열을 받고 왼쪽에 "padding"을 추가한다.
 * 만약 'padding'이 문자열이라면, 'padding'은 왼쪽에 더해진다.
 * 만약 'padding'이 숫자라면, 그 숫자만큼의 공백이 왼쪽에 더해진다.
 */
function padLeft(value: string, padding: string | number) {
  // ...
}

let indentedString = padLeft("Hello world", true);
```
유니언 타입은 **여러 타입 중 하나가 될 수 있는 값**을 의미한다. ```|```로 각 타입을 구분하고 ```number | string | boolean```은 
값의 타입이 ```number```,```string```,```boolean```이 될 수 있음을 의미한다.

## 공통 필드를 갖는 유니언(Unions with Common Fields)

아래 예시를 보자. 유니언 타입인 값이 있으면, 유니언에 있는 모든 타입에 공통인 멤버들만 접근할 수 있다.
```Javascript
// @errors: 2339

interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

declare function getSmallPet(): Fish | Bird;

let pet = getSmallPet();
pet.layEggs();

// 두 개의 잠재적인 타입 중 하나에서만 사용할 수 있다.
pet.swim();
```
위 예제에서보면 유니언 타입이 ```Fish | Bird``` 이면 둘 다 가지고 있는 멤버들을 갖고 있다는 의미이다.
따라서 둘다가지고 있는 ```layEggs()```가 아닌 ```pet.fly()```난 ```Bird``` 타입만 가지고 있는 객체 이기 때문에 에러가 발생한다.

# 유니언 구별하기(Discriminating Unions)

유니언을 사용하는 데 있어서 일반적으로는 TS가 현재 가능한 타입 추론의 범위를 좁혀나가게 해줄 수 있는 리터럴 타입을 갖는 단일필드를 사용하는 것이다.
예를 들어, 하나의 공통 필드를 가지고 있는 세 가지 타입의 유니언을 만들어 보자.
```Javascript
type NetworkLoadingState = {
  state: "loading";
};

type NetworkFailedState = {
  state: "failed";
  code: number;
};

type NetworkSuccessState = {
  state: "success";
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};

// 위 타입들 중 단 하나를 대표하는 타입을 만들었지만,
// 그것이 무엇에 해당하는지 아직 확실하지 않다.
type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState;
```
위 예제를 보면 ```state```라는 필드는 공통적으로 가지고 있고, 각각 다른 필드를 가지고 있다.
|    NetworkLoadingState            |NetworkFailedState                 |NetworkSuccessState                      |
|----------------|---------------|------|
|state        |state          |state           |
|      |code|response|
리터럴 타입으로서 ```state```를 가지고 있으면 ```state```의 값은 대응하는 동일한 문자열과 대조되고 TS는 현재 어떤 타입이 사용되고 있는지 알 수 있다.
|NetworkLoadingState|NetworkFailedState|NetworkSuccessState |
|----------------|---------------|------|
|"loading"        |"failed"     |"success|
이 경우에는 런타임 에러를 최소화 하기 위해서 ```switch```문을 사용한다.
```Javascript
// @errors: 2339
type NetworkLoadingState = {
  state: "loading";
};

type NetworkFailedState = {
  state: "failed";
  code: number;
};

type NetworkSuccessState = {
  state: "success";
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};
// ---생략---
type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState;

function networkStatus(state: NetworkState): string {
  // 현재 TypeScript는 셋 중 어떤 것이
  // state가 될 수 있는 잠재적인 타입인지 알 수 없다.

  // 모든 타입에 공유되지 않는 프로퍼티에 접근하려는 시도는
  // 오류를 발생시킨다.
  state.code;

  // state에 swtich문을 사용하여, TS는 코드 흐름을 분석하면서
  // 유니언 타입을 좁혀나갈 수 있다.
  switch (state.state) {
    case "loading":
      return "Downloading...";
    case "failed":
      // 여기서 타입은 NetworkFailedState일 것이며,
      // 따라서 `code` 필드에 접근할 수 있다.
      return `Error ${state.code} downloading`;
    case "success":
      return `Downloaded ${state.response.title} - ${state.response.summary}`;
  }
}
```
## 교차 타입 (Intersection Types)

교차 타입은 유니언 타입과 밀접한 관련이 있지만, 사용 방법은 매우 다르다.
교차 타입은 여러 타입을 하나로 결합한다. 기존 타입을 합쳐 필요한 기능을 모두 가진 단일 타입을 얻을 수 있다.
예를 들어,```Person & Serializable & Loggable```은 ```Person```과 ```Serializable``` 그리고 ```Loggable```이 되고 객체는 세 가지 타입의 모든 멤버를 갖게 된다.
예를 들어, 일관된 에러를 다루는 여러 네트워크 요청이 있다면 해당 에러 핸들링을 분리하여 하나의 응답 타입에 대응하는 결합된 자체 타입으로 만들 수 있다.
```Javascript
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

interface ArtistsData {
  artists: { name: string }[];
}

// 이 인터페이스들은
// 하나의 에러 핸들링과 자체 데이터로 구성된다.

type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtistsResponse = (response: ArtistsResponse) => {
  if (response.error) {
    console.error(response.error.message);
    return;
  }

  console.log(response.artists);
};
```






















