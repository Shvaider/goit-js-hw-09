import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const btnStart = document.querySelector('button[data-start]');
btnStart.setAttribute('disabled', 'disabled');

// const deadLine = new Date(2022, 7, 31);
const textInput = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let choseDate = null

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choseDate = selectedDates[0].getTime();
    const deltaDate = choseDate - Date.now();

    if (deltaDate <= 0) {
      btnStart.disabled = true;
      Notiflix.Notify.failure('Please, choose a date in the future');
    } else {
      return btnStart.disabled = false;
    }
  },
};

flatpickr(textInput, options);

btnStart.addEventListener('click', onClick);



function onClick() {
  let timerId = null;
  timerId = setInterval(() => {
    btnStart.disabled = false;
    const deltaDate = choseDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(deltaDate);
    daysEl.textContent = days < 10 ? addLeadingZero(days) : days;
    hoursEl.textContent = hours < 10 ? addLeadingZero(hours) : hours;
    minutesEl.textContent = minutes < 10 ? addLeadingZero(minutes) : minutes;
    secondsEl.textContent = seconds < 10 ? addLeadingZero(seconds) : seconds;
    btnStart.disabled = true;
    if (deltaDate <= 0) {
      clearInterval(timerId)
    }
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
function addLeadingZero(value) {
  const stringValue = String(value)
  return stringValue.padStart(2, '0')
}
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
