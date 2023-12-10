// Array

const arr = [1, 2, 3, 4, -5];

//console.log(arr[0]);
//console.log(arr["2"] === arr["02"] === arr[2]);
// console.log(arr["2"]);
// console.log(arr["02"]);
// //console.log(arr[2]);
// console.log(arr.length);

// arr.push(6);
// // console.log(arr);
// arr.push(arr.length);
// // console.log(arr);
// arr.push("banana", "apple", "peach");
// arr.forEach((value) => {
//     console.log({ value });
// });
// const t2 = arr.concat(5)
// // console.log(t2);
// const t = [1, 2, 3]

// const m1 = t.map(value => value * 2)
// console.log(m1);
// const m2 = t.map(value => '<li>' + value + '</li>')
// console.log(m2);

// const t = [1, 2, 3, 4, 5]
// const [first = 2, second, ...[c, d]] = t

// console.log(first, second);
// console.log(c);
// console.log(d);

/// Object

// const obj = {
//     name: "John",
//     age: 30,
//     education: 'Master',
//     isMarried: false,
// }
// const object2 = {
//     name: 'Full Stack web application development',
//     level: 'intermediate studies',
//     size: 5,
// }

// const object3 = {
//     name: {
//         first: 'Dan',
//         last: 'Abramov',
//     },
//     grades: [2, 3, 5, 3],
//     department: 'Stanford University',
// }

// console.log(obj.name);
// const fieldName = 'age'
// console.log(obj[fieldName]);
// obj.address = 'Helsinki'
// obj['secret number'] = 12341
// console.log(obj);

/// Functions

const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
}

const result = sum(1, 5)
console.log(result);
const square = p => p * p

// fib
const fib = (n) => {
    if (n < 2) {
        return n
    }
    return fib(n - 1) + fib(n - 2)
}
