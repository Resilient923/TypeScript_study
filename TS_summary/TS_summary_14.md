# Generic(제네릭)

잘 정의되고 이관된 API 뿐만 아닌 재사용 가능한 컴포넌트를 구축하는 것도 소프트웨어 엔지니어링에서의 주요한 부분이다.
현재의 데이터와 미래의 데이터 모두를 다룰 수 있는 컴포넌트는 거대한 소프트웨어 시스템을 구성하는 데 있어 가장 유연한 능력을 제공한다.
사용자는 제네릭을 통해 여러 타입의 컴포넌트나 자신만의 타입을 사용할 수 있다.

## 제네릭의 기초

먼저 제네릭의 기초인 ```identity``` 함수를 보자. ```identity``` 함수는 인수로 무엇이 오던 그대로 반환하는 함수이다. ```echo``` 명령과 비슷하게 생각할 수 있다.
제네릭이 없다면, identity 함수에 특정 타입을 줘야 한다.
```Javascript
function identity(arg:number):number{
    return arg;
}
```
또는 ```any``` 타입을 사용하여 identity 함수를 기술할 수 있다.
```Javascript
function identity(arg: any): any {
    return arg;
}
```
```any```를 쓰는 것은 함수의 ```arg```가 어떤 타입이든 받을 수 있다는 점에서 제네릭이지만, 실제로 함수가 반환할 때 어떤 타입인지에 대한 정보는 잃게 된다.
만약 number 타입을 넘긴다고 해도 any타입이 반환된다는 정보만 얻는다.
대신에 우리는 무엇이 반환되는지 표시하기 위해 인수의 타입을 캡처할 방법이 필요하다. 여기서는 값이 아닌 타입에 적용되는 **타입 변수**를 사용한다.
```Javascript
function identity<T>(arg: T): T {
    return arg;
}
```
identity 함수에 ```T``` 라는 타입 변수를 추가했다. ```T```는 유저가 준 인수의 타입을 캡쳐하고 이 정보를 나중에 사용할 수 있게 한다.
위 예제에서는 ```T```를 반환 타입으로 다시 사용한다.
인수와 반환 타입이 같은 타입을 사용하고 있는 것을 확인할 수 있다. 이를 통해 타입 정보를 함수의 한쪽에서 다른 한쪽으로 운반할 수 있게끔 한다.
이 버전의 identity 함수는 타입을 불문하고 동작하므로 제네릭이라 할 수 있다. ```any```를 쓰는 것과는 다르게 인수와 반환 타입에 number를 사용한 첫 번째 ```identity```
함수 만큼 정확하다.
일단 제네릭 identity 함수를 작성하고 나면 두 가지 방법 중 하나로 호출할 수 있다. 첫 번째 방법은 함수에 타입 인수를 포함한 모든 인수를 전달하는 방법이다.
```Javascript
let output = identity<string>("myString"); // 출력 타입은 'string'이다.
```
위의 예제에서 함수를 호출할 때의 인수 중 하나로써 ```T``` 를 ```string```으로 명시해 주고 인수 주변에 ```()``` 대신 ```<>```으로 감싸주었다.
두 번째 방법은 가장 일반적인 방법으로 **타입 인수 추론** 을 사용한다. 즉, 우리가 전달하는 인수에 따라 컴파일러가 ```T```의 값을 자동으로 정하게 하는 것이다.
```Javascript
let output = identity("myString"); //출력 타입은 'string'이다.
```
타입 인수를 ```<>``` 에 담지 않았지만, 컴파일러는 "myString" 을 보고 타입을 ```T```에 넣는다. **타입 인수 추론** 은 코드를 간결하고 가독성 있게 하는데 있어 유용하지만
복잡한 예제에서 컴파일러가 타입을 유추할 수 없는 경우에는 명시적인 타입 인수전달이 필요할 수도 있다.

## 제네릭 타입 변수 작업(Working with Generic Type Variables)

제네릭을 사용하기 시작하면, ```identity```와 같은 제네릭 함수를 만들 때, 컴파일러가 함수 본문에 제네릭 타입화된 매개변수를 쓰도록 강요한다.
즉, 이 매개변수들은 실제로 ```any``` 나 모든 타입이 될 수 있는 것처럼 취급할 수 있게된다.
위에서 봤던 ```identity``` 함수를 살펴보도록 하자.
```Javascript
function identity<T>(arg: T): T {
  return arg;
}
```
함수 호출 시마다 인수 ```arg```의 길이를 로그에 찍으려면 아래와 같이 쓰면된다.
```Javascript
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length); // 오류: T에는 .length 가 없다.
  return arg;
}
```
이러면 T가 뭔지 모르기 때문에 길이를 알 수 없다고 에러 메세지가 뜬다. 이럴 때는 아래처럼 바꿔주면 된다.
```Javascript
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length); // 배열은 .length를 가지고 있다. 따라서 오류는 없다.
  return arg;
}
```
```loggingIdentity```의 타입을 "제너릭 함수 ```loggingIdentity```는 타입 매개변수 T와 T 배열인 인수 ```arg```를 취하고 T 배열을 반환한다."라고 읽을 수 있다.
혹은 아래처럼 나타낼 수도 있다.

```Javascript
function loggingIdentity<T>(arg: Array<T>): Array<T> {
  console.log(arg.length); // 배열은 .length를 가지고 있다. 따라서 오류는 없다.
  return arg;
}
```
## 제네릭 타입(Generic Types)

이번에는 제네릭 함수자체의 타입과 제네릭 인터페이스를 만드는 방법에 대해서 보자.
제네릭 함수의 타입은 함수 선언과 유사하게 타입 매개변수가 먼저 나열되는, 제네릭이 아닌 함수 타입과 비슷하다.
```Javascript
function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: <T>(arg: T) => T = identity;
```
또는 타입 변수의 수와 타입 변수가 사용되는 방식에 따라 타입의 제네릭 타입 매개변수에 다른 이름을 사용할 수도 있다.
```Javascript
function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: <U>(arg: U) => U = identity;
```
제네릭 타입을 객체 리터럴 타입의 함수 호출 시그니처로 작성할 수도 있다.
```Javascript
function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: { <T>(arg: T): T } = identity;
```
위 예시와 같은 방식으로 제네릭 인터페이스를 작성할 수 있다. 앞서 예제의 객체 리터럴 을 인터페이스로 가져온다.
```Javascript
interface GenericIdentityFn {
  <T>(arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;
```
비슷한 예제에서, 제네릭 매개변수를 전체 인터페이스의 매개변수로 옮기고 싶을때는, 제네릭 타입을 확인하면 된다.
인터페이스의 다른 모든 멤버가 타입 매개변수를 볼 수 있다.
```Javascript
interface GenericIdentityFn<T> {
  (arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity; //<number>로 타입을 지정해주면된다.
```

제네릭 열거형과 네임스페이스는 만들 수 없다.































