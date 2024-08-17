import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const timeDate = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const daysTime = document.querySelector('span[data-days]');
const hoursTime = document.querySelector('span[data-hours]');
const minutesTime = document.querySelector('span[data-minutes]');
const secondsTime = document.querySelector('span[data-seconds]');

let userSelectedDate;
let timer = null;
buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (new Date() >= selectedDates[0]) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topCenter',
        timeout: 2000,
      });
      buttonStart.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
        buttonStart.disabled = false;
        buttonStart.style.backgroundColor = '#4e75ff';
        buttonStart.style.color = '#fff';
      iziToast.success({
        title: 'OK',
        message: 'You can start!',
        position: 'topCenter',
        timeout: 1000,
      });
    }
  },
};

flatpickr(timeDate, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => String(value).padStart(2, 0);

buttonStart.addEventListener('click', onClickButton);

function onClickButton() {
  timeDate.disabled = true;
    buttonStart.disabled = true;
    buttonStart.style.backgroundColor = '#cfcfcf';
    buttonStart.style.color = '#989898';

  timer = setInterval(() => {
    const currentDate = new Date();
    const deltaTime = userSelectedDate - currentDate;

    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    daysTime.textContent = addLeadingZero(days);
    hoursTime.textContent = addLeadingZero(hours);
    minutesTime.textContent = addLeadingZero(minutes);
    secondsTime.textContent = addLeadingZero(seconds);

    if (deltaTime <= 0) {
      clearInterval(timer);
      timeDate.disabled = false;

      daysTime.textContent = '00';
      hoursTime.textContent = '00';
      minutesTime.textContent = '00';
      secondsTime.textContent = '00';

      return;
    }
  }, 1000);
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
