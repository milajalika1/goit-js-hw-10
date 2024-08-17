import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
// console.dir(form);
form.addEventListener('submit', onFormSubmit);

function onFormSubmit() {
  event.preventDefault();
  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  }

  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topCenter',
        timeout: 2000,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topCenter',
        timeout: 2000,
      });
    });
}
