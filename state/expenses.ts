import { ExpenseStateType } from '#types/main.ts';
import renderExpenseList from '#components/ExpenseList.ts';

const ExpenseState: ExpenseStateType = {
  expenses: [],
  filterCategory: 'all',
  addExpense: (expense) => {
    console.log(expense);
    // если будет использоваться на проекте с множеством страниц, то можно делать разные рендеры, в зависимости от страницы
    // т.е. делать проверку через switch на адрес страницы
    ExpenseState.expenses.push(expense);
    renderExpenseList(ExpenseState);
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
    const formData = new FormData(addExpenseForm);
    const title = formData.get('title');
    const sum = formData.get('sum');
    const category = formData.get('category');

    ExpenseState.addExpense({
      id: crypto.randomUUID(),
      title: title as string,
      sum: Number(sum),
      category: category as string,
    });

    addExpenseForm.reset();
  });
}

init();

export default ExpenseState;
