import { ExpenseStateType } from '#types/expense.ts';
import renderExpenseList from '#components/Expenses/ExpenseList.ts';
import renderExpenseCategoriesFilter from '#components/Expenses/ExpenseCategoriesFilter.ts';
import renderAddExpenseForm from '#components/Expenses/AddExpenseForm.ts';
import modalState from '#state/modal.ts';

console.log(renderAddExpenseForm);

const expenseState: ExpenseStateType = {
    expenses: [],
    categories: ['Все категории'],
    filterCategory: 'Все категории',
    currentEditingExpenseId: null,
    addExpense: (expense) => {
        console.log(expense);
        // если будет использоваться на проекте с множеством страниц, то можно делать разные рендеры, в зависимости от страницы
        // т.е. делать проверку через switch на адрес страницы
        expenseState.expenses.push(expense);

        expenseState.calculateFilterCategories();
        renderExpenseList(expenseState);
    },
    removeExpense: (id) => {
        expenseState.expenses = expenseState.expenses.filter((expense) => expense.id !== id);
        expenseState.calculateFilterCategories();
        renderExpenseList(expenseState);
    },
    editExpense: (newData) => {
        const index = expenseState.expenses.findIndex((expense) => expense.id === expenseState.currentEditingExpenseId);
        if (index === -1) return;

        expenseState.expenses[index] = {
            ...expenseState.expenses[index],
            ...newData,
        };
        renderExpenseList(expenseState);
        expenseState.calculateFilterCategories();
    },
    openEditModal: (id) => {
        expenseState.currentEditingExpenseId = id;

        modalState.openModal('edit-expense-modal', {
            expenseState: expenseState,
        });
    },
    calculateFilterCategories: () => {
        expenseState.categories = [
            'Все категории',
            ...new Set(expenseState.expenses.map((expense) => expense.category).filter((category) => category !== '')),
        ];

        if (!expenseState.categories.includes(expenseState.filterCategory)) {
            expenseState.filterCategory = 'Все категории';
        }

        renderExpenseCategoriesFilter(expenseState);
    },
    changeFilterCategory: (category) => {
        expenseState.filterCategory = category;
        renderExpenseList(expenseState);
        renderExpenseCategoriesFilter(expenseState);
    },
};

function init() {
    console.log('init');
    expenseState.addExpense({
        id: crypto.randomUUID(),
        title: 'Оппенгеймер',
        sum: 100,
        category: 'Кино',
    });

    renderAddExpenseForm(expenseState);

    // мб выделим это в отдельный компонент без рендера
}

init();

export default expenseState;
