export default class Modal {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.overlay = document.querySelector('.overlay');
    this.closeButton = this.modal.querySelector('#modal-close-button');

    this._listenCloseButton();
  }

  // I. Открыть модальное окно
  open() {
    this.modal.classList.add('modal-showed');
    this.overlay.classList.add('overlay-showed');
    document.body.classList.add('modal-open');
  }

  // II. Закрыть модальное окно
  close() {
    this.modal.classList.remove('modal-showed');
    this.overlay.classList.remove('overlay-showed');
    document.body.classList.remove('modal-open');
  }

  // III. Проверить, открыто ли модальное окно
  isOpen() {
    return this.modal.classList.contains('modal-showed');
  }

  // IV. Слушать кнопку закрытия (крестик)
  _listenCloseButton() {
    this.closeButton.addEventListener('click', () => {
      this.close();
    });
  }
}
