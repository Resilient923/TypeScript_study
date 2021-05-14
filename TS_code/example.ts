enum GenderType {
  Male = "male",
  female = "female",
  genderNeutral = "genderneutral",
}
let student = {
  name: "Jake",
  coures: "hi",
  codingIQ: 90,
  code: function () {
    console.log("brain is working hard");
  },
};

function calculateCodingIQ(lostPoints: number) {
  return 100 - lostPoints;
}

let student1 = {
  studentID: 1234,
  studentName: "string;",
  gender: "female",
  subject: "female",
  Completed: false,
};

interface Student {
  // 이름앞에 i 안붙여줘도된다.
  readonly studentID: number;
  studentName: string;
  age?: number; //선택적프로퍼티
  gender: "male" | "female" | "genderNeutral";
  subject: string;
  Completed: boolean;
  // addComment(comment:string):string;
  addComment?: (comment: string) => string;
}

function getStudentDetails(studentID: number): Student {
  return {
    studentID: 1234,
    studentName: "string;",
    gender: "male",
    subject: "female",
    Completed: false,
  };
}

let price: number | string | boolean = 5;
price = "free";
price = true;

type StrOrNum = number | string;
let itemPrice: number;
const setItemPrice = (price: StrOrNum): void => {
  //코드검증수행-> 타입가드
  if (typeof price === "string") {
    itemPrice = 0;
  } else {
    itemPrice = price;
  }
};
setItemPrice(50);

/////////////////////////////////////////////////////////////////////
//function
function sendGreeting(message: string, userName?: string): void {
  console.log(`${message},${userName}`);
}

//sendGreeting('hello');//매개변수 숫자가 안맞다
sendGreeting("heool"); //선택적매개변수 사용
// 선택적 매개변수들은 필수 매개변수 뒤에 위치해야한다.

//arrow function
function add(num1: number, num2: number) {
  return num1 + num2;
}
const add2 = (num1: number, num2: number) => num1 + num2;

class Employee {
  

  constructor(
    private _fullName: string,
    private age: number,
    private jobTitle: string,
    private hourlyRate: number,
    private workingHoursPerWeek: number
  ) {
    //Constructor의 매개변수에 AccessModifiers 직접 적용
  }
  get fullName() {
    return this._fullName;
  }
  set fullName(value: string) {
    this._fullName = value;
  }
  printEmployeeDetails = (): void => {
    //메소드들
    console.log(`${this._fullName}의 직업은 ${this.jobTitle}이고
              일주일수입은 ${this.hourlyRate * this.workingHoursPerWeek}이다.`);
  };
}

let employee1 = new Employee("aaa;", 28, "dev", 40, 45);
employee1.printEmployeeDetails();
employee1.fullName = "hi";
