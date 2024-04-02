//some parameters, some expressions
//let someFunc = (x, y) => {
//  let e = x * y;
//  let result = e - x - y;
//  return result;
//};

//some parameters, one expression
//let multy = (x, y) => x * y;

//one parameter, one expression
let square = x => x * x;

console.log(square(9));

let user = {
  name: "Andrew",
  sayHi: () => {
    console.log(`Hi! I'm ${this.name}`);  // Arrow functions don't bind a "this" keyword
                                          // Now, this binding refers to the parent binding,
                                          // in our case there is no parent function,
                                          // so this would refer to the global this keyword.
    console.log(arguments);               // In case of arrow function we actually get the global arguments variable, 
                                          // which is the arguments variable for the wrapper function
  },
  //ES6 provides us a new way to make methods on objects you provide the method name like bellow
  sayHiAlt () {                           // The sayHiAlt syntax is a syntax
                                          // that you can use to solve "this"-problem
                                          // when you create functions on object literals.
    console.log(`Hi! I'm ${this.name}`);
    console.log(arguments);               // Regular functions, like sayHiAlt, are going to have an arguments array 
                                          // that's accessible inside of the function
  }
};

user.sayHi(1, 2, 3);
user.sayHiAlt(1, 2, 3);
