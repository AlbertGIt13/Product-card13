import Modal from './Modal.js';
import Form from './Form.js';

// === Форма подписки ===
const subscribeForm = new Form('subscribe-form');
const emailInput = document.querySelector('.footer__input');

subscribeForm.form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!emailInput.value.trim() || !emailInput.validity.valid) {
    emailInput.reportValidity();
    return;
  }

  console.log(subscribeForm.getValues());
});

// === Модальное окно регистрации ===
let user = null;

const registrationModal = new Modal('modal');
const registrationForm = new Form('registration-form');

const registrationButton = document.querySelector('#registration-button');
const overlay = document.querySelector('.overlay');
const registrationMessage = document.querySelector('#registration-message');
const birthDateInput = document.querySelector('#birth-date');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');

birthDateInput.max = new Date().toISOString().split('T')[0];

// Открытие / закрытие
registrationButton.addEventListener('click', () => {
  registrationModal.open();
});

overlay.addEventListener('click', () => {
  registrationModal.close();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && registrationModal.isOpen()) {
    registrationModal.close();
  }
});

// Отправка формы регистрации
registrationForm.form.addEventListener('submit', (event) => {
  event.preventDefault();
  registrationMessage.textContent = '';

  confirmPasswordInput.setCustomValidity('');

  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.setCustomValidity('Пароли не совпадают.');
  }

  // Метод II — проверка валидности
  if (!registrationForm.isValid()) {
    registrationForm.form.reportValidity();
    registrationMessage.textContent = 'Регистрация отклонена. Проверьте данные формы.';
    return;
  }

  // Метод I — получение всех значений формы
  user = registrationForm.getValues();
  user.createdOn = new Date();

  console.log(user);

  // Метод III — сброс значений формы
  registrationForm.reset();
  confirmPasswordInput.setCustomValidity('');
  registrationModal.close();
});
