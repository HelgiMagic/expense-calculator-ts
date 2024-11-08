import '#styles/components/expense/expense-filter.css';
import { ExpenseStateType } from '#types/expense.ts';
import addDynamicEventListener from '#utils/DynamicEventListener.ts';

// установка стейта через let нужна, чтоб обработчик событий устанавливался только один раз, а не при каждом рендере
// напрямую импортнуть ExpenseState нельзя, т.к. будет зацикливание импортов
let expenseStateEvents: ExpenseStateType;

export default function renderExpenseCategoriesFilter(expenseState: ExpenseStateType) {
    if (!expenseStateEvents) {
        expenseStateEvents = expenseState;
    }

    const filtersContainer = document.querySelector('.expense-filters-js');
    if (!filtersContainer) return;

    filtersContainer.innerHTML = '';

    console.log(expenseState.categories);

    expenseState.categories.forEach((category) => {
        const itemClass = category === expenseState.filterCategory ? 'active' : '';
        const item = `
        <div class="filter-item ${itemClass}">${category}</div>
    `;

        filtersContainer.insertAdjacentHTML('beforeend', item);
    });
}

// используется кастомный обработчик, чтобы можно было рендерить через insertAdjacentHTML вместо document.createElement

function init() {
    const container = document.querySelector<HTMLDivElement>('.expense-filters-js');
    if (!container) return;

    addDynamicEventListener(container, 'click', '.filter-item', (event) => {
        const target = event.target as HTMLElement;
        expenseStateEvents.changeFilterCategory(target.textContent || '');
    });
}

init();
