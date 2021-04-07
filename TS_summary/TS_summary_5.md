# 인터페이스

### 함수 타입(Function Types)

인터페이스는 JS 객체가 가질 수 있는 넓은 범위의 형태를 표현 할 수있다. 프로퍼티로 객체를 표현하는 것 외에도, 인터페이스는 함수 타입을 설명할 수 있다.
인터페이스로 함수 타입을 표현하기 위해 인터페이스에 **호출 서명(Call Signature)** 을 전달한다. 이 형태는 매개변수 목록과 반환 타입만 주어진 함수 선언과 비슷하다.
각 매개변수는 이름과 타입이 모두 필요하다.
```Javascript
interface SearchFunc {
    (source: string, subString: string): boolean;
}
```
한번 정의하고 나면, 함수 타입 인터페이스는 다른 인터페이스처럼 사용할 수 있다. 여기서 함수 타입의 변수를 만들고, 같은 타입의 함수 값으로 할당하는 방법을 보여준다.
```Javascript
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
```
함수 타입 검사를 위해서 매개변수의 이름을 맞출 필요는 없다. 위의 예제를 아래와 같이 써도 무방하다.
```Javascript
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
    let result = src.search(sub);
    return result > -1;
}
```
TS에서는 함수 호출 시 따로 타입 정보를 제공할 필요 없으며,
인수를 전달하면 함수의 매개 변수와 인수의 타입이 호환 되는지 확인한다.
함수 표현식이 숫자 나 문자열을 반환헀다면 , 타입 검사는 반환 타입이 ```SearchFunc``` 인터페이스에 정의된 반환 타입과 일치하지 않다면 당연히 에러를 발생시킨다.
```Javascript
let mySearch: SearchFunc;
 
// error: Type '(src: string, sub: string) => string' is not assignable to type 'SearchFunc'.
// Type 'string' is not assignable to type 'boolean'.
mySearch = function(src, sub) {
  let result = src.search(sub);
  return "string"; // 반환타입이 잘못되었다.
};
```
### 인덱서블 타입(Indexable Types)
인터페이스로 함수 타입을 설명하는 방법과 비슷하게 ```a[10]``` 이나 ```ageMap["daniel"]``` 처럼 타입을 인덱스로 나타낼 수 있다.
인덱서블 타입은 인덱싱 할때 해당 반환 유형과 함께 객체를 인덱싱하는 데 사용할 수 있는 타입을 기술하는 **인덱스 시그니처(Index Signature)** 를 가지고 있다.
예를 들어보자.
```Javascript
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```
위에서 인덱스 타입인 ```StringArray``` 인터페이스가 있다. 이 인덱스 타입은 ```StringArray```가 ```number```로 색인화 되면 ```string```을 반환할 것을 나타낸다.
인덱스 타입은 문자열과 숫자 타입이 가능하다. 두 타입의 인덱스를 모두 지원하는 것은 가능하지만, 숫자 인덱스에서 반환된 타입은 반드시 문자열 인덱서에서 반환된 타입의
하위 타입이어야 한다. ```number```로 인덱싱 할때 JS 는 실제로 객체를 인덱싱하기 전에 ```string```으로 반환하기 때문이다.
즉 ```100(number)```로 인덱싱하는 것은 ```"100"(string)``` 로 인덱싱 하는것과 같기 때문에 서로 일관성 있어야 한다.
```Javascript
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// 오류: 숫자형 문자열로 인덱싱을 하면 완전히 다른 타입의 Animal을 얻게 될 것입니다!
interface NotOkay {
    [x: number]: Animal;//숫자형, 문자열
    [x: string]: Dog;//문자형 문자열
}
```
```Javascript
interface NumberDictionary {
    [index: string]: number;
    length: number;    // 성공, length는 숫자입니다
    name: string;      // 오류, `name`의 타입은 인덱서의 하위타입이 아닙니다
}
interface NumberOrStringDictionary {
    [index: string]: number | string;//인덱스 시그니처가 프로퍼티 타입들의 합집합이면 다른 타입도 허용
    length: number;    // 성공, length는 숫자입니다
    name: string;      // 성공, name은 문자열입니다
}
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"]; //Readonly가 사용되서 읽기전용이기 때문에 값을 할당할 수 없다.
myArray[2] = "Mallory"; // 오류!
```
## 클래스 타입(Class Types)

