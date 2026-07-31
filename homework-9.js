// 1 уровень  2 массив чисел от 1 до 10 с 
import { comments } from './comments.js';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const fromFive =numbers.filter(number => number >= 5);

// 3

const products = ['Ананас', 'Банан', 'Виноград', 'Груша', 'Яблоко'];
const hasMelon = products.includes('Дыня');

// 4 переворачиваем массивы

const reversedNumbers = reverseArray(numbers);
const reversedProducts = reverseArray(products);

function reverseArray(arr) {
  return arr.reverse(); 
}

console.log(numbers);
console.log(fromFive);
console.log(products);
console.log(hasMelon);
console.log(reversedNumbers);
console.log(reversedProducts);

// 2 уровень 7 массив комментариев из файла comments.js с адресами .com



const commentsWithComEmail = comments.filter(comment => comment.email.includes('.com'));

console.log(commentsWithComEmail);

// 8 перебор массива

const updatedComments = comments.map(comment => {
const newPostId = comment.id <= 5 ? 2 : 1;
  return { ...comment, postId: newPostId };
});

console.log(updatedComments);

// 9 массив из айди и имени

const idAndNameArray = comments.map(comment => ({
  id: comment.id,
  name: comment.name
}));

console.log(idAndNameArray);

// 10 добавляем свойство isInvalid

const commentsWithIsInvalid = comments.map(comment => ({
  ...comment,
  isInvalid: comment.body.length >= 180
}));

console.log(commentsWithIsInvalid);

// уровень 3 

// 11 через map

const emailsWithMap = comments.map(comment => comment.email);

console.log(emailsWithMap);

// через reduce 


const emailsWithReduce = comments.reduce((acc, comment) => {
  acc.push(comment.email);
  return acc;
}, []);

console.log(emailsWithReduce);

// 12 метод toString(), join()

const setToString = emailsWithMap.toString();

console.log(setToString);


const setToJoin = emailsWithMap.join(', ');

console.log(setToJoin);
