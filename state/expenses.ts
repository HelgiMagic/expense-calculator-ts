import { ExpenseStateType } from '#types/main.ts';
import renderExpenseList from '#components/Expenses/ExpenseList.ts';
import renderExpenseCategoriesFilter from '#components/Expenses/ExpenseCategoriesFilter.ts';

const ExpenseState: ExpenseStateType = {
  expenses: [],
  categories: ['Все категории'],
  filterCategory: 'Все категории',
  addExpense: (expense) => {
    console.log(expense);
    // если будет использоваться на проекте с множеством страниц, то можно делать разные рендеры, в зависимости от страницы
    // т.е. делать проверку через switch на адрес страницы
    ExpenseState.expenses.push(expense);

    if (
      !ExpenseState.categories.includes(expense.category) &&
      expense.category !== ''
    ) {
      ExpenseState.categories.push(expense.category);

      console.log('категории');

      renderExpenseCategoriesFilter(ExpenseState);
    }

    renderExpenseList(ExpenseState);
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

  const addExpenseForm =
    document.querySelector<HTMLFormElement>('#add-expense-form');
  addExpenseForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const titleInput =
      addExpenseForm.querySelector<HTMLInputElement>('[name="title"]');
    const sumInput = document.querySelector<HTMLInputElement>('[name="sum"]');
    const categoryInput =
      document.querySelector<HTMLSelectElement>('[name="category"]');

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
