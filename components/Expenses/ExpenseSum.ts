import '#styles/components/expense/expense-sum.css';
import { GlobalStateType } from '#types/state/global.ts';

export default function renderExpenseSum(globalState: GlobalStateType) {
    const container = document.querySelector<HTMLDivElement>('.expense-sum-js');
    if (!container) return;
    container.innerHTML = '';

    const expenseState = globalState.expenseState;

    let expenses = expenseState.expenses;
    if (expenseState.filterCategory !== 'Все категории') {
        expenses = expenseState.expenses.filter((expense) => expense.category === expenseState.filterCategory);
    }

    const expensesSum = expenses.reduce((acc, curr) => acc + curr.sum, 0);

    const sum = `
        <div>
            <span>Сумма расходов: </span>
            <span>${expensesSum} руб.</span>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', sum);
}
