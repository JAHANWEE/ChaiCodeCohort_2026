console.log("hello");
console.warn("this is a trap");
console.table([
    {
        name: "lol",
        age: 23,
        "isSingle": false
    },
    {
        name: "lol",
        age: 23,
        "isSingle": true
    }
])
console.log("-------------------------");
console.group();
console.log(" - group 1");
console.log(" - group 1")
console.log(" - group 1")
console.log(" - group 1")
console.groupEnd(); //gives
/*
-------------------------
   - group 1
   - group 1
   - group 1
   - group 1
*/
console.time();
console.log("hello");
console.warn("this is a trap"); // default: 0.006ms
console.timeEnd();

console.count("hello");
console.count("hello");
console.count("hello");
// hello: 1
// hello: 2
// hello: 3