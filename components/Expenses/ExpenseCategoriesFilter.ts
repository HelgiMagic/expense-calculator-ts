import '#styles/components/expense-filter.css';
import { ExpenseStateType } from '#types/main.ts';
import addDynamicEventListener from '#utils/DynamicEventListener.ts';

// установка стейта через let нужна, чтоб обработчик событий устанавливался только один раз
// напрямую импортнуть ExpenseState нельзя, т.к. будет зацикливание импортов
let ExpenseState: ExpenseStateType;

export default function renderExpenseCategoriesFilter(state: ExpenseStateType) {
  if (!ExpenseState) {
    ExpenseState = state;
  }

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

// используется кастомный обработчик, чтобы можно было рендерить через insertAdjacentHTML вместо document.createElement

function initEvents() {
  const container = document.querySelector<HTMLDivElement>('.expense-filters-js');
  if (!container) return;

  addDynamicEventListener(document.body, 'click', '.filter-item', (event) => {
    const target = event.target as HTMLElement;
    ExpenseState.changeFilterCategory(target.textContent || '');
  });
}

initEvents();
