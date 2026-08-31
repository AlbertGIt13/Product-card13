import { products } from './products.js';

const productsList = document.getElementById('products-list');
const productCardTemplate = document.getElementById('product-card-template');

// Цена
function formatPrice(price) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
}

products.forEach(product => {

  const cardClone = productCardTemplate.content.cloneNode(true);
  cardClone.querySelector('img').src = `img/${product.image}.jpg`;
  cardClone.querySelector('img').alt = product.productCardNameProduct;
  cardClone.querySelector('.product-card__category').textContent = product.productCardCategory;
  cardClone.querySelector('.product-card__name-product').textContent = product.productCardNameProduct;
  cardClone.querySelector('.product-card__description').textContent = product.productCardDescription;
  cardClone.querySelector('.product-card__price-value').textContent = formatPrice(product.productCardPrice);

  const compoundList = cardClone.querySelector('.compound-text');
  compoundList.innerHTML = '';
  product.compound.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    compoundList.appendChild(li);
  });

  productsList.appendChild(cardClone);
});

// Метод reduce
const descriptionsByProductName = products.reduce((acc, item) => {
  const newObj = { [item.productCardNameProduct]: item.productCardDescription };
  acc.push(newObj);
  return acc;
}, []);

console.log(descriptionsByProductName);

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