import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  onForm: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amout: document.querySelector('[name="amount"]'),
  submitBtn: document.querySelector('.btn-promises'),
  btnResetStop: document.querySelector('.btn-stop-reset'),
};
refs.onForm.addEventListener('input', getInput);
refs.onForm.addEventListener('submit', startCreatePromise);
refs.btnResetStop.addEventListener('click', stopResetForm);

let onForm = {};
let numberPosition = 0;
let intervalId = null;
let onDeley = 0;

refs.btnResetStop.disabled = true;

function startCreatePromise(e) {
  e.preventDefault();
  console.log(onForm);
  refs.submitBtn.disabled = true;
  refs.btnResetStop.disabled = false;

  onSetInterval();
}
function stopResetForm() {
  clearInterval(intervalId);
  refs.submitBtn.disabled = false;
  refs.btnResetStop.disabled = true;
  numberPosition = 0;
  onDeley = Number(onForm.step);
  console.log(onForm);
}

function onSetInterval() {
  setTimeout(() => {
    if (!refs.submitBtn.disabled) {
      refs.btnResetStop.disabled = true;
    }
    intervalId = setInterval(() => {
      if (numberPosition !== Number(onForm.amount)) {
        numberPosition += 1;

        onDeley += Number(onForm.step);
        return createPromise(numberPosition, onDeley)
          .then(({ position, delay }) => {
            Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          })
          .catch(({ position, delay }) => {
            Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
          });
      }

      clearInterval(intervalId);
      refs.submitBtn.disabled = false;
      numberPosition = 0;
      onDeley = Number(onForm.step);
    }, onForm.step);
  }, onForm.delay);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

function getInput(e) {
  onForm[e.target.name] = e.target.value;
}
