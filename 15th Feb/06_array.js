//Ways to initialize an Array
const carriage = ["Veer", "ayush", "lol"];
const emptyCarriage = [];

const threEmptySeats = Array(3);
console.log(threEmptySeats.length); //gives 3 
console.log(threEmptySeats); // gives [ <3 empty items> ]

const passenger = Array("veer", "ayush", "mary"); // [ 'veer', 'ayush', 'mary' ]
console.log(passenger);

const singlePassenger = Array.of(3);
console.log(singlePassenger); // gives [ 3 ] 
console.log(singlePassenger.length)

/* //*Array.of() method of array creates a new array from the arguments we pass , and treats every argument as an element. */
console.log(Array.of("foo", 2, "bar", true));
// Expected output: Array ["foo", 2, "bar", true]

console.log(Array.of()); // give [];


const trainCode = Array.from("DUST");
console.log(trainCode)  // [ 'D', 'U', 'S', 'T' ] array fo characters

const tempTrain = ["D" , "O", "W", "N" , "S"];
tempTrain.length=3; //?  this does truncation fo array , not preferred
console.log(tempTrain.length); // gives 3 
tempTrain.length=5;
console.log(tempTrain) //[ 'D', 'O', 'W', <2 empty items> ] bcs due to line no 28 our data is lost , even if we update teh length its of no use.

//^ Array.from creates Array from strings, map , nodelist etc
//push :adds value to end , pop : remove value from end ,unshift : adds to start , shift: removes from the beginning 
//& Mutation means modifying the original array instead of creating a new one.

console.log(Array.isArray(tempTrain)) //~ give boolean value : true

//key points 
//1. []  is preffered as it takes place in memory in accordance to elements added
//2. Array(4)  defines 4 slots in memory 
//3 . Array are 0 based , and if you try to access 5th element on a 4 length arary will give ://?"undefined" 
//4. //Non mutating array methods(makes a new array): concat , slice , splice , flat , map , reduce , flatMap 
//5. // Mutating array methods(changes the original array):push , pop , shift , unshift , splice
//6. Searching Methods:index , indexOf , find , findIndex , includes , lastIndexOf()
//7. To check array :Array.isArrays();





