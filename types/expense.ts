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
  currentEditingExpenseId: string | null;
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  editExpense: (newData: Partial<Expense>) => void;
  openEditModal: (id: string) => void;
  changeFilterCategory: (category: string) => void;
  calculateFilterCategories: () => void;
};
