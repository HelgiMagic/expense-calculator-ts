import { ExpenseStateType } from './expense';
import { ModalStateType } from './modal';

export type GlobalStateType = {
    expenseState: ExpenseStateType;
    modalState: ModalStateType;
};
