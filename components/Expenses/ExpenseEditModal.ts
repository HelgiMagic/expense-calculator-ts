import { ExpenseStateType } from '#types/expense.ts';
import { ModalStateType } from '#types/modal.ts';

export default function renderExpenseEditModal(
  expenseState: ExpenseStateType,
  modalState: ModalStateType,
  editId: string
) {
  console.log('render edit modal');
  console.log(expenseState, modalState);

  const container = document.querySelector<HTMLDivElement>('.modal-js');
  if (!container) return;
  container.innerHTML = '';

  const editingElement = expenseState.expenses.find((expense) => expense.id === editId);
  if (!editingElement) return;
  console.log(editingElement);

  const modal = `
        <form class="edit-expense-form">
            <input name="name" type="text" value="${editingElement.title}">
            <input name="sum" type="number" value="${editingElement.sum}">
            <input name="category" type="text" value="${editingElement.category}">
        </form>
    `;

  container.insertAdjacentHTML('beforeend', modal);
}
