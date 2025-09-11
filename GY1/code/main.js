// 1. feladat
const firstNum = 10;
const secondNum = 6;
const result = firstNum + secondNum;
console.log(firstNum === secondNum);

// 2. feladat
// Elágazás
if (firstNum > secondNum) {
  console.log("Nagyobb!");
} else if (firstNum === 20) {
  console.log("Pontosan 20");
} else {
  console.log("Nem jött be");
}

// For-ciklus
for (let i = 0; i < 5; i++) {
  console.log("Szám: ", i);
}

// While-ciklus
let i = 0;
while (i < 4) {
  // valami
  i++;
}

// 3. feladat
const numArray = [1, 2, 3, 4, 5];
console.log(numArray);

const mixedArray = [1, 2, true, "kiskutya", false, 3.14];
const matrix = [
  [1, 2, 3],
  [3, 4, 5],
  [6, 7, 8],
];
console.log(matrix.length);

// Array osztály statikus metódusa, eldönti a paraméterül kapott értékről, hogy tömb-e
Array.isArray(mixedArray);

numArray.push(10); // mutable

// spread operator
const newArray = [-4, ...numArray, 12];
console.log(newArray);
console.log(numArray);

// for in - for of
for (let elem of newArray) {
  console.log("elem:", elem);
}

for (let i in newArray) {
  console.log("indices:", i);
}

// 4. feladat
addTwoNums(5, 8); // meg tudom hívni a function szignatúrvál létrehozott függvényt a definiálás helye előtt

function addTwoNums(firstNum, secondNum) {
  return firstNum + secondNum;
}

const addTwoNumsArrowBlock = (firstNum, secondNum) => {
  return firstNum + secondNum;
};

const addTwoNumsArrowExpression = (firstNum, secondNum) => firstNum + secondNum;

// lambda: (a, b) => a + b;

console.log(addTwoNums(5, 7));
console.log(addTwoNumsArrowBlock(5, 7));
console.log(addTwoNumsArrowExpression(5, 7));

// különbség a két szintaxis között: "this"
const person = {
  name: "Barna",
  age: 23,
  greetTraditional: function () {
    console.log("Hello, ", this.name);
  },
  greetArray: () => {
    console.log("Hello, ", this.name);
  },
};

person.greetTraditional();
person.greetArray();

// a primitív típusokat érték szerint vesszük át
a = 5;
function inc(num) {
  num++;
  console.log(num);
}

console.log(a);
inc(a);

// tömbfüggvények
// forEach
const temperatures = [0, -1.5, 20, 30, -12.5, 1];
temperatures.forEach((e) => console.log(e));

// tömb hossza
console.log("Length: ", temperatures.length);

// filter
const filtered = temperatures.filter((e) => e > 0);
console.log(filtered);

// some - every
const has = temperatures.some((e) => e > 40);
const all = temperatures.every((e) => e > 0);

// map
const mapped = temperatures.map((e) => e + " C");
console.log(mapped);
