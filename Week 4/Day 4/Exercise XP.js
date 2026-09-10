//1 
function compareToTen(num) {
  return new Promise((resolve, reject) => {
    if (num <= 10) {
      resolve(`${num} is less than or equal to 10`);
    } else {
      reject(`${num} is greater than 10`);
    }
  });
}

compareToTen(15)
  .then(result => console.log(result))
  .catch(error => console.log(error)); 

compareToTen(8)
  .then(result => console.log(result))
  .catch(error => console.log(error))
  //2
  const delayedPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("success");
  }, 4000);
});

delayedPromise
  .then(result => console.log(result)) 
  .catch(error => console.log(error)); 

  //3
  // 1. Create a promise that resolves itself with a value of 3
const resolvedPromise = Promise.resolve(3);

resolvedPromise.then(value => console.log(value)); 

// 2. Create a promise that rejects itself with the string "Boo!"
const rejectedPromise = Promise.reject("Boo!");

rejectedPromise.catch(error => console.log(error)); 