import '#styles/components/expense/expense-edit-modal.css';
import addDynamicEventListener from '#utils/DynamicEventListener.ts';
import { ExpenseStateType } from '#types/expense.ts';
import { ModalStateType } from '#types/modal.ts';
import { validateForm } from '#utils/validateForm.ts';

let expenseStateEvents: ExpenseStateType;
let modalStateEvents: ModalStateType;

export default function renderExpenseEditModal(expenseState: ExpenseStateType, modalState: ModalStateType) {
  if (!expenseStateEvents) {
    expenseStateEvents = expenseState;
    modalStateEvents = modalState;
  }

  const container = document.querySelector<HTMLDivElement>('.modal-js');
  if (!container) return;
  container.innerHTML = '';

  const editingElement = expenseState.expenses.find((expense) => expense.id === expenseState.currentEditingExpenseId);
  if (!editingElement) return;
  console.log(editingElement);

  const modal = `
        <form class="edit-expense-form" novalidate>
            <input name="title" type="text" value="${editingElement.title}">
            <input name="sum" type="number" value="${editingElement.sum}">
            <input name="category" type="text" value="${editingElement.category}">

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
    category: (value: string) => (value.trim() ? null : 'Категория обязательна.'),
  };

  addDynamicEventListener(container, 'submit', '.edit-expense-form', (event) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = {
      title: form.querySelector<HTMLInputElement>('[name="title"]')?.value.trim() || '',
      sum: Number(form.querySelector<HTMLInputElement>('[name="sum"]')?.value) || 0,
      category: form.querySelector<HTMLInputElement>('[name="category"]')?.value.trim() || '',
    };

    const { isValid, errors } = validateForm(formData, validationRules);

    console.log(isValid, errors);

    if (!isValid) {
      expenseStateEvents.setFormErrors(errors);
      return;
    }

    expenseStateEvents.editExpense(formData);
    modalStateEvents.closeModal();
  });
}

initEvents();
