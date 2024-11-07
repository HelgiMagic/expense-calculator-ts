export type Expense = {
  id: string;
  title: string;
  sum: number;
  category: string;
};

export type ExpenseStateType = {
  expenses: Expense[];
  categories: string[];
  filterCategory: string;
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  changeFilterCategory: (category: string) => void;
  calculateFilterCategories: () => void;
};
