# ```this```와 화살표 함수('this' and arrow functinos)

JS에서, ```this``` 는 함수가 호출될 때 정해지는 변수이다. 매우 효율적이고 유용한 기능이지만 항상 함수가 실행되는 문단에 대해 알아야 한다는 단점이 있다.
특히 함수를 반환하거나 인자로 넘길 때에 매우 혼란스러울 수 있다.
```Javascript
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return function() {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```
```createCardPicker```은 자기 자신을 반환해 주는 함수이다. 이 예제를 작동시키면 에러가 발생한다.
```cardPicker()```의 자체적인 호출 때문에 에러가 발생한다. 이 문제는 나중에 사용할 함수를 반환하기 전에 바인딩을 알맞게 하는 것으로 해결할 수 있다. 이 방법대로라면 나중에 사용하는 방법에 상관없이 원본 
```deck``` 객체를 계속해서 볼 수 있다. 이를 위해서 함수표현식을 JS ES6의 화살표 함수로 바꾼다. 화살표 함수는 함수가 호출 된 곳이 아니라 함수가 생성된 쪽의 this를 캡쳐한다.
```Javascript
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        // NOTE: 아랫줄은 화살표 함수로써, 'this'를 이곳에서 캡처할 수 있도록 합니다
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```
## ```this``` 매개변수 (this parameter)

```this.suits[pickedSuit]``` 의 타입은 여전히 ```any``` 이다. ```this```가 객체 리터럴 내부의 함수에서 왔기 때문이다.
이를 고치기 위해서는 명시적으로 ```this``` 매개변수를 사용할 수 있다. ```this``` 매개변수는 함수의 매개변수 목록에서 가장 먼저 나오는 가짜 매개변수이다.
```Javascript
function f(this: void) {
    // 독립형 함수에서 `this`를 사용할 수 없는 것을 확인함
}
```
명확하고 재사용하기 쉽게 ```Card```와 ```Deck``` 두 가지 인터페이스 타입들을 예시에 추가해 보자.
```Javascript
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: 아래 함수는 이제 callee가 반드시 Deck 타입이어야 함을 명시적으로 지정합니다.
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```
위 코드에서 TS는 ```createCardPicker```가 ```Deck``` 객체에서 호출된다는 것을 알게된다. 이것은 ```this```가 ```any``` 타입이 아니라 ```Deck``` 타입이고 
오류가 일어나지 않는다는 것을 의미한다.

## 콜백에서 ```this```매개변수(this parameters in callback)

나중에 호출할 콜백 함수를 라이브러리에 전달할 때 ```this```때문에 오류가 발생할 수 있다. 라이브러리는 콜백을 일반 함수처럼 호출하므로 ```this```는 ```undefiend```가 된다.
일부 작업에서는 ```this``` 매개변수를 콜백 오류를 막는데 사용할 수 있다. 먼저 라이브러리 작성자는 콜백 타입을 ```this```로 표시해줘야 한다.
```Javascript
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}
```
```this:void```는 ```addClickListener```가 onclick은 this 타입을 요구하지 않는 함수가 될 것으로 예상하는 것을 의미한다.
두번 째로 호출코드를 ```this```로 표시해보자.
```Javascript
class Handler {
    info: string;
    onClickBad(this: Handler, e: Event) {
        // 여기 보면 `this`가 여기서 쓰인다. 이 콜백을 쓰면 런타임에서 충돌이 난다.
        this.info = e.message;
    }
}
let h = new Handler();
uiElement.addClickListener(h.onClickBad); // 오류!
```
```this```로 표시를 한 상태에서 ```onClickBad```가 반드시 ```Handler```의 인스턴스로써 호출되어야 함을 명시해 줘야 한다.
그러면 TS는 ```addClickListener```가 ```this:void``` 를 갖는 함수를 필요로 한다는 것을 감지한다. 오류를 고치기 위해 ```this```의 타입을 바꿔준다.
```Javascript
class Handler {
    info: string;
    onClickGood(this: void, e: Event) {
        // void 타입이기 때문에 this는 이곳에서 쓸 수 없다
        console.log('clicked!');
    }
}
let h = new Handler();
uiElement.addClickListener(h.onClickGood);
```
```onClickGood```이 ```this```타입을 ```void```로 지정하고 있기 때문에 ```addClickListener```로 넘겨지는데 적합하다. 물론 ```this.info```를 쓸 수 없는 것을 의미한다.
만약 ```this.info```까지 원한다면 화살표 함수를 사용해야 한다.
```Javascript
class Handler {
    info: string;
    onClickGood = (e: Event) => { this.info = e.message }
}
```
위와 같은 작업은 화살표 함수가 외부의 ```this```를 사용하기 때문에 가능한 것이기 때문에 ```this:void```일 것으로 기대하는 거면 전달에 문제는 없다.
```Handler``` 객체 마다 하나의 화살표 함수가 작성되어야 하는게 단점이다.

## 오버로드(Overloads)
JS는 본질적으로 매우 동적인 언어이다. 하나의 JS 함수가 전달된 인자의 형태에 따라 다른 타입의 객체들을 반환하는 것은 흔한 일이다.
```Javascript
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x): any {
    // 인자가 배열 또는 객체인지 확인
    // 만약 그렇다면, deck이 주어지고 card를 선택한다.
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // 그렇지 않다면 그냥 card를 선택한다.
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```
위에서 보면 사용자가 전달하는 것에 따라 두가지 다른 결과를 반환하는 함수가 있다.
deck을 의미하는 객체값을 전달하면 함수가 임의로 카드를 선택하고 카드를 선택하면 선택한 카드가 무엇인지 대답해준다.
타입 시스템에서는 이것을 오버로드 목록으로 동일한 함수에 다중 함수 타입을 제공함으로써 구현해준다.
**오버로드 목록**은 컴파일러가 함수 호출들을 해결할 때 사용하는 것이다.
오버로드 목록으로 ```pickCard```가 동작을 승인하고 반환하는 것을 구현해보자.
```Javascript
let suits = ["hearts", "spades", "clubs", "diamonds"];

// 아래 두줄이 동일한 함수에 다중 함수 타입을 제공해주는 역할을 한다.
function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // 인자가 배열 또는 객체인지 확인
    // 만약 그렇다면, deck이 주어지고 card를 선택한다.
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // 그렇지 않다면 그냥 card를 선택한다.
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```

































