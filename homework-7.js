// Данная строка выводит консоль лог
console.log('Hello world')
/* Коментарии многострочные */
const firstName = 'Albert';
const myAge = 34;
const message = `Hello, i'm ${firstName}, мне ${myAge} лет`.

console.log(message)

// Температура в городе
function showTemperatureInCity (city, temperature) {
  console.log(`Температура в городе ${city} составляет ${temperature}.`);
}

showTemperatureInCity('Kazan', '25°C');

// Скорость света
const LIGHT_SPEED = 299792458;

function checkLightSpeed(speed) {
  if (speed > LIGHT_SPEED)
    console.log('Сверхсветовая скорость');
    else if (speed === LIGHT_SPEED)
    console.log('Скорость света');
    else 
    console.log('Субсветовая скорость');
}

checkLightSpeed(30)

// Проверка баланса
const balance = 100;
const productPrice = 333;

if (balance >= productPrice) {
  console.log('Спасибо за покупку');
} else {
  const deficit = productPrice - balance;
  console.log(`Недостаточно средств, не хватает ${deficit}`);
}

const sayHi = () => {
  console.log('Привет')
}

sayHi()

// Ниже используем обратные ковычки для интерполяции
const sayHi2 = (name) => {
  console.log(`Привет ${name}`)
}

sayHi2('Альберт')

function greet(name = "Влад") {
  console.log(`Привет, ${name}`);
}

greet();


