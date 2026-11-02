const messageEl = document.getElementById('message');
const errorEl = document.getElementById('error');
const usersContainer = document.getElementById('usersContainer');
const loadBtn = document.getElementById('loadBtn');
const clearAllBtn = document.getElementById('clearAllBtn');

const STORAGE_KEY = 'users';
const LOAD_DELAY_MS = 2000;

function showMessage(text) {
  messageEl.textContent = text;
  messageEl.style.display = 'block';
  errorEl.style.display = 'none';
}

function showError(text) {
  errorEl.textContent = text;
  errorEl.style.display = 'block';
  messageEl.style.display = 'none';
}

function hideMessages() {
  messageEl.style.display = 'none';
  errorEl.style.display = 'none';
}

function saveToLocalStorage(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function getFromLocalStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === null) {
    return null;
  }

const users = JSON.parse(stored);
  if (!Array.isArray(users)) {
    throw new Error('Некорректные данные в хранилище');
  }
  return users;
}

async function loadDataFromJSON() {
  await new Promise(resolve => setTimeout(resolve, LOAD_DELAY_MS));

const response = await fetch('./users.json');
  if (!response.ok) {
    throw new Error('Не удалось загрузить users.json');
  }

const data = await response.json();
  if (!data || !Array.isArray(data.users)) {
    throw new Error('Некорректный формат JSON');
  }
  return data.users;
}

function displayUsers(users) {
  usersContainer.replaceChildren();
  if (users.length === 0) {
    showMessage('Пользователей нет');
    return;
  }

users.forEach(user => {
const card = document.createElement('div');
card.className = 'user-card';

const title = document.createElement('h3');
title.textContent = `${user.name} ${user.surname}`;

const email = document.createElement('p');
email.textContent = `Email: ${user.email}`;

const age = document.createElement('p');
age.textContent = `Возраст: ${user.age}`;

const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Удалить';
  deleteButton.type = 'button';
  deleteButton.addEventListener('click', () => {
    removeUser(user.id);
  });

  card.append(title, email, age, deleteButton);
  usersContainer.append(card);
  });
  hideMessages();
}

function removeUser(id) {
  try {
    const users = getFromLocalStorage();
    if (users === null) {
      showMessage('Пользователей нет');
      return;
    }

  const updatedUsers = users.filter(user => user.id !== id);
  if (updatedUsers.length === users.length) {
    showMessage('Пользователь не найден');
    return;
  }

  saveToLocalStorage(updatedUsers);

  displayUsers(updatedUsers);

  showMessage(
  updatedUsers.length === 0 ? 'Пользователь удалён. Список пуст'
  : 'Пользователь удалён'
  );

  } catch (error) {
  console.error(error);
  showError('Ошибка при удалении пользователя');
  }
}


// ==========================================
// 7. УДАЛЕНИЕ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ
// ==========================================

function clearAllUsers() {
  try {
    saveToLocalStorage([]);
    displayUsers([]);
    showMessage('Все пользователи удалены');
  } catch (error) {
  console.error(error);
  showError('Ошибка при удалении пользователей');
  }
}

async function init() {

  let storedUsers;

  try {
    storedUsers = getFromLocalStorage();
  } catch (error) {
    console.error(error);
    showError('Ошибка при чтении сохранённых данных');
    return;
  }

  if (storedUsers !== null) {
    displayUsers(storedUsers);
    return;
  }

  showMessage('Данные загружаются...');
  loadBtn.disabled = true;
  clearAllBtn.disabled = true;
  try {
  const users = await loadDataFromJSON();

  saveToLocalStorage(users);
  displayUsers(users);
  } catch (error) {
  console.error(error);
  showError('Ошибка при загрузке данных');
  } finally {
  loadBtn.disabled = false;
  clearAllBtn.disabled = false;
  }
}

loadBtn.addEventListener('click', () => {
  try {
    const users = getFromLocalStorage();
    if (users === null) {
      init();
      return;
    }

    if (users.length === 0) {
      showMessage('В хранилище нет пользователей');
      return;
    }

    if (usersContainer.children.length === users.length) {
      showMessage('Все пользователи уже отображены');
    } else {
      displayUsers(users);
    }

  } catch (error) {
    console.error(error);
    showError('Ошибка при получении пользователей');
  }
});

clearAllBtn.addEventListener('click', clearAllUsers);

document.addEventListener('DOMContentLoaded', init);

