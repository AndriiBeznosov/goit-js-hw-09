//? Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> на случайное значение используя инлайн стиль. При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.

const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

refs.btnStart.addEventListener('click', startRandomColor);
refs.btnStop.addEventListener('click', stopRandomColor);

let intervalId = null;

function startRandomColor(color) {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor(color);
  }, 1000);
}

function stopRandomColor() {
  if (!refs.btnStart.disabled && !refs.btnStop.disabled) {
    return;
  }
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
