const productCard = document.querySelector(`.product-card`);
const changeCardColorButton = document.querySelector(`#change-card-color-button`);
const productCards = document.querySelectorAll('.product-card');
const changeAllCardsColorButton = document.querySelector('#change-all-cards-color-button');

console.log('Product Card', productCard);
console.log('Change Card Color Button', changeCardColorButton);
console.log('Change All Cards Color Button', changeAllCardsColorButton);

changeCardColorButton.addEventListener(`click`, () => {
  productCard.style.backgroundColor = '#b1ccebb2';
})

changeAllCardsColorButton.addEventListener('click', () => {
  productCards.forEach(card => {
    card.style.backgroundColor = '#53aab9b2';
  });
});

// Изменить цвет этой кнопки
const changeThisButtonColor = document.querySelector('#change-this-button-color');

changeThisButtonColor.addEventListener ('click', () => {
  changeThisButtonColor.classList.toggle ("this-button-color")
});



// Open Google button
const openGoogleButton = document.querySelector('#open-google-button');

openGoogleButton.addEventListener('click', openGoogle);

function openGoogle() {
  const answer = confirm('Вы уверены, что хотите открыть Google?');

  if (answer === true) {
    window.open('https://www.google.com')
  } else {
    return;
  }
}

// Вывод консоль лог
const outputLogButton = document.querySelector('#output-console-log');

outputLogButton.addEventListener('click', () => outputConsolelog('ДЗ готово'))

function outputConsolelog(message) {
  alert(message)
  console.log(message)
}

const outputContentElement = document.querySelector('.title');

outputContentElement.addEventListener('mouseenter', () => {
    console.log(outputContentElement.textContent)
})