import '#styles/expense-list.css';
import { ExpenseStateType } from '#types/main.ts';

export default function renderExpenseList(state: ExpenseStateType) {
  const listContainer = document.querySelector('.expenses-list');
  if (!listContainer) return;

  listContainer.innerHTML = '';

  state.expenses.forEach((expense) => {
    const category = expense.category || 'Без категории';
    const item = `
    <div class="expense-item">
        <div class="expense-item__category">${category}</div>

        <div class="expense-item-row">
            <div class="expense-item__title">Название: ${expense.title}</div>
            <div class="expense-item__sum">Сумма: ${expense.sum}</div>
            <div class="expense-item__delete">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="M19 5 5 19M5 5l4.5 4.5M12 12l7 7" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>            </div>
            <div class="expense-item__edit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"/><g stroke-linecap="round" stroke-linejoin="round"/><path d="m5 15-1 1v4h4l6-6m4-4 3-3-4-4-3 3m4 4-1 1m1-1-4-4m0 0-6.5 6.5" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
        </div>
    </div>
    `;

    listContainer.insertAdjacentHTML('beforeend', item);
  });
}
