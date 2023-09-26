var arr = [1, 2, 3, 4, 5, 6];

arr.forEach((item, index, arr) => {
    item * 10;
});
console.log(arr);

let newArr = arr.filter((item, index, arr) => {
    return item > 3;
});
console.log(newArr); // [ 4, 5, 6 ]
console.log(arr); // [ 1, 2, 3, 4, 5, 6 ]

let newArr = arr.map((item, index, arr) => item * 10);
console.log(newArr); //[ 10, 20, 30, 40, 50, 60 ]
console.log(arr); // [ 1, 2, 3, 4, 5, 6 ]

// 初始值
const initialValue = 0;
// 三参数：
// 上一次的结果（如果指定了initialValue，则为initialValue，否则为arr[00）；
// 当前元素的值(如果指定了initialValue,则为arr[0],否则为arr[1])；
// 当前元素的索引(在第一次调用时，如果指定了 initialValue 则为 0，否则为 1。)。
const sum = arr.reduce((accumulator, currentValue, currIndex) => accumulator + currentValue, initialValue);
console.log(sum); // 21
console.log(arr); // [ 1, 2, 3, 4, 5, 6 ]

let a = arr.find((item) => item > 2);
console.log(a); // 3
console.log(arr); // [ 1, 2, 3, 4, 5, 6 ]

let a = arr.findIndex((item) => item > 2);
console.log(a); // 2
console.log(arr); // [ 1, 2, 3, 4, 5, 6 ]

let a = arr.some((item) => item > 2);
console.log(a); // true
console.log(arr); // [ 1, 2, 3, 4, 5, 6 ]

let a = arr.every((item, index, arr) => item > 2);
console.log(a); // false
console.log(arr); // [ 1, 2, 3, 4, 5, 6 ]

let a1 = arr.sort((a, b) => a - b);
let a2 = arr.sort((a, b) => 1);
let a3 = arr.sort((a, b) => b - a);
let a4 = arr.sort((a, b) => -1);
let a5 = arr.sort((a, b) => 0);

console.log(a1); //[1, 2, 3, 4, 5, 6]
console.log(a2); //[1, 2, 3, 4, 5, 6]
console.log(a3); // [ 6, 5, 4, 3, 2, 1 ]
console.log(a4); // [ 6, 5, 4, 3, 2, 1 ]
console.log(a5); //[1, 2, 3, 4, 5, 6]
console.log(arr);
