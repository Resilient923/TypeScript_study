
const user = {
    name: "Hayes",
    id: 0,
  };
  interface User {
    name: string;
    id: number;
  }
  interface User {
    name: string;
    id: number;
  }
  // ---cut---
  const user2: User = {
    name: "Hayes",
    id: 0,
  };
  // @errors: 2322
interface User {
    name: string;
    id: number;
  }
  
  const user: User = {
    username: "Hayes",
    id: 0,
  };
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

  type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

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