# 타입 추론(Types by Inference)

TS는 JS위에 레이어로서 자리잡고 있는데 JS의 기능들을 제공하면서 그 위에 TS의 자체 레이어를 추가한다.
이 레이어가 TS의 **타입 시스템**이다.
TS는 JS언어를 알고 있고, 대부분의 경우 타입을 생성해줄 것이다. 예를 들어 변수를 생성하면서 동시에 특정 값에 할당하는 경우, TypeScript는 그 값을 해당 변수의 타입으로 사용할 것이다.
```{.JAVASCRIPT}
let helloWorld = "Hello World";
```
JS가 동작하는 방식을 TS는 이해함으로써 JS 코드를 받아들이고 타입을 갖게되는 **타입 시스템** 을 구축 할 수 있게된다. 이는 코드에서 명시하기 위해 추가로 문자를 사용할 필요가 없는 타입 시스템을 제공한다는 것이고
위의 예제에서 TS가 ``` helloWorld 는 string이 구나``` 를 알게 되는 방식이다.

# 타입 정의하기(Defining Types)

JS는 다양한 디자인 패턴을 가능하게 하는 동적 언어이다. 몇몇 디자인 패턴은 자동으로 타입을 제공하기 힘들 수 있지만, 이런한 경우에 TS는 TS가 타입이 무엇이 되어야 맞는지 명시 가능한 JS언어의 확장을
지원한다.
다음은 ```name:string``` 과 ```id:number``` 을 포함하는 추론 타입을 가진 객체를 생성하는 예제이다.
```Javascript
const user = {
  name: "Hayes",
  id: 0,
};
```
이 객체의 형태를 명시적으로 나타내기 위해서는 ```interface```로 선언한다.
```Javascript
interface User {
  name: string;
  id: number;
} 
``` 
이제 변수 선언 뒤에 ```: TypeName```의 구문을 이용해 JS 객체가 새로운 ```ineterface```의 형태를 따르고 있음을 선언할 수 있다.
```Javascript
interface User {
  name: string;
  id: number;
}
// ---cut---
const user: User = {
  name: "Hayes",
  id: 0,
};
```
해당 인터페이스에 맞지 않는 객체를 생성하게 되면 TS는 경고를 준다.
```Javascript
// @errors: 2322
interface User {
  name: string;
  id: number;
}

const user: User = {
  username: "Hayes",
  id: 0,
};
```
JS는 클래스와 객체 지향 프로그래밍을 지원하고 TS도 마찬가지이다. 
인터페이스는 클래스로도 선언할 수 있다.
```Javascript
interface User {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount("Murphy", 1);
```
인터페이스는 함수에서 매개변수와 리턴 값을 명시하는데 사용되기도 한다.
```Javascript
// @noErrors
interface User {
  name: string;
  id: number;
}
// ---cut---
function getAdminUser(): User {
  //...
}

function deleteUser(user: User) {
  // ...
}
```

JS에서 사용할 수 있는 기초 타입들중 ```boolean``` , ```bigint``` , ```null``` , ```number``` , ```string``` , ```symbol```, ```object``` , ```undefined``` 는 인터페이스에서 사용할 수 있다.
TS에서는 ```any``` , ```never``` 이라는 타입을 확장 할 수 있지만 거의 쓰지 않는다고 한다. ```void``` 라는 타입도 추가해준다.
타입을 구축하기 위한 두 가지 구문이 있다는 것을 알 수 있다.
```Interfaces and Types -> interface를 우선적으로 사용 후에 특정 기능이 필요할 때 type을 사용하면 된다```

# 타입 구성(Composing Types)

객체들을 조합하여 더 크고 복잡한 객체를 만드는 방법과 유사하게 TS에 타입을 이용해서 이를 수행하는 방법이 있다.
여러가지 타입을 이용하여 새 타입을 작성하기 위해 일상적인 코드에서 가장 많이 사용되는 두 가지 코드로는 유니언(Union)과 제네릭(Generic)이 있다.

