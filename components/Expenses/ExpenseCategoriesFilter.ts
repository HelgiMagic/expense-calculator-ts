import '#styles/components/expense/expense-filter.css';
import { GlobalStateType } from '#types/state/global.ts';
import addDynamicEventListener from '#utils/dynamicEventListener.ts';

export default function renderExpenseCategoriesFilter(globalState: GlobalStateType) {
    const filtersContainer = document.querySelector('.expense-filters-js');
    if (!filtersContainer) return;
    filtersContainer.innerHTML = '';
    init(globalState);

    const expenseState = globalState.expenseState;

    expenseState.categories.forEach((category) => {
        const itemClass = category === expenseState.filterCategory ? 'active' : '';
        const item = `
        <div class="filter-item ${itemClass}">${category}</div>
    `;

        filtersContainer.insertAdjacentHTML('beforeend', item);
    });
}

// используется кастомный обработчик, чтобы можно было рендерить через insertAdjacentHTML вместо document.createElement

let isInitialized = false;

function init(globalState: GlobalStateType) {
    if (isInitialized) return;
    isInitialized = true;

    const expenseState = globalState.expenseState;

    const container = document.querySelector<HTMLDivElement>('.expense-filters-js');
    if (!container) return;

    addDynamicEventListener(container, 'click', '.filter-item', (event) => {
        const target = event.target as HTMLElement;
        expenseState.changeFilterCategory(target.textContent || '');
    });
}
