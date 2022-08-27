import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('[data-start]'),
  data: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.buttonStart.addEventListener('click', onClickBtnStart);
//disabled для кнопки пока не выбрана дата
refs.buttonStart.disabled = true;
//disabled для инпута когда кнопка активна
refs.input.disabled = false;

const options = {
  isActive: false,
  deltaTime: null,
  intervalId: null,
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      //Уведомление, что дата выбрана не правильно(библиотека notiflix)
      Notify.failure('Please choose a date in the future');

      return;
    }
    //Уведомление, что дата выбрана правильно (библиотека notiflix)
    Notify.success('The period for the timer is defined');
    //disabled для кнопки когда выбрана дата
    refs.buttonStart.disabled = false;
    //disabled для инпута когда активен таймер
    refs.input.disabled = true;
    //текущее время бля старта таймера от которого будет работать таймер
    const startDate = options.defaultDate;

    // конечная дата для таймера
    const endDate = selectedDates[0];

    // создается время для таймера
    options.deltaTime = endDate - startDate;
    const time = convertMs(options.deltaTime);
    onClockFaceTimer(time);
  },
  startTimer() {
    //disabled для инпута когда кнопка активна
    if (!refs.buttonStart.disabled) {
      refs.input.disabled = true;
    }
    // disabled для инпута и кнопки когда кнопка таймер запущен
    if (refs.input.disabled) {
      refs.buttonStart.disabled = true;
    }
    if (options.isActive) {
      return;
    }
    options.isActive = true;

    const endTimer = options.deltaTime + Date.now();
    //интервал для таймера
    options.intervalId = setInterval(() => {
      //обнуление таймера когда время закончилось
      if (
        refs.data.textContent === '00' &&
        refs.hours.textContent === '00' &&
        refs.minutes.textContent === '00' &&
        refs.seconds.textContent === '00'
      ) {
        return clearInterval(options.intervalId);
      }
      const deltaTimer = endTimer - Date.now();
      const timer = convertMs(deltaTimer);
      onClockFaceTimer(timer);
    }, 1000);
  },
};

flatpickr(refs.input, options);

function onClickBtnStart() {
  options.startTimer();
}

function onClockFaceTimer({ days, hours, minutes, seconds }) {
  refs.data.textContent = pad(days);
  refs.hours.textContent = pad(hours);
  refs.minutes.textContent = pad(minutes);
  refs.seconds.textContent = pad(seconds);
}

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
function pad(value) {
  return String(value).padStart(2, 0);
}
