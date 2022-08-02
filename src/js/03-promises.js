import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const form = document.querySelector('.form');

const firstDelayMs = document.querySelector('[name="delay"]');
const delayStepMs = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

form.addEventListener('submit', submitCreatePromises);

function submitCreatePromises(e) {
  e.preventDefault();

  let delay = firstDelayMs.valueAsNumber;
  const delayStepVal = delayStepMs.valueAsNumber;
  const amountVal = amount.valueAsNumber;

  for (let i = 1; i <= amountVal; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
      });
    delay += delayStepVal;
  }
}

// const promise = new Promise((resole, reject) => {
//   const canFulfill = Math.randomm() > 0.5;
//   setTimeout(() =>{
//     if (canFulfill) {
//       resole('промис выполн успешно(fulfilled)')
//     }
//     reject('error');
//   }, 2000)
// });

// promise.then(onFulfilled, onRejected);
// console.
// promise.then(result => {
//   console.log(result)
// },
// error => {
//   console.log(error)
// })
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
