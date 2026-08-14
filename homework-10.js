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
  acc[item.productCardNameProduct] = item.productCardDescription;
  return acc;
}, {});

console.log(descriptionsByProductName);