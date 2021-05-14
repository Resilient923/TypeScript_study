var GenderType;
(function (GenderType) {
    GenderType["Male"] = "male";
    GenderType["female"] = "female";
    GenderType["genderNeutral"] = "genderneutral";
})(GenderType || (GenderType = {}));
var student = {
    name: "Jake",
    coures: "hi",
    codingIQ: 90,
    code: function () {
        console.log("brain is working hard");
    }
};
function calculateCodingIQ(lostPoints) {
    return 100 - lostPoints;
}
var student1 = {
    studentID: 1234,
    studentName: "string;",
    gender: "female",
    subject: "female",
    Completed: false
};
function getStudentDetails(studentID) {
    return {
        studentID: 1234,
        studentName: "string;",
        gender: "male",
        subject: "female",
        Completed: false
    };
}
var price = 5;
price = "free";
price = true;
var itemPrice;
var setItemPrice = function (price) {
    //코드검증수행-> 타입가드
    if (typeof price === "string") {
        itemPrice = 0;
    }
    else {
        itemPrice = price;
    }
};
setItemPrice(50);
/////////////////////////////////////////////////////////////////////
//function
function sendGreeting(message, userName) {
    console.log(message + "," + userName);
}
//sendGreeting('hello');//매개변수 숫자가 안맞다
sendGreeting("heool"); //선택적매개변수 사용
// 선택적 매개변수들은 필수 매개변수 뒤에 위치해야한다.
//arrow function
function add(num1, num2) {
    return num1 + num2;
}
var add2 = function (num1, num2) { return num1 + num2; };
var Employee = /** @class */ (function () {
    function Employee(_fullName, age, jobTitle, hourlyRate, workingHoursPerWeek) {
        var _this = this;
        this._fullName = _fullName;
        this.age = age;
        this.jobTitle = jobTitle;
        this.hourlyRate = hourlyRate;
        this.workingHoursPerWeek = workingHoursPerWeek;
        this.printEmployeeDetails = function () {
            //메소드들
            console.log(_this._fullName + "\uC758 \uC9C1\uC5C5\uC740 " + _this.jobTitle + "\uC774\uACE0\n              \uC77C\uC8FC\uC77C\uC218\uC785\uC740 " + _this.hourlyRate * _this.workingHoursPerWeek + "\uC774\uB2E4.");
        };
        //Constructor의 매개변수에 AccessModifiers 직접 적용
    }
    Object.defineProperty(Employee.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (value) {
            this._fullName = value;
        },
        enumerable: false,
        configurable: true
    });
    return Employee;
}());
var employee1 = new Employee("aaa;", 28, "dev", 40, 45);
employee1.printEmployeeDetails();
employee1.fullName = "hi";
