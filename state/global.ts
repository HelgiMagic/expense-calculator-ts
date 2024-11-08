import { createExpenseState, initExpenseState } from './expense';
import { createModalState, initModalState } from './modal';
import { GlobalStateType } from '#types/state/global.ts';

// @ts-ignore игнор, чтобы не ругался на пустой объект
const globalState: GlobalStateType = {};

globalState.expenseState = createExpenseState(globalState);
globalState.modalState = createModalState(globalState);

initExpenseState(globalState);
initModalState(globalState);

export default globalState;
