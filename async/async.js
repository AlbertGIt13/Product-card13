
const MESSAGE_EL = document.getElementById('message');
const ERROR_EL = document.getElementById('error');
const USERS_CONTAINER = document.getElementById('usersContainer');
const LOAD_BTN = document.getElementById('loadBtn');
const CLEAR_ALL_BTN = document.getElementById('clearAllBtn');

const STORAGE_KEY = 'users';

let isLoading = false;

// Отображение обычного сообщения
function showMessage(text) {
  MESSAGE_EL.textContent = text;
  MESSAGE_EL.style.display = 'block';
  ERROR_EL.style.display = 'none';
}

// Отображение ошибки
function showError(text) {
  ERROR_EL.textContent = text;
  ERROR_EL.style.display = 'block';
  MESSAGE_EL.style.display = 'none';
}

// Скрытие сообщений
function hideMessages() {
  MESSAGE_EL.style.display = 'none';
  ERROR_EL.style.display = 'none';
}

// Сохранение пользователей в Local Storage
function saveToLocalStorage(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// Получение пользователей из Local Storage
function getFromLocalStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);

  // null означает, что ключа users нет
  if (stored === null) {
    return null;
  }

  const users = JSON.parse(stored);

  if (!Array.isArray(users)) {
    throw new Error('В хранилище находятся некорректные данные');
  }

  return users;
}

// Загрузка пользователей из JSON
async function loadDataFromJSON() {
  // Имитация длительной загрузки
  await new Promise(resolve => setTimeout(resolve, 2000));

  const response = await fetch('./users.json');

  if (!response.ok) {
    throw new Error('Не удалось загрузить файл users.json');
  }

  const data = await response.json();

  if (!data || !Array.isArray(data.users)) {
    throw new Error('Некорректный формат JSON');
  }

  return data.users;
}

// Отображение карточек
function displayUsers(users) {
  USERS_CONTAINER.replaceChildren();

  if (users.length === 0) {
    showMessage('Пользователей нет');
    return;
  }

  users.forEach(user => {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.dataset.userId = String(user.id);

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
    USERS_CONTAINER.append(card);
  });

  hideMessages();
}

// Удаление одного пользователя
function removeUser(id) {
  try {
    const users = getFromLocalStorage();

    if (users === null) {
      showMessage('Сохранённых пользователей нет');
      return;
    }

    // filter создаёт новый массив без выбранного пользователя
    const updatedUsers = users.filter(user => user.id !== id);

    if (updatedUsers.length === users.length) {
      showMessage('Пользователь не найден');
      return;
    }

    saveToLocalStorage(updatedUsers);
    displayUsers(updatedUsers);

    if (updatedUsers.length === 0) {
      showMessage('Пользователь удалён. Пользователей больше нет');
    } else {
      showMessage('Пользователь удалён');
    }
  } catch (error) {
    console.error(error);
    showError('Ошибка при удалении пользователя');
  }
}

// Удаление всех пользователей
function clearAllUsers() {
  try {
    const users = getFromLocalStorage();

    if (users !== null && users.length === 0) {
      showMessage('Пользователей уже нет');
      return;
    }

    // Важно: сохраняем пустой массив, а не удаляем ключ
    saveToLocalStorage([]);
    USERS_CONTAINER.replaceChildren();

    showMessage('Все пользователи удалены');
  } catch (error) {
    console.error(error);
    showError('Ошибка при удалении пользователей');
  }
}

// Начальная загрузка страницы
async function init() {
  let storedUsers;

  try {
    storedUsers = getFromLocalStorage();
  } catch (error) {
    console.error(error);
    showError('Ошибка при чтении сохранённых данных');
    return;
  }

  // Если ключ существует, повторно JSON не запрашиваем.
  // Это работает даже в том случае, если сохранён [].
  if (storedUsers !== null) {
    displayUsers(storedUsers);
    return;
  }

  // Не допускаем повторных запросов во время загрузки
  if (isLoading) {
    return;
  }

  isLoading = true;
  LOAD_BTN.disabled = true;
  CLEAR_ALL_BTN.disabled = true;

  showMessage('Данные загружаются...');

  try {
    const users = await loadDataFromJSON();

    saveToLocalStorage(users);
    displayUsers(users);
  } catch (error) {
    console.error(error);
    showError('Ошибка при загрузке данных');
  } finally {
    isLoading = false;
    LOAD_BTN.disabled = false;
    CLEAR_ALL_BTN.disabled = false;
  }
}

// Кнопка получения всех сохранённых карточек
LOAD_BTN.addEventListener('click', async () => {
  try {
    const users = getFromLocalStorage();

    if (users === null) {
      await init();
      return;
    }

    if (users.length === 0) {
      showMessage('В хранилище нет пользователей');
      return;
    }

    const displayedIds = Array.from(
      USERS_CONTAINER.querySelectorAll('.user-card')
    )
      .map(card => card.dataset.userId)
      .sort();

    const savedIds = users
      .map(user => String(user.id))
      .sort();

    const allDisplayed =
      displayedIds.length === savedIds.length &&
      displayedIds.every((id, index) => id === savedIds[index]);

    if (allDisplayed) {
      showMessage('Все сохранённые пользователи уже отображены');
    } else {
      displayUsers(users);
    }
  } catch (error) {
    console.error(error);
    showError('Ошибка при получении пользователей');
  }
});

// Кнопка удаления всех карточек
CLEAR_ALL_BTN.addEventListener('click', clearAllUsers);

// Запуск при открытии страницы
document.addEventListener('DOMContentLoaded', init);
