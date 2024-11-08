import { ExpenseStateType } from '#types/expense.ts';
import renderExpenseList from '#components/Expenses/ExpenseList.ts';
import renderExpenseCategoriesFilter from '#components/Expenses/ExpenseCategoriesFilter.ts';
import modalState from '#state/modal.ts';

const ExpenseState: ExpenseStateType = {
  expenses: [],
  categories: ['Все категории'],
  filterCategory: 'Все категории',
  currentEditingExpenseId: null,
  addExpense: (expense) => {
    console.log(expense);
    // если будет использоваться на проекте с множеством страниц, то можно делать разные рендеры, в зависимости от страницы
    // т.е. делать проверку через switch на адрес страницы
    ExpenseState.expenses.push(expense);

    ExpenseState.calculateFilterCategories();
    renderExpenseList(ExpenseState);
  },
  removeExpense: (id) => {
    ExpenseState.expenses = ExpenseState.expenses.filter((expense) => expense.id !== id);
    ExpenseState.calculateFilterCategories();
    renderExpenseList(ExpenseState);
  },
  editExpense: (id, data) => {},
  openEditModal: (id) => {
    modalState.openModal('edit-expense-modal', {
      expenseState: ExpenseState,
      expenseId: id,
    });
  },
  calculateFilterCategories: () => {
    ExpenseState.categories = [
      'Все категории',
      ...new Set(ExpenseState.expenses.map((expense) => expense.category).filter((category) => category !== '')),
    ];

    if (!ExpenseState.categories.includes(ExpenseState.filterCategory)) {
      ExpenseState.filterCategory = 'Все категории';
    }

    renderExpenseCategoriesFilter(ExpenseState);
  },
  changeFilterCategory: (category) => {
    ExpenseState.filterCategory = category;
    renderExpenseList(ExpenseState);
    renderExpenseCategoriesFilter(ExpenseState);
  },
};

function init() {
  console.log('init');
  ExpenseState.addExpense({
    id: crypto.randomUUID(),
    title: 'Оппенгеймер',
    sum: 100,
    category: 'Кино',
  });

  const addExpenseForm = document.querySelector<HTMLFormElement>('#add-expense-form');
  addExpenseForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const titleInput = addExpenseForm.querySelector<HTMLInputElement>('[name="title"]');
    const sumInput = document.querySelector<HTMLInputElement>('[name="sum"]');
    const categoryInput = document.querySelector<HTMLSelectElement>('[name="category"]');

    ExpenseState.addExpense({
      id: crypto.randomUUID(),
      title: titleInput?.value.trim() || '',
      sum: Number(sumInput?.value) || 0,
      category: categoryInput?.value.trim() || '',
    });

    addExpenseForm.reset();
  });
}

init();

export default ExpenseState;
