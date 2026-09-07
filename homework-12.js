class Book {
  constructor(title, author, year, pages) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
  }

read() {
  return `Читаем книгу "${this.title}"`;
  }

getInfo() {
  return `Название: ${this.title}, Автор: ${this.author}, Год: ${this.year}, Страниц: ${this.pages}`;
  }
}

class EBook extends Book {
  constructor(title, author, year, pages, format) {
    super(title, author, year, pages);
    this.format = format;
  }

  download() {
    return `Скачиваем электронную книгу в формате ${this.format}`;
  }

  read() {
    return super.read() + ' (в электронном формате)';
  }
}

const paperBook = new Book('Война и мир', 'Лев Толстой', 1869, 1225);
console.log(paperBook.getInfo());
console.log(paperBook.read());

const digitalBook = new EBook('1984', 'Джордж Оруэлл', 1949, 328, 'PDF');
console.log(digitalBook.getInfo());
console.log(digitalBook.read());
console.log(digitalBook.download());