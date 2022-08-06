function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

startBtn.addEventListener('click', startChanging);
stopBtn.addEventListener('click', stopChanging);

let intervalId = null;

function startChanging() {
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.setAttribute('disabled', true);
}

function stopChanging() {
  clearInterval(intervalId);
  startBtn.removeAttribute('disabled');
}
