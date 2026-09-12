export default class Form {
  constructor(formId) {
    this.form = document.getElementById(formId);
  }

  // I. Получить все значения формы
  getValues() {
    const formData = new FormData(this.form);
    return Object.fromEntries(formData.entries());
  }

  // II. Проверить валидность формы (возвращает true/false)
  isValid() {
    return this.form.checkValidity();
  }

  // III. Сбросить значения формы
  reset() {
    this.form.reset();
  }
}
