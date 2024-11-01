export type Expense = {
  id: string;
  title: string;
  sum: number;
  category: string;
};

export type ExpenseStateType = {
  expenses: Expense[];
  filterCategory: string;
  addExpense: (expense: Expense) => void;
};
