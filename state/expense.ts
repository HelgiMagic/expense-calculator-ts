import { ExpenseStateType } from '#types/state/expense.ts';
import { GlobalStateType } from '#types/state/global.ts';
import renderExpenseList from '#components/Expenses/ExpenseList.ts';
import renderExpenseCategoriesFilter from '#components/Expenses/ExpenseCategoriesFilter.ts';
import renderAddExpenseForm from '#components/Expenses/AddExpenseForm.ts';
import renderExpenseSum from '#components/Expenses/ExpenseSum.ts';
import storageUtil from '#utils/storage.ts';

// TODO
// здесь можно сделать валидацию, на случай, если данные в локальном хранилище не соответствуют актуальным
// function validateExpenses(data: any) {
//     return data.every((expense: any) => {

//     })
// }

function createExpenseState(globalState: GlobalStateType) {
    const expenseState: ExpenseStateType = {
        expenses: storageUtil.load('expenses') || [],
        categories: ['Все категории'],
        filterCategory: 'Все категории',
        currentEditingExpenseId: null,
        addExpense: (expense) => {
            expenseState.expenses.push(expense);
            storageUtil.save('expenses', expenseState.expenses);

            expenseState.calculateFilterCategories();
            renderExpenseList(globalState);
            renderExpenseSum(globalState);
        },
        removeExpense: (id) => {
            expenseState.expenses = expenseState.expenses.filter((expense) => expense.id !== id);
            storageUtil.save('expenses', expenseState.expenses);

            expenseState.calculateFilterCategories();
            renderExpenseList(globalState);
            renderExpenseSum(globalState);
        },
        editExpense: (newData) => {
            const index = expenseState.expenses.findIndex(
                (expense) => expense.id === expenseState.currentEditingExpenseId
            );
            if (index === -1) return;

            expenseState.expenses[index] = {
                ...expenseState.expenses[index],
                ...newData,
            };

            storageUtil.save('expenses', expenseState.expenses);

            expenseState.calculateFilterCategories();
            renderExpenseList(globalState);
            renderExpenseSum(globalState);
        },
        openEditModal: (id) => {
            expenseState.currentEditingExpenseId = id;

            globalState.modalState.openModal('edit-expense-modal');
        },
        calculateFilterCategories: () => {
            expenseState.categories = [
                'Все категории',
                ...new Set(
                    expenseState.expenses.map((expense) => expense.category).filter((category) => category !== '')
                ),
            ];

            if (!expenseState.categories.includes(expenseState.filterCategory)) {
                expenseState.filterCategory = 'Все категории';
            }

            renderExpenseCategoriesFilter(globalState);
        },
        changeFilterCategory: (category) => {
            expenseState.filterCategory = category;
            renderExpenseList(globalState);
            renderExpenseCategoriesFilter(globalState);
            renderExpenseSum(globalState);
        },
    };

    return expenseState;
}

function initExpenseState(globalState: GlobalStateType) {
    renderAddExpenseForm(globalState);
    globalState.expenseState.calculateFilterCategories();
    renderExpenseList(globalState);
    renderExpenseCategoriesFilter(globalState);
    renderExpenseSum(globalState);
}

export { initExpenseState, createExpenseState };
