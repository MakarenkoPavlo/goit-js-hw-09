import Notiflix from 'notiflix';

 function createPromise(position, delay) {
      return new Promise((resolve, reject) => {
        const shouldResolve = Math.random() > 0.3;
        setTimeout(() => {
          if (shouldResolve) {
            resolve({ position, delay });
          } else {
            reject({ position, delay });
          }
        }, delay);
      });
    }

    const form = document.querySelector('.form');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const delayInput = document.querySelector('input[name="delay"]');
      const stepInput = document.querySelector('input[name="step"]');
      const amountInput = document.querySelector('input[name="amount"]');

      const delay = parseInt(delayInput.value);
      const step = parseInt(stepInput.value);
      const amount = parseInt(amountInput.value);

      Notiflix.Notify.init({ position: 'bottomRight' });

      for (let i = 0; i < amount; i++) {
        const currentDelay = delay + i * step;
        createPromise(i + 1, currentDelay)
          .then(({ position, delay }) => {
            Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          })
          .catch(({ position, delay }) => {
            Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
          });
      }
    });