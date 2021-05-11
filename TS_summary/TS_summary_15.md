# 제네릭 클래스(Generic Classes)

제네릭 클래스와 제네릭 인터페이스는 형태가 비슷하다. 제네릭 클래스는 클래스 이름 뒤에 ```<>``` 안쪽에 네제릭 타입 매개변수 목록을 가진다.
```Javascript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```
예제에서 ```GenericNumber``` 클래스의 문자 그대로 사용하지만 ```number``` 타입만 쓰도록 제한하지는 않는다. 대신 ```string```이나 더 복잡한 객체를 사용할 수 있다.
```Javascript
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
```
인터페이스와 마찬가지로 클래스 자체에 타입 매개변수를 넣으면 클래스의 모든프로퍼티가 동일한 타입으로 동작하는 것을 확인할 수 있다.
```클래스```는 두 가지 타입을 나타낸다. 
- 정적 측면
- 인스턴스 측면
제네릭 클래스는 정적 측면이 아닌 인스턴스 측면에서만 제네릭이므로 클래스로 작업할 때 정적 멤버는 클래스의 타입 매개변수를 쓸 수 없다.

## 제네릭 제약조건(Generic Constraints)

앞쪽의 예제를 보면 특정 타입으로 동작하는 제네릭 함수를 만들어야 할 거 같은 경우가 있다. 앞에서 ```loggingIdentity``` 예제에서 ```arg``` 의 프로퍼티 ```.length```에
접근하기를 우너했지만, 컴파일러는 모든 타입에서 ```.length``` 프로퍼티를 가지고 있는지 알 수 없으므로 오류가 발생한다.
```Javascript
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);  // 오류: T에는 .length가 없다.
    return arg;
}
```
```any``` 와 모든 타입에서 동작하는 대신에, ```.length``` 프로퍼티가 있는 ```any``` 와 모든 타입들에서 작동하는 것으로 제한하려면, 타입이 이멤버가 있는 경우는 허용하지만, 
최소한 ```.length``` 가 있어햐 한다. 그렇게 하려면 ```T```가 무엇이 될 수 있는지에 대한 제약 조건을 나열 해야 한다.

이를 위해 우리의 제약조건이 명시하는 인터페이스를 만든다. 여기 하나의 프로퍼티 ```.length```를 가진 인터페이슬 생성하고, 우리의 제약사항을 ```extends``` 키워드로 표현한
인터페이스를 이용해 명시해준다.
```Javascript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // 이제 .length 프로퍼티가 있는 것을 알기 때문에 더 이상 오류가 발생하지 않는다.
    return arg;
}
```
제네릭 함수는 이제 제한되어 있기 때문에 모든 타입에 대해서는 동작하지 않는다.
사용하려면 필요한 프로퍼티들이 있는 타입의 값을 전달해야 한다.
```Javascript
loggingIdentity(3);  // 오류, number는 .length 프로퍼티가 없다.

loggingIdentity({length: 10, value: 3});
```

## 제네릭 제약조건에서 타입 매개변수 사용(Using Type Parameters in Generic Constraints)

다른 타입 매개변수로 제한된 타입 매개변수를 선할 수 있다.
이름이 있는 객체에서 프로퍼티를 가져오고 싶은 경우를 예로 들어 보자. ```obj```에 존재하지 않는 프로퍼티를 가져오지 않도록하기 위해
두가지 타입에 제약조건을 설정했다.
```Javascript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // 성공
getProperty(x, "m"); // 오류: 인수의 타입 'm' 은 'a' | 'b' | 'c' | 'd'에 해당되지 않음.
```

## 제네릭에서 클래스 타입 사용(Using Class Types in Generics)

제네릭을 사용하는 TS에서 팩토리를 생성할 때는 생성자 함수로 클래스 타입을 참조해야 한다.
```Javascript
function create<T>(c: {new(): T; }): T {
    return new c();
}
```
예시를 보자.
```Javascript
class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;  // 타입검사!
createInstance(Bee).keeper.hasMask;   // 타입검사!
```


























