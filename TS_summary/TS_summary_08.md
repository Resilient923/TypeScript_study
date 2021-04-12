# 리터럴 타입(Literal Types)

리터럴 타입은 ```집합 타입의 보다 구체적인 하위 타입``` 이다. 이것이 의미하는 바는 타입 시스템 안에있는 ```"hello"```는 ```string```이지만
```string```은 ```"hello"```가 아니라는 말이다.

## 리터럴 타입 좁히기(Literal Narrowing)

```var```이나 ```let``` 타입으로 변수를 설정할 경우에는 언제든지 수정이 가능하다. 
```const```로 변수 타입을 설정하게 되면 TS는 이 객체는 절대 바뀌지 않음을 알린다.
```Javascript
// const를 사용하여 변수 helloWorld가
// 절대 변경되지 않음을 보장한다.

// 따라서, TypeScript는 문자열이 아닌 "Hello World"로 타입을 정한다.
const helloWorld = "Hello World";

// 반면, let은 변경될 수 있으므로 컴파일러는 문자열이라고 선언할 것이다.
let hiWorld = "Hi World";
```
무한한 수의 잠재적 케이스들(문자열 값은 경우의 수가 무한대)을 유한한 수의 잠재적 케이스로 줄여나가는 것을 **타입 좁히기(narrowing)**이라 한다.

## 문자열 리터럴 타입(String LIteral Types)

실제로 문자열 리터럴 타입은 유니언 ㅏ입, 타입 가드 그리고 타입 별칭과 잘 결합된다. 이런 기능을 함께 사용하여 문자열로 ```enum```과 비슷한 형태를 갖춘다.
```Javascript
// @errors: 2345
type Easing = "ease-in" | "ease-out" | "ease-in-out";

class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === "ease-in") {
      // ...
    } else if (easing === "ease-out") {
    } else if (easing === "ease-in-out") {
    } else {
      // 하지만 누군가가 타입을 무시하게 된다면
      // 이곳에 도달하게 될 수 있습니다.
    }
  }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
button.animate(0, 0, "uneasy");
```
허용된 세개의 문자열이 아닌 다른 문자열을 사용하게 되면 오류가 발생한다.
```Javascript
'"uneasy"' 타입은 '"ease-in" | "ease-out" | "ease-in-out"' 타입의 매개 변수에 할당할 수 없다.
```
문자열 리터럴 타입은 오버로드를 구별하는 것과 동일한 방법으로 사용될 수 있다.
```Javascript
function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
// ... 추가적인 중복 정의들 ...
function createElement(tagName: string): Element {
  // ... 여기에 로직 추가 ...
}
```

## 숫자형 리터럴 타입(Numeric Literal Types)

TS에는 위의 문자열 리터럴과 같은 역할을 하는 숫자형 리터럴 타입도 있다.
```Javascript
function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
  return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
}

const result = rollDice();
```
주로 설정값을 설명할 때 사용된다.
```Javascript
/** loc/lat 좌표에 지도를 생성한다. */
declare function setupMap(config: MapConfig): void;
// ---생략---
interface MapConfig {
  lng: number;
  lat: number;
  tileSize: 8 | 16 | 32;
}

setupMap({ lng: -73.935242, lat: 40.73061, tileSize: 16 });
```



















