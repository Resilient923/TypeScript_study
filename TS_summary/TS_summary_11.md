## 읽기 전용 지정자(Readonly modifier)

```readonly``` 키워드를 사용하여 프로퍼티를 읽기전용으로 만들 수 있다. 읽기전용 프로퍼티는 선언 할때나 생성자에서 초기화해야 한다.
```Javascript
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // 오류! name은 읽기전용이다.
```
## 매개변수 프로퍼티 (Parameter properties)

위 예제의 ```Octopus```클래스 내에서 ```name```이라는 읽기전용 멤버와 ```theName``` 이라는 생성자 매개변수를 선언했다. 이는 ```Octopus``` 의 생성자가 수행된 후에 
```theName```의 값에 접근하기 위해서 필요하다. **매개변수 프로퍼티** 를 사용하면 한 곳에서 멤버를 만들고 초기화할 수 있다.
아래는 매개변수 프로퍼티를 사용한 ```Octopus``` 클래스이다.
```Javascript
class Octopus {
    readonly numberOfLegs: number = 8;
    constructor(readonly name: string) {
    }
}
```
생성자에 짧아진 ```readonly name:string```파라미터를 사용하여 ```theName```을 제거하고 ```name```멤버를 생성하고 초기화했다. 선언과 할당을 한곳으로 통합한것이다.
매개변수 프로퍼티는 접근 지정자나 ```readonly``` 또는 둘 모두를 생성자 매개변수에 접두어로 붙여 선언한다. 매개변수 프로퍼티에 ```private```를 사용하면 비공개 멤버를 선언하고
초기화 한다. 마찬가지로, ```public```, ```protected```,```readonly```도 동일하게 작용한다.

## 접근자(Accessors)
TS는 객체의 멤버에 대한 접근을 가로채는 방식으로 getters/setters를 지원한다. 이를 통해 각 객체의 멤버에 접근하는 방법을 세밀하게 제어할 수 있다.
간단한 클래스를 ```get```과 ```set```을 사용하도록 변한해본다. 아래 예시는 ```getter, setter```가 없는 예제이다.
```Javascript
class Employee {
    fullName: string;
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```
사람들이 임의로 ```fullName```을 설정할 수 있도록 허용하는 것은 매우 편리하지만 ```fullName```이 설정될때 몇 가지 제약 조건을 걸고 싶으면
```getter, setter```를 추가해주면 된다. 만약 조건인 최대 길이를 초과한다면 코드에 문제가 있다는 것을 에러로 알려준다.
```getter, setter```을 추가한 예시코드를 보자.
```Javascript
const fullNameMaxLength = 10;

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (newName && newName.length > fullNameMaxLength) {
            throw new Error("fullName has a max length of " + fullNameMaxLength);
        }

        this._fullName = newName;
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```
## 전역 프로퍼티(Static Properties)

지금까지는 인스턴스화될 때 객체에 보이는 인스턴스멤버에 대해서만 살펴보았다. 인스턴스가 아닌 클래스 자체에서 보이는 **전역멤버**를 생성할 수 있다.
아래 예제에서는 모든 grid의 일반적인 값이기 때문에 origin에 ```static``` 을 사용한다. 각 인스턴스는 클래스 이름을 앞에 붙여 이 값에 접근할 수 있다.
인스턴스 접근 앞에 ```this.```를 붙이는 것과 비슷하게 여기서는 전역 프로퍼티 접근할때 ```Grid.```을 붙인다.
```Javascript
class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
```
## 추상 클래스(Abstract Classes)

추상 클래스는 다른 클래스들이 파생될 수 있는 기초 클래스이다. 추상 클래스는 직접 인스턴스화 할 수 없다. 추상 클래스는 인터페이스와 달리 멤버에 대한 세부 정보를 포함할 수 있다.
```abstract```키워드는 추상 클래스뿐만아니라 추상 클래스 내에서 추상 메서드를 정의하는데 사용된다.
```Javascript
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log("roaming the earth...");
    }
}
```
추상 클래스 내에서 abstract로 표시된 메서드는 구현을 포함하지 않으며 반드시 파생된 클래스에서 구현되어야 한다. 추상 메서드는 인터페이스 메서드와 비슷하다.
둘 다 메서드 본문을 포함하지 않고 메서드를 정의한다. 그러나 추상메서드는 ```abstract```를 반드시 앞에 붙여줘야 된다.
```Javascript
abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log("Department name: " + this.name);
    }

    abstract printMeeting(): void; // 반드시 파생된 클래스에서 구현되어야 한다.
}

class AccountingDepartment extends Department {

    constructor() {
        super("Accounting and Auditing"); // 파생된 클래스의 생성자는 반드시 super()를 호출해야 한다.
    }

    printMeeting(): void {
        console.log("The Accounting Department meets each Monday at 10am.");
    }

    generateReports(): void {
        console.log("Generating accounting reports...");
    }
}

let department: Department; // 추상 타입의 레퍼런스를 생성한다
department = new Department(); // 오류: 추상 클래스는 인스턴스화 할 수 없다
department = new AccountingDepartment(); // 추상이 아닌 하위 클래스를 생성하고 할당한다
department.printName();
department.printMeeting();
department.generateReports(); // 오류: 선언된 추상 타입에 메서드가 존재하지 않다.
```
## 생성자 함수(Constructor functions)
TS에서 클래스를 선언하면 실제로는 여러 개의 선언이 동시에 생성된다. 첫 번째로 클래스의 **인스턴스 타입**이다.
```Javascript
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter: Greeter;
greeter = new Greeter("world");
console.log(greeter.greet()); // "Hello, world""
```
또한 **생성자 함수**라는 값도 생성한다.
```Javascript
let Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
})();

let greeter;
greeter = new Greeter("world");
console.log(greeter.greet()); // "Hello, world"
```
위의 예시에서 ```let Greeter```는 생성자 함수를 할당받는다. ```new```를 호출하고 이 함수를 실행할 때, 클래스의 인스턴스를 얻는다. 또한 생성자 함수는
클래스의 모든 전역 변수들을 포함하고 있다. 각 클래스를 생각하는 또 다른 방법은 ```인스턴스, static```측면이다.
```Javascript
class Greeter {
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet()); // "Hello, there"

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet()); // "Hey there!"
```

## 인터페이스 클래스 사용하기

앞서 언급한 것처럼, 클래스 선언은 클래스의 인스턴스를 나타내는 타입과 생성자 함수라는 두 가지를 생성한다. 
클래스는 타입을 생성하기 때문에 인터페이스를 사용할 수 있는 동일한 위치에서 사용할 수 있다
```Javscript
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```


















