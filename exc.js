// const t = [1, 2, 3, 4, 5];

// const [first, second, ...rest] = t;

// console.log(first); // 1
// console.log(second); // 2
// console.log(rest); // [3, 4, 5]

// const object1 = {
//   name: "Arto Hellas",
//   age: 35,
//   education: "PhD",
// };

// const object2 = {
//   name: "Full Stack web application development",
//   level: "intermediate studies",
//   size: 5,
// };

// const object3 = {
//   name: {
//     first: "Dan",
//     last: "Abramov",
//   },
//   grades: [2, 3, 5, 3],
//   department: "Stanford University",
// };

// console.log(object1);
// // console.log(object2);
// // console.log(object3);

// object1.address = "Helsinki";
// object1["secret number"] = 12341;

// console.log(object1);

const sum = (p1, p2) => {
  console.log(p1);
  console.log(p2);
  return p1 + p2;
};

const result = sum(1, 5);
console.log(result);

const t = [1, 2, 3];
const tSquared = t.map((p) => p * p);
console.log(tSquared);
