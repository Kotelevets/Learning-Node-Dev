/*
// Part 1 - Simple example for promises functionality
// Calling the promise method then
let somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    //resolve('Hey. It worked!');
    reject('Unable to fulfill promise');
  }, 2500);
});

somePromise.then((message) => {
  console.log('Success: ', message);
}, (errorMessage) => {
  console.log('Error: ', errorMessage);
});
*/

// Part 2 - Advanced promises - providing input and return promises
let asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Arguments must be numbers.');
      }
    }, 1500);
  });
};
/*
asyncAdd(5, 7).then((res) => {
  console.log('Result: ', res);  
}, (errorMessage) => {
  console.log(errorMessage);
}
);
*/

// Part 3 - Promise chaining
// having multiple promises run in a sequence
asyncAdd(5, '7').then((res) => {
  console.log('First chain element result(12): ', res);
  return asyncAdd(res, 33);  // call another promise
}).then((res) => {           // add another then-method
  console.log('Second chain element result(45): ', res);
}).catch((errorMessage) => { // use catch method like error handler
  console.log(errorMessage); // if any of our promise calls fail
  // using catch, we can specify an error handler 
  // that will fire for all of our previous failures.
});