## 유니언(Unions)
유니언은 타입이 여러 타입 중 하나일 수 있음을 선언해주는 방법이다. 예를 들어, ```boolean``` 타입을 ```true``` 나 ```false```로 설명할 수 있다.
```Javascript
type MyBool = true | false;
```
유니언 타입이 가장 많이 사용된 사례 중 하나는 값이 다음과 같이 허용되는 ```string``` 또는 ```number```의 리터럴 집합을 설명하는 것이다.
```Javascript
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
```
또한 유니언은 다양한 타빙르 처리하는 방법을 제공하는데 예를 들어 ```array``` 또는 ```string``` 을 받는 함수가 있다.
```Javascript
function getLength(obj: string | string[]) {
  return obj.length;
}
```
TS는 코드가 시간에 따라 변수가 변경되는 방식을 이해하고, 이러한 검사를 사용해 타입을 골라낼 수 있다.
|Type |Predicate|
|---|--|
|string|```typeof s ==="string"```|
|number|```typeof n ==="number"```|
|boolean|```typeof b ==="boolean"```|
|undefined|```typeof undefined ==="undefined"```|
|function|```typeof f ==="function"```|
|array|```Array.isArray(a)```|

예를 들어 ```typeof obj ==="string"```을 이용하여 ```string```과 ```array```를 구분할 수 있으며 TS는 객체가 다른 코드 경로에 있음을 알게 된다.
```Javascript
function wrapInArray(obj: string | string[]) {
  if (typeof obj === "string") {
    return [obj];
//          ^?
  } else {
    return obj;
  }
}
```

## 제네릭(Generics)

제네릭은 타입에 변수를 제공하는 방법이다.
일반적인 예시로는 배열을 사용하고 제네릭이 있는 배열은 배열 안의 값을 설명할 수 있다.
```Typescript
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
```
아래예시는 제네릭을 사용하는 고유 타입을 선언한 경우이다.
```Typescript
// @errors: 2345
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

// 이 줄은 TypeScript에 `backpack`이라는 상수가 있음을 알리는 지름길이고
// const backpack: Backpack<string>이 어디서 왔는지 몰라도 된다.
declare const backpack: Backpack<string>;

// 위에서 Backpack의 변수 부분으로 선언해서, object는 string이다.
const object = backpack.get();

// backpack 변수가 string이므로, add 함수에 number를 전달할 수 없기 때문에 에러가 발생했다.
backpack.add(23);
```

# 구조적 타입 시스템(Structural Type System)

TS의 핵심 원칙 중 하나는 타입 검사가 값이 있는 **형태**에 집중한다는 것이다. 이를 **구조적타이핑**이라고 부른다.
구조적타입 시스템에서는 두 객체가 같은 형태를 가지면 같은 것으로 간주된다.
```Typescript
interface Point {
  x: number;
  y: number;
}

function printPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

// "12, 26"를 출력합니다
const point = { x: 12, y: 26 };
printPoint(point);
```

```point```변수는 ```Point```타입으로 선언된 적이 없지만 TS는 타입 검사에서 ```point```의 형태와 ```Point```의 형태를 비교하고 둘다 같은 형태이기 때문에 통과를 시킨다.
형태일치를 시킬 때에는 일치시킬 객체 필드 내의 하위 집합을 확인한다.
아래 예시를 보면 ```Point``` 의 형태와 같은 ```point``` 만 출력 하는 것을 알 수 있다.
```Typescript
// @errors: 2345
interface Point {
  x: number;
  y: number;
}

function printPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}
// ---cut---
const point3 = { x: 12, y: 26, z: 89 };
printPoint(point3); // prints "12, 26"

const rect = { x: 33, y: 3, width: 30, height: 80 };
printPoint(rect); // prints "33, 3"

const color = { hex: "#187ABF" };

printPoint(color);
```




























