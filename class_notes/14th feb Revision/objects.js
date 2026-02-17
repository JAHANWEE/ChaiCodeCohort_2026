// let strr ="stringsss";
// console.log(strr[99]);
// console.log(typeof strr);

const secretcode="OMEGA-6";
console.log(secretcode[99]); 
console.log(1+2+"34"+2+3); //33423
console.log(1+22+3+"23"); //2623

const obj = {};
obj["1"] = "string one";

console.log(obj); // { "1": "string one" }
console.log({} + []);
console.log(typeof []);

console.log(typeof Array);
console.log(typeof Array.isArray)

const a = [1, 2];
a.push(3);
console.log(a); // [1, 2, 3]
// {a:1, b:2}
console.log(Object.assign({}, {a:1}, {b:2}));
console.log("--------------------------")
// const o = {a:1};
// Object.seal(o);
// delete o.a;
// console.log(o.a); // 1
const o = {a:1};
Object.freeze(o);
delete o.a;
console.log(o.a);