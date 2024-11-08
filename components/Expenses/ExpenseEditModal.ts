import '#styles/components/expense/expense-edit-modal.css';
import addDynamicEventListener from '#utils/DynamicEventListener.ts';
import { ExpenseStateType } from '#types/expense.ts';
import { ModalStateType } from '#types/modal.ts';
import ExpenseState from '#state/expense.ts';

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

  const editingElement = expenseState.expenses.find((expense) => expense.id === ExpenseState.currentEditingExpenseId);
  if (!editingElement) return;
  console.log(editingElement);

  const modal = `
        <form class="edit-expense-form">
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

  addDynamicEventListener(container, 'submit', '.edit-expense-form', (event) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const titleInput = form.querySelector<HTMLInputElement>('[name="title"]');
    const sumInput = form.querySelector<HTMLInputElement>('[name="sum"]');
    const categoryInput = form.querySelector<HTMLSelectElement>('[name="category"]');

    expenseStateEvents.editExpense({
      title: titleInput?.value.trim() || '',
      sum: Number(sumInput?.value) || 0,
      category: categoryInput?.value.trim() || '',
    });

    modalStateEvents.closeModal();
  });
}

initEvents();
