# 유니언 열거형과 열거형 멤버 타입

계산되지 않는 상수 열거 멤버의 특수한 부분 집합이 있다. 리터럴 열거형 멤버 리터럴 열거형 멤버는 초기화 값이 존재하지 않거나 아래 값들로 초기화되는 멤버이다.
- 문자 리터럴
- 숫자 리터럴
- 숫자 리터럴에 단항 연산자 - 가 적용된 경우

열거형의 모든 멤버가 리터럴 열거형 값을 가지면 특별한 의미로 쓰이게 된다.
첫째로 열거형 멤버를 타입처럼 사용할 수 있다. 예를 들어 특정 멤버는 열거형 멤버의 값만 가지게 할 수 있다.
```Javascript
enum ShapeKind {
    Circle,
    Square,
}

interface Circle {
    kind: ShapeKind.Circle;
    radius: number;
}

interface Square {
    kind: ShapeKind.Square;
    sideLength: number;
}

let c: Circle = {
    kind: ShapeKind.Square, // 오류! 'ShapeKind.Circle' 타입에 'ShapeKind.Square' 타입을 할당할 수 없다.
    radius: 100,
}
```
또 다른 점은 열거형 타입 자체가 효율적으로 각각의 열거형 멤버의 유니언이 된다는 점이다. 유니언 타입 열거형을 사용하면 타입 시스템이 열거형 자체에 존재하는 정확한 값의 집합을 알고
있다는 사실을 활용할 수 있다. TS는 값을 비교하는 에러를 잡을 수 있다.
```Javascript
enum E {
    Foo,
    Bar,
}

function f(x: E) {
    if (x !== E.Foo || x !== E.Bar) {
        //             ~~~~~~~~~~~
        // 에러! E 타입은 Foo, Bar 둘 중 하나이기 때문에 이 조건은 항상 true를 반환한다.
    }
}
```
## 런타임에서 열거형(Enums at runtime)
열거형은 런타임에 존재하는 실제 객체이다.
```Javascript
enum E {
    X, Y, Z
}
```
위와 같은 열거형은 아래와 같이 함수로 전달된다.
```Javascript
function f(obj: { X: number }) {
    return obj.X;
}

// E가 X라는 숫자 프로퍼티를 가지고 있기 때문에 동작하는 코드이다.
f(E);
```
## 컴파일 시점에서 열거형(Enums at compile time)

열거형이 런타임에 존재하는 실제 객체라고 해도, ```keyof``` 키워드는 일반적인 객체에서 기대하는 동작과는 다르게 동작한다.
대신 ```keyoftypeof``` 를 사용하면 모든 열거형의 키를 문자열로 나타내는 타입을 가져온다. 
```Javascript
enum LogLevel {
    ERROR, WARN, INFO, DEBUG
}

/**
 * 이것은 아래와 동일 :
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
    const num = LogLevel[key];
    if (num <= LogLevel.WARN) {
       console.log('Log level key is: ', key);
       console.log('Log level value is: ', num);
       console.log('Log level message is: ', message);
    }
}
printImportant('ERROR', 'This is a message');
```

## 역 매핑(Reverse mappings)

숫자 열거형 멤버는 멤버의 프로퍼티 이름을 가진 객체를 생성하는 것 외에도 열거형 값에서 열거형 이름으로 역 매핑을 받는다.
```Javascript
enum Enum {
    A
}
let a = Enum.A;
let nameOfA = Enum[a]; // "A"
```
TS는 아래와 같은 JS 코드로 컴파일을 한다.
```Javascript
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
})(Enum || (Enum = {}));
var a = Enum.A;
var nameOfA = Enum[a]; // "A"
```
이렇게 생성된 코드에서 열거형은 정방향 (```name``` -> ```value```)매핑과 역방향(```value``` -> ```name```)매핑 두정보를 모두 저장하는 객체로 컴파일 된다.
다른 열거형 멤버 참조는 항상 프로퍼티 접근으로 노출되며 인라인되지 않는다.
문자열 열거형은 역 매핑을 생성하지 않는다는 점을 명심하자.

## const 열거형(const enums)

대부분의 경우 열거형은 완벽하게 쓰인다. 하지만 몇몇 열거형의 교수사항이 좀 더 엄격해진다. 열거형 값에 접근할 때. 추가로 생성된 코드 및 추가적인 간접 참조에 대한 비용을 피하기 위해
```const``` 열거형을 사용할 수 있다. const열거형은 ```const``` 지정자를 열거형에 붙여서 정의한다.
```Javascript
const enum Enum {
    A = 1,
    B = A * 2
}
```
const 열거형은 상수 열거형 표현식만 사용될 수 있고, 컴파일 과정에서 완전히 제거된다. cosnt 열거형은 사용하는 공간에 인라인된다. 이 동작은 const열거형이 계산된 멤버를 가지고 있지
않기 때문에 가능하다.
```Javascript
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
```
위 코드는 아래와 같이 컴파일된다.
```Javascript
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

## Ambient 열거형(Ambient enums)
Ambient 열거형은 이미 존재하는 열거형 타입의 모습을 묘사하기 위해 사용된다.
```Javascript
declare enum Enum {
    A = 1,
    B,
    C = 2
}
```
ambient 열거형과 ambient 열거형이 아닌 형태의 큰 차이점은 일반적인 열거형에서 초괴화되지 않은 멤버가 상수로 간주하는 멤버 뒤에 있다면, 이 멤버도 상수로 간주한다.
반면 (const가 아닌) ambient 열거형에서 초기화되지 않은 멤버는 항상 계산된 멤버로 간주한다.













