### 인터페이스 구현하기
TS가 인터페이스를 클래스에서 사용하는 방법과 다른 객체지향언어에서 클래스가 인터페이스를 사용하는 방법은 같다.
```Javascript
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date = new Date();
    constructor(h: number, m: number) { }
}
```
```Javascript
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}

class Clock implements ClockInterface {
    currentTime: Date = new Date();
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```
위 예제의 ```setTime```처럼 클래스에 구현된 메소드는 인터페이스 안에서도 기술할 수 있다.

### 클래스의 Static 과 인스턴스의 차이점

클래스와 인터페이스를 다룰 때 클래스는 **두가지타입** 을 가진다는 것을 기억하는게 좋다. 스태틱(Static) 과 인스턴스(Instance) 타입이다.
생성 시그니처(Construct signature)로 인터페이스를 생성하고, 클래스를 생성하려고 한다면 인터페이스를 implements 할 때 에러가 발생하는 것을 알 수 있다.
```Javascript
interface ClockConstructor {
    new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
```
클래스가 인터페이스를 implements 할 때, 클래스의 인스턴스만 검사하기 때문이다 생성자가 스태틱이기 때문에, 이 검사에 포함되지 않는다.
대신에 클래스의 스태틱 부분을 직접적으로 다룰 필요가 있다. 이번 예제에서, ```ClockConstructor```는 생성자를 정의하고 ```ClockInterface``` 는 인스턴스 메소드를 정의하는
두 인터페이스를 정의한다. 그리고 편의를 위해, 전달된 타입의 인스턴스를 생성하느 ```createClock``` 생성자 함수를 정의한다.

```Javascript
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick(): void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```
```createClock```의 첫 번째 매개변수는 ```createClock(AnalogClock, 7, 32)```안에 ```ClockConstructor``` 타입이므로,
```AnalogClock```이 올바른 생성자 시그니처를 갖고 있는지 검사한다.

또 다른 쉬운 방법은 클래스 표현을 사용하는 것이다.
```Javascript
interface ClockConstructor {
  new (hour: number, minute: number);
}

interface ClockInterface {
  tick();
}

const Clock: ClockConstructor = class Clock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
      console.log("beep beep");
  }
}
```
### 인터페이스 확장하기(Extending Interfaces)

클래스처럼, 인터페이스들도 확장(extend)이 가능하다. 이는 한 인터페이스의 멤버를 다른 인터페이스에 복사하는 것을 가능하게 해주는데, 인터페이스를 재사용성 높은 컴포넌트로
쪼갤 때, 융통성을 제공해준다.
```Javascript
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
```
인터페이스는 여러 인터페이스를 확장할 수 있어 모든 인터페이스의 조합을 만들어낼 수 있다.
```Javascript
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

## 클래스를 확장한 인터페이스(INterfaces Extending Classes)

인터페이스 타입이 클래스 타입을 확장하면, 클래스의 멤버는 상속받지만 구현은 상속받지 않는다.
이것은 인터페이스가 구현을 제공하지 않고, 클래스의 멤버 모두를 선언한 것과 마찬가지다.
인터페이스는 심지어 기초 클래스의 private과 protected 멤버도 상속받습니다. 이것은 인터페이스가 private 혹은 protected 멤버를 포함한 클래스를
확장할 수 있다는 뜻이고, 인터페이스 타입은 그 클래스나 하위클래스에 의해서만 구현될 수 있다.
예제를 보자.
```Javascript
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

// Error: Property 'state' is missing in type 'Image'.
class Image implements SelectableControl {
    private state: any;
    select() { }
}

class Location {

}
```
위 예제에서, ```SelectableControl```은 ```private state``` 프로퍼티를 포함하여, ```Control```의 모든 멤버를 가지고 있다. 
```state```는 ```private``` 멤버이기 때문에, ```SelectableControl```를 구현하는 것은 ```Control```의 자식에게만 가능하다. 
```Control```의 자식만 같은 선언에서 유래된 state private 멤버를 가질수 있기 때문이고, private 멤버들이 호환되기 위해 필요하다.

```Control``` 클래스 안에서 ```SelectableControl```의 인스턴스를 통해서 ```state private``` 멤버에 접근할 수 있다. 
```SelectableControl```은 ```select``` 메서드를 가진 ```Control```과 같은 역할을 한다. 
```Button```과 ```TextBox``` 클래스들은 ```SelectableControl```의 하위타입이지만 (```Control```을 상속받고, ```select``` 메서드를 가지기 때문에), ```Image```와 ```Location``` 클래스는 아니다.












