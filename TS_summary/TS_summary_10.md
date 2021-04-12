# 클래스

먼저 간단한 클래스 예시를 보자.
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

let greeter = new Greeter("world");
```
새로운 ```Greeter```클래스를 선언했다. 이 클래스는 3개의 멤버를 가지고 있다. ```Greetins``` 프로퍼티와 생성자 그리고 ```greet``` 메서드다.
클래스 안에서 클래스의 멤버를 참조할 때, ```this.``` 를 앞에 덧붙이는 것을 알 수 있다. 이것은 멤버에 접근하는 것을 의미한다. 마지막 줄에서 ```new``` 를 사용하여 ```Greeter```클래스의
인스턴스를 생성한다. 이 코드는 이전에 정의했었던 ```생성자```를 호출하여 ```Greeter```형태의 새로운 객체를 만들고, 생성자를 실행해 초기화한다.

## 상속

TS에서는 객체 지향 패턴을 사용할 수 있다. 클래스기반의 프로그래밍 가장 큰 특징은 상속을 이용해서 이미 존재하는 클래스를 확장해 새로운 클래스를 만들 수 있다는 것이다.
예제를 보자.
```Javascript
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```
```Dog```는 ```extends```키워드를 사용해서 ```Animal```이라는 기초클래스로부터 파생된 클래스이다. 파생된 클래스는 **하위클래스** 원래 클래스는 **상위클래스** 라고 한다.
```Dog```는 ```Animal```의 기능을 확장하기 때문에 ```bark()와 move()```를 모두 가진 ```Dog``` 인스턴스를 생성할 수 있다.
좀더 구체화 시킨 예제를 보자.
```Javascript
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
```
이번에도 ```extends``` 키워드를 사용해서 ```Animal```의 하위 클래스 ```Horse와Snake```를 생성해준다.
이전 예제와 한 가지 다른 부분은 파생된 ```Horse & Snake```함수는 기초클래스의 생성자를 실행할때 **```super()```** 를 호출해서 ```this```에 있는 프로퍼티에 접근해야 한다.
기초 클래스의 메서드를 하위 클래스에 특화된 메서드로 오버라이드하는 방법을 보여준다. ```Snake```와 ```Horse```는 ```Animal```의 ```move```를 오버라이드 해서 각각 클래스 특성에 맞게
기능을 가진```move```를 생성한다.
```tom```은 ```Animal```로 선언되었지만 ```Horse```의 ㄱ밧을 가지므로 ```tom.move(34)```는 ```Horse```의 오버라이딩 메서드를 호출한다.
```Javascript
Slithering...
Sammy the Python moved 5m.
Galloping...
Tommy the Palomino moved 34m.
```

# Public, private 그리고 protected 지정자 (Public, private, and protected modifiers)

### Public
public은 프로그램내에서 멤버들에 자유롭게 접근할 수 있게 한다. TS에서 각 멤버는 기본적으로 ```public```이다.
위에 예제 코드를 아래와 같이 작성해도 같은 의미이다.
```Javascript
class Animal {
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
```
### ECMAScript 비공개 필드(ECMAScript Private Fields)
TS 3.8 에서 TS는 비공개를 위한 JS의 새로운 뭄법을 지원한다.
```Jacascript
class Animal {
    #name: string;
    constructor(theName: string) { this.#name = theName; }
}

new Animal("Cat").#name; // 프로퍼티 '#name'은 비공개 식별자이기 때문에 'Animal' 클래스 외부에선 접근할 수 없다.
```
### Private 

TS에는 멤버를 포함하는 클래스 외부에서는 이 멤버에 접근하지 못하도록 멤버를 ```private```으로 표시해주는 방법이 있다.

```Javascript
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // 오류: 'name'은 비공개로 선언되어 있다;
```
TS는 구조적인 타입 시스템을 가지고 있다. 두개의 다른 타입을 비교할 때 어디서 왔는지랑은 상관없이 모든 멤버의 타입이 호환 된다면, 그 타입들 자체가 호환 가능하다고 말한다.
그러나 ```private``` 및 ```protected```멤버가 있는 타입들을 비교할 때는 타입을 다르게 처리한다. 호환된다고 판단되는 두개의 타입 중 한쪽에서 ```private``` 멤버를 가지고 있다면 다른 한쪽도 무조건 동일한 선언에
```private```멤버를 가지고 있어야 한다. ```protected```멤버에도 동일하게 적용된다.
다음 예제를 보자.
```Javascript
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal {
    constructor() { super("Rhino"); }
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee; // 오류: 'Animal'과 'Employee'은 호환될 수 없음.
```
이 예제에서는 ```Animal```과 ```Animal```의 하위클래스인 ```Rhino```가 있다. ```Animal```과 형태가 같아보이는 ```Employee```라는 새로운 클래스도있다.
이 클래스들의 인스턴스를 생성해서 할당하고 어떻게 작동하는지 보면
```Animal```과 ```Rhino```는 ```Animal```의 ```private name:string```이라는 동일한 선언으로 부터 ```private```부분을 공유하기 때문에 호환이 가능하다.
하지만 ```Employee```는 ```Animal```에 할당할 때 ```Animal```에서 선언한 ```name```이 아니기 때문에 호환되지 않는다는 오류가 발생한다.

### protected 

```protected```지정자도 ```protected```로 선언된 멤버를 파생된 클래스 내에서 접근할 수 있다는 점만 제외하면 ```private```지정자와 매우 유사하게 동작한다. 
예시를 보자.
```Javascript
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // 오류
```
```Person```외부에서 ```name```을 사용할 수 없지만 ```Employee```는 ```Person```에서 파생되었기 때문에 ```Employee```의 인스턴스 메서드 내에서는 여전히 사용할 수 있다.
생성자도 ``` protected```로 표시될 수 있다. 클래스를 포함하는 클래스 외부에서 인스턴스로 사용할 수 었지만 확장은 할 수 있다.
예시를 보자.
```Javascirpt
class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee는 Person을 확장할 수 있습니다.
class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
let john = new Person("John"); // 오류: 'Person'의 생성자는 protected 이다.
```

































