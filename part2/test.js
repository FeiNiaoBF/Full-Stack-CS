var arr = [
  { name: 'John', age: 25 },
  { name: 'Andrew', age: 27 },
  { name: 'Peter', age: 22 },
  { name: 'Michael', age: 30 },
];

var aveg = arr.reduce((sum, x) => sum + x.age, 0) / arr.length;

console.log(aveg);
