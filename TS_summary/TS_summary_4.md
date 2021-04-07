# 인터페이스

TS 핵심 원칙 중 하나는 타입검사가 값의 **타입** 에 초점을 맞추고 있다는 것이다.
이를 덕타이핑(duck typing) 혹은 구조적 서브타이핑(structural subtyping) 이라고도 한다.
TS에서 인터페이스는 이런 타입들의 이름을 짓는 역할을 하고 코드 안의 계약을 정의하는 것뿐만 아니라 프로젝트 외부에서 사용하는 코드의 계약을 정의하는 강력한 방법이다.

## 먼저 인터페이스가 어떻게 동작하는지 본다
```Javascript
function printLabel(labeledObj:{label:string}){
    console.log(labeledObj.label);
}
let myObj = {size:10,label:"Size 10 Object"};
printLabel(myObj);
```
타입 검사는 ```printLabel``` 호출을 확인한다. ```printLabel```함수는 ```string```타입 ```label```을 갖는 객체를 하나의 매개변수로 가진다. 이 객체는 실제로는 더 많은 프로퍼티를 가지고 있지만
컴파일러는 최소로 필요한 프로퍼티가 있는지, 타입이 잘 맞는지만 검사한다.
이번엔 위와 같은 예제를 문자열 타입의 프로퍼티 ```label```을 가진 인터페이스로 다시 작성해 본다.
```Javascript
interface LabeledValue {
    label: string;
}

function printLabel(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```
```LabeledValue``` 인터페이스는 위에 예제의 요구사항을 똑같이 실행해주는 이름으로 사용될 수 있다. 이 인터페이스는 여전히 ```string```타입의 ```label``` 프로퍼티 하나를 가진다는 것을 의미한다.
다른 언어처럼 ```printLabel```에 전달한 객체가 이 인터페이스를 구현하고 있다고 명시적으로 얘기할 필요는 없다. 중요한건 형태이다. 함수에 전달된 객체가 나열된 요구 조건을 충족하면, 허용된다.
타입 검사는 프로퍼티들의 순서를 요구하지 않는다. 단지 인터페이스가 요구하는 프로퍼티들이 존재하는지와 프로퍼티들이 요구하는 타입을 가졌는지만을 확인한다.
 
## 선택적 프로퍼티(Optional Properties)

인터페이스의 모든 프로퍼티가 필요한것은 아니다. 어떤 조건에서만 존재하거나 아예 없을 수도 있다. 선택적 프로퍼티들은 객체 안의 몇개의 프로퍼티만 채워 함수에 전달하는 **Option bags** 와 같은들 때
패턴을 만들 떄 유용하다.
선택적 프로퍼티를 작성 할때는 다른 인터페이스와 비슷하지만 선언부분에서 프로퍼티 이름 끝에 ```?``` 을 붙여서 표시해준다.
```Javascript
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});
```
선택적 프로퍼티의 이점은 인터페이스에 속하지 않는 프로퍼티의 사용을 방지하면서, 사용 가능한 속성을 기술하는 것이다. 예를 들어, ```createSquare```안의 ```color``` 프로퍼티 이름을 잘못
입력하면, 아래와 같이 오류 메세지로 알려준다.
```Javascript
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = {color: "white", area: 100};
    if (config.clor) {
        // Error: Property 'clor' does not exist on type 'SquareConfig'
        newSquare.color = config.clor;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});
```
## 읽기전용 프로퍼티(Readonly Properties)

읽기전용 프로퍼티는 객체가 처음 생성될 때만 수정 가능하게 만들어진다.(수정이 안되게 한다.) 프로퍼티 이름 앞에 ```readonly```를 붙여서 선언함으로써 지정할 수 있다.
```Javascript
interface Point {
    readonly x: number;
    readonly y: number;
}
```
객체 리터럴을 할당하여 ```point```를 생성한다. 할당 후에는 ```x,y```를 수정할 수 없다.
```Javascript
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // Error!
```
TS에서는 변경 메소드(Muatating Methods)가 제거된 ```Array<T>``` 와 동일한 ```ReadonlyArray<T>```타입을 제공한다. 생성 후에 배열을 변경하게 되면 에러로 알려준다.
```Javascript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // 오류!
ro.push(5); // 오류!
ro.length = 100; // 오류!
a = ro; // 오류!
a = ro as number[]; //Type assertion(타입 단언)으로 오버라이드는 가능하다!
```
**```readonly```와 ```const```는 비슷한 성질을 가지고 있다. 변수에는 ```const``` 프로퍼티에는 ```readonly```를 사용하면 된다.**

## 초과 프로퍼티 검사(Excess Property Checks)

첫번째 에제에서 TS가 {label:string;} 을 기대해도 {size:number; label:string;} 을 허용해줬다. 위의 선택적 프로퍼티를 배우고, **option bags** 패턴을 사용할 수 있어 유용하다고 배웠다.
하지만 선택적 프로퍼티를 사용하다가도 에러가 발생할 수 있다. 예를 들어 ```createSquare```을 사용한 마지막 예제를 보면 알 수 있다.
```Javascript
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}

let mySquare = createSquare({ colour: "red", width: 100 }); // color가 아닌 colour로 전달되었다.
```
위와 같이 매개변수가 잘못 작성이 되면 JS는 별 신경을 안쓸 수도 있다. 
```width``` 프로퍼티는 적합하고, ```colour```프토퍼티는 중요하지 않다고 생각을 하고 JS는 이 프로그램은 문제없다고 말 할 수있다.

하지만 TS는 이 코드에 버그가 있다고 생각한다. 객체 리터럴은 다른 변수에 할당할 때나 인수로 전달할 때, 특별한 처리를 받고 이 과정에서 **```Excess Property Checks```** 를 받는다.
만약 객체 리터럴이 대상 타입이 가지고 있지 않은 프로퍼티를 가지고 있으면, 에러를 발생 시킨다.
```Javascript
// error: Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
let mySquare = createSquare({ colour: "red", width: 100 });
```
위와 같은 에러를 피하기 위해서 사용하는 가장 간단한 방법은 ```타입 단언 Type assertion``` 을 사용하는 것이다.
```Javascript
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```
하지만 추가 프로퍼티가 있음을 확신하게 되면 문자열 인덱스 서명(string index signature)을 추가해주는게 더 좋은 방법이다 .
만약 ```SquareConfig``` 가 ```color```와 ```width``` 프로퍼티를 가지고 있고, 다른 프로퍼티를 추가로 가지고 싶으면 아래와 같이 정의하면 된다.
```Javascript
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
```
Excess Property Checks를 받지 않는 방법은 객체를 다른 변수에 할당해 버리는 것이다. ```SquareOptions``` 가 추가 프로퍼티 검사를 받지 않기 때문에 TS 컴파일러는 에러를 주지 않는다.
```Javascript
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```
```squareOptions```와```SquareConfig``` 사이에 공통 프로퍼티가 있는 경우에만 위와 같은 방법을 사용할 수 있다.

예를 들어 아래 예제 같은 경우에는 공통 객체 프로퍼티가 없어서 에러가 날 수 있다.
```Javascript
let squareOptions = { colour: "red" };
let mySquare = createSquare(squareOptions);
```
검사를 피하는 방법은 좋지 않다. 메소드를 확인해보고, 타입을 확인해 보는 과정이 필요하다.
초과 프로퍼티에러의 대부분은 실제 버그이다. 만약 ```Option bag``` 같은 패턴에서 초과 프로퍼티 문제가 발생하면, 타입 정의를 수정하거나 다른 조취를 취해야 한다.



























