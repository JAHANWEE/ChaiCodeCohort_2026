const orders = [
    { dish: "Pasta Carbonara", price: 14, spicy: false, qty: 2 },
    { dish: "Dragon Ramen", price: 12, spicy: true, qty: 1 },
    { dish: "Caesar Salad", price: 9, spicy: false, qty: 3 },
    { dish: "Inferno Wings", price: 11, spicy: true, qty: 2 },
    { dish: "Truffle Risotto", price: 18, spicy: false, qty: 1 },
];

//.forEach accepts callback function 
orders.forEach((order, index) => {
    console.log(` $${index + 1} : ${order.qty}x ${order.dish}`)
    /*  //^$1 : 2x Pasta Carbonara
   $2 : 1x Dragon Ramen
   $3 : 3x Caesar Salad
   $4 : 2x Inferno Wings
   $5 : 1x Truffle Risotto
   */
});

// note : forEach return nothing so if you store above code in a variable you will get undefined.

console.log(orders.map(o => `${o.dish}`))// gives ['Pasta Carbonara','Dragon Ramen','Caesar Salad','Inferno Wings','Truffle Risotto']
console.log(orders.map(o => `${o.price}`)) // [ '14', '12', '9', '11', '18' ]
console.log(orders.map(o => `${o.spicy}`)) // [ 'false', 'true', 'false', 'true', 'false' 

const myReceipts = orders.map(o => `${o.dish}: ${o.price * o.qty}`); // returns new array
console.log(myReceipts) // gives ['Pasta Carbonara: 28', 'Dragon Ramen: 12','Caesar Salad: 27','Inferno Wings: 22','Truffle Risotto: 18']

// filter accepts a condition 

const spicyOrders = orders.filter(o => o.spicy);
console.log(spicyOrders) // return array fo objects [ { dish: 'Dragon Ramen', price: 12, spicy: true, qty: 1 },{ dish: 'Inferno Wings', price: 11, spicy: true, qty: 2 }]

//reduce() takes callback (accumulator, value, index, array) + optional initial value
//^ intial value can be anythig from an array , object string etc
const totalRevenue = orders.reduce((sum, order) => {
    return sum + order.qty * order.price;
}, 0); // intial value of sum is 0

console.log(totalRevenue); // gives 107

const grouped = orders.reduce((acc, order) => {
    const category = order.spicy ? "spicy" : "mild";
    acc[category].push(order.dish)
    return acc;
}, { spicy: [], mild: [] })

console.log(grouped)
//! Using {}  -> must use return statement , this is called explicit return
//! if you use ()=>() or () =>{} in same line , JS automatically returns the expression. this is called implicit return  