import '#styles/components/expense/expense-edit-modal.css';
import addDynamicEventListener from '#utils/DynamicEventListener.ts';
import { ExpenseStateType } from '#types/expense.ts';
import { ModalStateType } from '#types/modal.ts';
import { validateForm, FormErrors } from '#utils/validateForm.ts';

let expenseStateEvents: ExpenseStateType;
let modalStateEvents: ModalStateType;

// local state
let FormErrors: FormErrors = {
  title: null,
  sum: null,
};

// локальный стейт формы нужен для корректного отображения ошибок
let FormData = {
  title: '',
  sum: 0,
  category: '',
};

function setFormErrors(errors: FormErrors) {
  FormErrors = errors;
  renderExpenseEditModal(expenseStateEvents, modalStateEvents);
}

export default function renderExpenseEditModal(expenseState: ExpenseStateType, modalState: ModalStateType) {
  const editingElement = expenseState.expenses.find((expense) => expense.id === expenseState.currentEditingExpenseId);
  if (!editingElement) return;

  // срабатывает 1 раз
  if (!expenseStateEvents) {
    expenseStateEvents = expenseState;
    modalStateEvents = modalState;
    FormData = {
      title: editingElement.title,
      sum: editingElement.sum,
      category: editingElement.category,
    };
  }

  const container = document.querySelector<HTMLDivElement>('.modal-js');
  if (!container || container.classList.contains('d-none')) return;
  container.innerHTML = '';

  const modal = `
        <form class="edit-expense-form" novalidate>
            <div class="error-message">${FormErrors.title || ''}</div>
            <input name="title" type="text" value="${FormData.title}">
            <div class="error-message">${FormErrors.sum || ''}</div>
            <input name="sum" type="number" value="${FormData.sum}">
            <input name="category" type="text" value="${FormData.category}">

            <div class="buttons">
                <button class="submit-expense-form" type="submit">Сохранить</button>
                <button class="close-modal-js" type="button">Отмена</button>
            </div>
        </form>
    `;

  container.insertAdjacentHTML('beforeend', modal);
}

function initEvents() {
  const container = document.querySelector<HTMLDivElement>('.modal-js');
  if (!container) return;

  const validationRules = {
    title: (value: string) => (value.trim() ? null : 'Название обязательно.'),
    sum: (value: number) => (value > 0 ? null : 'Сумма должна быть больше нуля.'),
  };

  addDynamicEventListener(container, 'submit', '.edit-expense-form', (event) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    FormData = {
      title: form.querySelector<HTMLInputElement>('[name="title"]')?.value.trim() || '',
      sum: Number(form.querySelector<HTMLInputElement>('[name="sum"]')?.value) || 0,
      category: form.querySelector<HTMLInputElement>('[name="category"]')?.value.trim() || '',
    };

    const { isValid, errors } = validateForm(FormData, validationRules);

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    expenseStateEvents.editExpense(FormData);
    modalStateEvents.closeModal();
  });
}

initEvents();
