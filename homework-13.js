// Абстрактный базовый класс
class Drink {
  #temperature;

  constructor(name, size, price, temperature) {
    if (new.target === Drink) {
    throw new Error("Нельзя сотворить здесь абстрактный класс Drink!!!");
    }

    this.name = name;
    this.size = size;
    this.price = price;
    this.#temperature = temperature;
  }

  getInfo() {
    return `Название: ${this.name}, размер: ${this.size}, цена: ${this.price} руб.`;
  }

  getTemperature() {
    return this.#temperature;
  }

  setTemperature(newTemperature) {
    this.#temperature = newTemperature;
    console.log(`Температура изменена на ${newTemperature}°C`);
  }


  prepare() {
    console.log(`Готовим напиток: ${this.name}...`);
  }

  serve() {
    console.log(`Начинаем подготовку к подаче: ${this.name}`);
    this.prepare();
    console.log(`Подаём напиток: ${this.name}!`);
  }
}


class Coffee extends Drink {
  constructor(name, size, price, temperature, beanType, milkType) {
    super(name, size, price, temperature);
    this.beanType = beanType;
    this.milkType = milkType;
  }

  getInfo() {
    return `${super.getInfo()}, зёрна: ${this.beanType}, молоко: ${this.milkType}`;
  }

  prepare() {
    console.log(`Мелем зёрна ${this.beanType}`);
    console.log(`Добавляем молоко: ${this.milkType}`);
    this.setTemperature(65);
  }
}

class Tea extends Drink {
  constructor(name, size, price, temperature, teaType, sugar) {
    super(name, size, price, temperature);
    this.teaType = teaType;
    this.sugar = sugar;
  }

  getInfo() {
    return `${super.getInfo()}, чай: ${this.teaType}, сахар: ${this.sugar ? 'да' : 'нет'}`;
  }

  prepare() {
    console.log(`Завариваем чай ${this.teaType}`);
    if (this.sugar) {
      console.log("Добавляем сахар");
    }
    this.setTemperature(80);
  }
}

class Lemonade extends Drink {
  constructor(name, size, price, temperature, flavor, ice) {
    super(name, size, price, temperature);
    this.flavor = flavor;
    this.ice = ice;
  }

  getInfo() {
    return `${super.getInfo()}, вкус: ${this.flavor}, лёд: ${this.ice ? 'да' : 'нет'}`;
  }

  prepare() {
    console.log(`Добавляем сироп ${this.flavor}`);
    if (this.ice) {
      console.log("Добавляем лёд");
    }
    this.setTemperature(5);
  }
}

//  Класс Кафе
class Cafe {
  constructor(name, location) {
    this.name = name;
    this.location = location;
  }

  getCafeInfo() {
    return `Кафе "${this.name}", расположение: ${this.location}`;
  }

  orderDrink(drink) {
    console.log(`\n--- Получен заказ: ${drink.name} ---`);
    drink.serve();
    console.log(`Заказ "${drink.name}" готов!`);
  }
}

const cafe = new Cafe("Coffee House", "Казань, улица Баумана");

const coffee = new Coffee("Капучино", "Большой", 250, 60, "Arabica", "Овсяное");
const tea = new Tea("Зелёный чай", "Средний", 180, 60, "Сенча", true);
const lemonade = new Lemonade("Лимонад", "Большой", 220, 20, "Лимон", true);

console.log(cafe.getCafeInfo());
console.log(coffee.getInfo());
console.log(tea.getInfo());
console.log(lemonade.getInfo());

cafe.orderDrink(coffee);
cafe.orderDrink(lemonade);