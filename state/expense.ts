import { ExpenseStateType } from '#types/expense.ts';
import renderExpenseList from '#components/Expenses/ExpenseList.ts';
import renderExpenseCategoriesFilter from '#components/Expenses/ExpenseCategoriesFilter.ts';
import renderAddExpenseForm from '#components/Expenses/AddExpenseForm.ts';
import modalState from '#state/modal.ts';
import storageUtil from '#utils/storage.ts';

// TODO
// здесь можно сделать валидацию, на случай, если данные в локальном хранилище не соответствуют актуальным
// function validateExpenses(data: any) {
//     return data.every((expense: any) => {

//     })
// }

const expenseState: ExpenseStateType = {
    expenses: storageUtil.load('expenses') || [],
    categories: ['Все категории'],
    filterCategory: 'Все категории',
    currentEditingExpenseId: null,
    addExpense: (expense) => {
        expenseState.expenses.push(expense);
        storageUtil.save('expenses', expenseState.expenses);

        expenseState.calculateFilterCategories();
        renderExpenseList(expenseState);
    },
    removeExpense: (id) => {
        expenseState.expenses = expenseState.expenses.filter((expense) => expense.id !== id);
        storageUtil.save('expenses', expenseState.expenses);

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

        storageUtil.save('expenses', expenseState.expenses);

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
    renderAddExpenseForm(expenseState);
    expenseState.calculateFilterCategories();
    renderExpenseList(expenseState);
    renderExpenseCategoriesFilter(expenseState);
}

init();

export default expenseState;
