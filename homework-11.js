// Валидация формы
const subscribeForm = document.querySelector('.footer__subscribe-form');
const emailInput = document.querySelector('.footer__input');

subscribeForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!emailInput.value.trim() || !emailInput.validity.valid) {
    emailInput.reportValidity();
    return;
  }

  console.log({
    email: emailInput.value.trim()
  });
});

// Модальное окно Регистрация
let user = null;

const registrationButton = document.querySelector('#registration-button');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const modalCloseButton = document.querySelector('#modal-close-button');
const registrationForm = document.querySelector('#registration-form');
const registrationMessage = document.querySelector('#registration-message');
const birthDateInput = document.querySelector('#birth-date');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');

birthDateInput.max = new Date().toISOString().split('T')[0];

function openModal() {
  modal.classList.add('modal-showed');
  overlay.classList.add('overlay-showed');
  document.body.classList.add('modal-open');
}

function closeModal() {
  modal.classList.remove('modal-showed');
  overlay.classList.remove('overlay-showed');
  document.body.classList.remove('modal-open');
  registrationMessage.textContent = '';
}

registrationButton.addEventListener('click', openModal);
modalCloseButton.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('modal-showed')) {
    closeModal();
  }
});

registrationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  registrationMessage.textContent = '';

  confirmPasswordInput.setCustomValidity('');

  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.setCustomValidity('Пароли не совпадают.');
  }

  if (!registrationForm.checkValidity()) {
    registrationForm.reportValidity();
    registrationMessage.textContent = 'Регистрация отклонена. Проверьте данные формы.';
    return;
  }

  const formData = new FormData(registrationForm);

  user = Object.fromEntries(formData.entries());
  user.createdOn = new Date();

  console.log(user);

  registrationForm.reset();
  confirmPasswordInput.setCustomValidity('');
  closeModal();
});