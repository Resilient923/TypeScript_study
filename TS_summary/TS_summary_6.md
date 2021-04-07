# 함수(Function)

함수는 JS로 된 애플리케이션에서의 기본적인 구성 요소이다. JS함수는 추상화 계층을 구축하거나 모듈, 클래스에 관한 방법을 제공한다.
TS에는 클래스,네임스페이스 모듈이 있지만 함수는 가장 핵심 역할을 수행한다고 할 수 있다. TS에서는 JS함수의 기능을 그대로 가져와 작업을 더 수월하게 할 수 있도록 몇 가지 새로운 기능을  추가한다.
TS함수는 JS와 마찬가지로 **named function** 과 **anonymous function** 로 만들 수 있다. 이를 통해 API에서 함수목록을 작성하거나 일회성 함수를 써서 다른 함수로 전달하는 방법으로 작성하거나 
애플리케이션에 가장 효과적이고 적합한 방법을 선택할 수 있다.
위 두가지 방법에 대한 예시를 보자.
```Javascript
// 기명 함수
fucntion add(x, y) {
  return x + y;
}

// 익명 함수
let myAdd = function(x, y) { return x + y };
```
JS에서처럼 함수는 함수 외부의 변수값을 참조할 수 있다. 이런 경우를 변수를 캡처(Capture) 한다고 한다. 이 메커니즘이 어떻게 작동하는지에 대한 이해가 확실히 필요하다.
```Javascript
let z = 100;

function addToZ(x, y) {
  return x + y + z;
}
```
## 함수 타입(Function Types)
#### 함수의 타이핑(Typing the function)
이전에 사용했던 예시에 타입을 더해보자.
```Javascript
function add(x: number, y: number): number {
    return x + y;
}

let myAdd = function(x: number, y: number): number { return x + y };
```
각 파라미터와 함수 자신의 반환될 타입을 정해줄 수 있다. TS는 반환문을 보고 반환 타입을 파악할 수 있으므로 반호나 타입을 생략할 수 있다.
#### 함수 타입 작성하기(Writing the function type)
함수에 타입을 붙인후, 함수 타입들을 살펴보고 함수의 전체 타입을 작성해보자.
```Javascript
let myAdd: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };
```
함수의 타입은 ```매개변수타입```과 ```반환타입```이 있다. 전체 함수 타입을 작성하고자 한다면 이 두가지 타입이 필요하다. 매개변수 목록처럼 각 매개변수에 이름과
타입을 작성해서 가독성을 높여준다.
```Javascript
let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };
```
매개변수 타입들이 올바르게 나열되어 있으면 함수 타입에 이름을 붙이더라도 유효한 타입으로 간주한다.

매개변수 타입들과 반환 타입 사이에 ```화살표(=>)``` 표기를 써서 반환 타입을 분명히 할 수 있다. 이전에 언급했듯이 함수표기에 꼭 필요한 부분이다.
만약 함수가 값을 반환하지 않는다면 비워두지말고 ```void```를 써서 표시한다.

#### 타입의 추론(Inferring the types)
TS 컴파일러가 방정식의 한쪽에만 타입이 있더라도 타입을 알아낼 수 있다.
```Javascript
// myAdd는 전체 함수 타입을 가집니다
let myAdd = function(x: number, y: number): number { return  x + y; };

// 매개변수 x 와 y는 number 타입을 가집니다
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
```
# 선택적 매개변수와 기본 매개변수(Optional and Default Parameter)

TS에서는 모든 매개변수가 함수에 필요하다고 가정한다. '모든 매개변수' 에는 ```null``` 이나 ```undefined```도 가능하다. 대신 함수가 호출될 때, 컴파일러는 각 매개변수에
대해 사용자가 값을 제공헀는지를 검사한다. 또한 컴파일러는 매개변수들이 함수로 전달될 유일한 매개변수라고 가정한다. 함수에 주어진 인자의 수는 함수가 기대하는 매개변수의 
수와 일치해야 한다.
```Javascript
function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // 오류, 너무 적은 매개변수
let result2 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
let result3 = buildName("Bob", "Adams");         // 정확함
```
JS에서는 모든 매개변수가 선택적이고 사용자는 적합하다고 생각하면 그대로 둘 수 있다. 그렇게 두면 값은 ```undefiend```가 된다. TS에서 선택적 매개변수를 원한다면
매개변수 이름 끝에 ```?```를 붙여서 해결 가능하다. 그 예시로 이름(성)을 선택적 매개변수로 하는 경우를 예시로 보자.
```Javascript
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

let result1 = buildName("Bob");                  // 지금은 바르게 동작
let result2 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
let result3 = buildName("Bob", "Adams");         // 정확함
```
어느 선택적 매개변수든 반드시 매개변수 정의가 필요하다. lastName 대신 firstName 을 선택적으로 하고 싶다면 매개변수의 순서를 변경해야 한다.
TS에서는 유저가 값을 제공하지 않거나 ```undefiend```로 했을 때에 할당될 매개변수의 값을 정해 놓을 수도 있다. 이걸 ```기본-초기화 매개변수```라고 한다.
위 예시에서 ```lastName```을 ```"Smith"``` 라고 지정해 보자.
```Javascript
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // 올바르게 동작, "Bob Smith" 반환
let result2 = buildName("Bob", undefined);       // 여전히 동작, 역시 "Bob Smith" 반환
let result3 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
let result4 = buildName("Bob", "Adams");         // 정확함
```
모든 필수 매개변수 뒤에 오는 ```기본-초기화 매개변수```는 선택적으로 처리되며, 선택적 매개변수와 마찬가지로 해당 함수를 호출할 때 생략 가능하다.
이는 선택적 매개변수와 뒤따르는 기본 매개변수의 타입들이 공통성을 공유함을 의미한다. 
```Javascript
function buildName(firstName: string, lastName?: string) {
    // ...
}
function buildName(firstName: string, lastName = "Smith") {
    // ...
}
```
위 예제 두개는 ```(firstName: string, lastName?: string) => string``` 라는 공통된 타입을 공유한다.
```lastName```의 기본값은 타입에서 사라지고 오직 선택적 매개변수라는 사실만 남긴다.

# 나머지 매개변수(Rest Parameters)
필수, 선택적, 기본 매개변수는 한 번에 하나의 매개변수만을 가지고 이야깋나다. 때로는 다수의 매개변수를 그룹 지어 작업하기를 원하거나, 함수가 최종적으로 얼마나 많은 매개변수를
취할지 모를 때도 있다. JS에서는 모든 함수 내부에 위치한 ```arguments``` 라는 변수를 사용해 직접 인자를 가지고 작업할 수 있다.
TS에서는 이 인자들을 하나의 변수로 모을 수 있다.
```Javascript
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

// employeeName 은 "Joseph Samuel Lucas MacKinzie" 가 된다.
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```
***나머지 매개변수*** 는 선택적 매개변수들의 수를 무한으로 취급한다. 나머지 매개변수로 인자들을 넘겨 줄 때는 당신이 원하는 만큼 넘겨 줄 수도 있다. 아무것도 
안넘겨줘도 된다. 컴파일러는 ```생략 부호(...)``` 뒤의 이름으로 전달된 인자 배열을 빌드해서 함수에서 사용할 수 있도록 한다.
생략 부호는 나머지 매개변수가 있는 함수의 타입에도 사용된다.
```Javascript
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
```






























