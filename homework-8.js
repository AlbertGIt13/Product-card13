// 3 задание мои данные 
const user = {
  name: "Albert",
  lastName: "Garifullin",
  age: 34,
  country: "Russia",
  city: "Kazan",
  email: "Albert1392@gmail.com",
  job: "Product Engineer",
  Hobbies: "3D-artist"
}

const person = new Object();
person.name = "Albert"
person.age = 34;

console.log(person);
console.log(user);
console.log(user["city"]);
console.log(user.city);

// 4 задание автомобиль
const car = {
  brand: "Volvo",
  model: "XC60",
  color: "Silver",
  transmission: "Auto",
}

car.owner = person;
console.log(car.owner.name);

// 5 задание проверка максимальной скорости
function addMaxSpeed(car) {
  if (car.hasOwnProperty("maxSpeed") === false) {
    car.maxSpeed = 220;
  }
}

addMaxSpeed(car);
console.log(car);

// 6 задание  функция первым аргументом — объект, а вторым аргументом — свойство объекта, которое нужно вывести и выводит его значение.

function printProperty(obj, propName) {
  console.log(car[propName]);
}

printProperty(car, "brand");

// 7 задание массив продуктов

const numbers = [0, 1, 2, 3, 4];
const products = ['Ананас', 'Виноград', 'Груша', 'Яблоко'];
products.push('Дыня')
const productsNumbers = numbers.concat(products);

console.log(productsNumbers);
console.log(numbers[1]);

// 8 массив книги

const books = [
  {
    title: 'Гарри Поттер и философский камень',
    author: 'Дж. К. Роулинг',
    year: 1997,
    coverColor: 'красный',
    genre: 'фэнтези'
  },
  {
    title: 'Властелин колец: Братство Кольца',
    author: 'Дж. Р. Р. Толкин',
    year: 1954,
    coverColor: 'зелёный',
    genre: 'фэнтези'
  },
  {
    title: '1984',
    author: 'Джордж Оруэлл',
    year: 1949,
    coverColor: 'чёрный',
    genre: 'антиутопия'
  },
  {
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    year: 1967,
    coverColor: 'бордовый',
    genre: 'магический реализм'
  }
];

// метод push

books.push({
  title: 'Дюна',
  author: 'Фрэнк Герберт',
  year: 1965,
  coverColor: 'песочный',
  genre: 'научная фантастика'
});

// 9 задание книги в жанре фантастика
const fantasyBooks = [
  {
    title: "Хоббит", 
    author: "Дж.Р.Р. Толкин", 
    year: 1937, 
    coverColor: "коричневый", 
    genre: "фэнтези"
  },
  {
    title: 'Две крепости',
    author: 'Дж. Р. Р. Толкин',
    year: 1954,
    coverColor: 'коричневый',
    genre: 'фэнтези'
  }
];

const allBooks = [...books, ...fantasyBooks];

console.log(allBooks);

// 10 массив map

function getIsRareProperty(booksArray) {
  return booksArray.map(book => {
    return {
      ...book,
      isRare: book.year < 1950
    };
  });
}

const booksWithRarity = getIsRareProperty(allBooks);
const rareOnly = booksWithRarity.filter(book => book.isRare);

console.log(booksWithRarity);
console.log('Только редкие:', rareOnly);
