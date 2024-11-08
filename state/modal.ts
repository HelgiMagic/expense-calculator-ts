import { ModalStateType } from '#types/modal.ts';
import { ExpenseStateType } from '#types/expense.ts';
import '#styles/components/UI/modal.css';
import renderExpenseEditModal from '#components/Expenses/ExpenseEditModal.ts';

const modalContainer = document.querySelector<HTMLDivElement>('.modal-js');
const overlay = document.querySelector<HTMLDivElement>('.modal-overlay');

const modalState: ModalStateType = {
  openedModal: null,
  openModal: (modalName, data) => {
    modalState.openedModal = modalName;
    modalContainer?.classList.remove('d-none');
    overlay?.classList.remove('d-none');

    if (modalName === 'edit-expense-modal') {
      console.log('open modal');
      const expenseState: ExpenseStateType = data.expenseState;
      renderExpenseEditModal(expenseState, modalState, data.expenseId);
    }
  },
  closeModal: () => {
    modalState.openedModal = null;

    // добавление d-none к оверлей и modal-js
    modalContainer?.classList.add('d-none');
    overlay?.classList.add('d-none');
  },
};

// ивенты на закрытие любой модалки

export default modalState;
