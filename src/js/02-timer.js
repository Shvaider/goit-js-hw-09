import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('[data-start]');
btnStart.setAttribute('disabled', 'disabled');

// const deadLine = new Date(2022, 7, 31);
const textInput = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    delta = selectedDates[0] - options.defaultDate;
    if (delta < 0) {
      btnStart.setAttribute('disabled', 'disabled');
      Notify.failure('Please, choose a date in the future');
    } else if (delta > 0) {
      return btnStart.removeAttribute('disabled', 'disabled');
    }
  },
};
flatpickr(textInput, options);
btnStart.addEventListener('click', onClick);
let timerId = null;
function onClick() {
  timerId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(delta);
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  }, options.minuteIncrement);
}
// const today = new Date();
// const delta = deadLine - today;
// console.log(delta);

// const seconds = Math.floor(delta / 1000) % 60
// console.log("seconds", seconds);
// const minutes = Math.floor(delta / 1000 / 60) % 60
// console.log("minutes", minutes);
// const hours = Math.floor(delta / 1000 / 60 / 60) % 24
// console.log("hours", hours);
// const days = Math.floor(delta / 1000 / 60 / 60 / 24);
// console.log("days", days);

//  setInterval(timer, 1000);
// --
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
