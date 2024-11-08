import '#styles/components/expense/expense-sum.css';
import { ExpenseStateType } from '#types/state/expense.ts';
import { GlobalStateType } from '#types/state/global.ts';

let globalState: GlobalStateType;
let expenseState: ExpenseStateType;

export default function renderExpenseSum(globalStateParam: GlobalStateType) {
    if (!globalState) {
        globalState = globalStateParam;
        expenseState = globalState.expenseState;
    }

    const container = document.querySelector<HTMLDivElement>('.expense-sum-js');
    if (!container) return;

    container.innerHTML = '';

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
