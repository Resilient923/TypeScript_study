# TS 기본

TS는 JS와 거의 동일한 데이터 타입을 지원하고 열거 타입이 추가되어 더 편리하게 사용할 수 있다.

### 불리언(Boolean)

가장 기본적인 데이터 타입은 ```boolean``` 값이라고 하는 참/거짓(True/False)를 나타내는 타입이다.
```Javascript
let isDone: boolean = false;
```
### 숫자(Number)
JS와 TS 둘다 모든 숫자는 부동 소수 값이다. 부동 소수에는 ```number``` 라고 하는 타입이 붙는다. TS는 16진수, 10진수 리터럴에 더불어 ECMAScript에 소개된 2진수, 8진수 리터럴도 지원한다.
```Javascript
let decimal:number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```
### 문자열(String)
웹 페이지, 서버 프로그램을 JS 로 만들 떄 기본적으로 텍스트 데이터를 다루는 작업이 필요하다. 다른 언어들처럼 TS에는 텍스트 데이터 타입을 ```string```으로 표현한다.
JS처럼 TS도 큰따옴표(")나 작은따옴표(')를 문자열 데이터를 감싸는데 사용한다.
```Javascript
let color: string = "blue";
color = 'red';
```
또한 템플릿 문자열을 사용하면 여러 줄에 걸쳐 문자열을 작성할 수 있으며, 표현식을 포함시킬 수도 있다. 이 문자열은 백틱/백쿼트(`)문자로 감싸고 ```${expr}``` 과 같은 형태로 표현식을 포함 시킬 수 있다.
```Javascript
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.
I'll be ${ age + 1 } years old next month.`;
```
### 배열(Array)
 
TS는 JS와 같이 값들을 배열로 다룰 수 있게 해준다. 배열 타입은 두가지 방법으로 쓸 수 있다.
첫 번째 방법은, 배열 요소들을 나타내는 타입 뒤에 ```[]``` 를 쓰는 것이다.

```Javascript
let list:number[] = [1,2,3];
//또한 제네릭 배열 타입을 사용할 수 있다.```Array<Type>```
let list:Array<number> = [1,2,3];
```

### 튜플(Tuple)

튜플 타입을 사용하면, 요소의 타입과 개수가 고정된 배열을 나타낼 수 있다.
요소들의 타입이 모두 같을 필요는 없다. 예를 들어 ```number``` , ```string``` 이 쌍으로 있는 값을 나타낼 수 있지만 타입이 다를 경우 순서는 같아야 한다.

```Javascript
//튜플 타입으로 선언
let x:[string,number];
//초기화
x = ["hello",10];
//초기화 에러
x = [10,"hello"];

//에러예시1
console.log(x[0].substring(1)); // 성공
console.log(x[1].substring(1)); // 오류, 'number'에는 'substring' 이 없습니다.
//에러예시2
x[3] = "world"; // 오류, '[string, number]' 타입에는 프로퍼티 '3'이 없습니다.

console.log(x[5].toString()); // '[string, number]' 타입에는 프로퍼티 '5'가 없습니다.
```

### 열거(Enum)

JS의 표준 자료형 집합과 사용하면 도움이 될만한 타입이다. ```enum``` 은 값의 집합에 더 적합한 이름을 붙일 수 있다.
```Javascript
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```
기본적으로 ```enum```은 0부터 시작하여 멤버들의 번호를 매긴다. 멤버 중 하나의 값을 수동으로 설정해서 번호를 바꿀 수 있다.
예를 들어, 위 예제를 0대신 1부터 시작해 번호를 매기도록 바꿀 수 있다.
```Javascript
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;
```
또한 모든 값을 수동으로 설정할 수도 있다.
```Javascript
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
```

```enum```의 유용한 기능 중 하나는 매겨진 값을 사용해 enum멤버의 이름을 알아낼 수 있다는 것이다.
예를 들어, 위의 예제에서 2라는 값이 위의 어떤 Color enum 멤버와 매칭되는지 알 수 없을 때도 일치하는 이름을 알아낼 수 있다.
```Javascript
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName); // 값이 2인 'Green'이 출력됩니다.
```

### Void

void는 어떤 타입도 존재할 수 없음을 나타낸다. ```any(잘쓰이지않아 설명생략)``` 의 반대타입같다. ```void```는 보통 함수에서 반환값이 없을 때 반환 타입을 표현하기 위해
쓰이는 것을 볼 수있다.
```Javascript
function warnUser(): void {
    console.log("This is my warning message");
}
```
```void```를 타입 변수로 선언하는 것은 좋은 선택이 아니다. 
이유는 그 변수에는 ```null(--strictNullChecks```을 사용하지 않을 때만 해당, 자세한 건 다음 섹션을 참고)또는 ```undefined``` 만 할당할 수 있기 때문이다.
```Javascript
let unusable: void = undefined;
unusable = null; // 성공  `--strictNullChecks` 을 사용하지 않을때만
```

### Null & Undefined

TS는 ```undefined``` 과 ```null```  둘 다 각각 자신의 타입 이름으로 ```undefined``` , ```null```로 사용한다. ```void```처럼 그 자체로 유용한 경우는 거의 없다.

기본적으로 null 과 undefined는 다른 모든 타입의 하위 타입이다. 이건, null과 undefined를 number 같은 타입에 할당할 수 있다는 것을 의미한다.

하지만, --strictNullChecks를 사용하면, null과 undefined는 오직 any와 각자 자신들 타입에만 할당 가능하다. (예외적으로 undefined는 void에 할당 가능하다) 
이건 많은 일반적인 에러를 방지하는 데 도움을 준다. 이 경우, string 또는 null 또는 undefined를 허용하고 싶은 경우 유니언 타입인 string | null | undefined를 사용할 수 있다.

### 객체(Object)

```object```는 원시 타입이 아닌 타입을 나타낸다.
```object``` 타입을 사용하면 ```Object.create``` 같은 API가 더 잘 나타난다.
```Javascript
declare function create(o: object | null): void;

create({ prop: 0 }); // 성공
create(null); // 성공

create(42); // 오류
create("string"); // 오류
create(false); // 오류
create(undefined); // 오류
```
### let

지금까지 더 익숙할 수도 있는 JS의 var키워드 대신 **let** 키워드를 이용했다는 걸 알 수 있다. 
**let** 키워드는 JS ES2015에서 소개되었고, **var**보다 안전하다는 이유로, 현재 표준으로 여겨지고 있다. 나중에 더 자세히 살펴보겠지만, 
대부분의 JS의 문제들이 **let**을 사용해서 해결되며, 때문에 가능한 경우 최대한 var대신 **let**을 사용해야 한다.













 





















