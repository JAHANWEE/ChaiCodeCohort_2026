// Polyfill for Array.prototype.includes()
// include actually hcecks if a particular ele is present in the array or not 

// Polyfill for Array.prototype.includes()
Array.prototype.includes = function (searchElement) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === searchElement) {
            return true;
        }
    }

    return false;
};

// console.log([1, 2, 3].includes(2)); // true
// console.log([1, 2, 3].includes(4)); // false

//map
Array.prototype.MeraMap = function (fn) {
    const res = [];
    for (let i = 0; i < this.length; i++) {
        res.push(fn(this[i]));
        console.log(res);
    }
    return res;
}

// console.log([1, 2, 3].MeraMap(e => e + 1)); // [ 2 , 3 , 4]

//forEach
Array.prototype.ForNeech = function (fn) {
    for (let i = 0; i < this.length; i++) {
        fn(this[i], i, this);
    }
}

const nums = [3, 4, 5, 10, 12, 20];
// nums.ForNeech(t => {
//     console.log(t * 2);
// })

// console.log("------------------------")
//filter
Array.prototype.MyFilter = function (fn) {
    const res = [];
    for (let i = 0; i < this.length; i++) {
        if (fn(this[i])) {
            res.push(this[i]);
        }
    }
    return res;
}

// console.log(nums.MyFilter((t) => t % 2 == 0))

//reduce
Array.prototype.MyReduce = function (fn, ini) {
    let init = 0;
    let statIndex = 0;

    if (ini !== 0 || ini !== undefined) {
        init = ini;
        statIndex = 0;
    } else {
        init = this[0];
        statIndex = 1;
    }

    for (let i = 0; i < this.length; i++) {
        init = init + fn(this[i], i, this)
    }
    return init;
};

// console.log(nums.MyReduce((acc, t) => {
//     acc += t;
//     return acc;
// }, 0));

//concat
Array.prototype.MyConcat = function (...arr) {
    let res = [];
    for (let i = 0; i < this.length; i++) {
        res.push(this[i]);
    }
    for (let item of arr) {

        if (Array.isArray(item)) {
            for (let i = 0; i < arr.length; i++) {
                res.push(arr[i]);
            }
        } else {
            res.push(item);
        }
    }
    return res;
}

let arr1 = [3, 4, 5];
let arr2 = null
let arr3 = undefined
// console.log(arr1.MyConcat(arr2 , arr3));

//flat
// console.log([1, [2, 3]].flat());
Array.prototype.Sapat = function () {
    // let res = [];
    // for (let i = 0; i < this.length; i++) {
    //     res.push(this[i]);
    // }
    //     if (Array.isArray(item) && depth>0) {
    //         for (let i = 0; i < arr.length; i++) {
    //             res.push(arr[i]);
    //         }
    //         return res;
    // }

    let res =[];
    for (let item of this) {
        if (Array.isArray(item)) {
                res.push(...item.Sapat());
        } else {
            res.push(item);
        }
    }
    return res;
}

console.log([1, [2, [3], [5]]].Sapat());

//Array.prototype.some()
Array.prototype.MySome = function (fn){
    let check= false;
    for(let i=0;i<this.length;i++){
        if(fn(this[i])) {
            check=true;
            break;
        }
    }
    return check;
}
const numsss = [1, 3, 5, 9];
const hasEven = numsss.MySome(n => n % 2 === 0);

console.log(hasEven); 


//APPLY , CALL , BIND

