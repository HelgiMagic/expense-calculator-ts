import ExpenseState from '#state/expenses.ts';
import '#styles/components/expense-filter.css';
import { ExpenseStateType } from '#types/main.ts';
import addDynamicEventListener from '#utils/DynamicEventListener.ts';

export default function renderExpenseCategoriesFilter(state: ExpenseStateType) {
  const filtersContainer = document.querySelector('.expense-filters-js');
  if (!filtersContainer) return;

  filtersContainer.innerHTML = '';

  console.log(state.categories);

  state.categories.forEach((category) => {
    const itemClass = category === state.filterCategory ? 'active' : '';
    const item = `
        <div class="filter-item ${itemClass}">${category}</div>
    `;

    filtersContainer.insertAdjacentHTML('beforeend', item);
  });
}

addDynamicEventListener(document.body, 'click', '.filter-item', (event) => {
  const target = event.target as HTMLElement;
  ExpenseState.changeFilterCategory(target.textContent || '');
});
