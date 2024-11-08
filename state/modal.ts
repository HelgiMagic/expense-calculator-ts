import { ModalStateType } from '#types/modal.ts';
import { ExpenseStateType } from '#types/expense.ts';
import '#styles/components/UI/modal.css';
import renderExpenseEditModal from '#components/Expenses/ExpenseEditModal.ts';
import addDynamicEventListener from '#utils/DynamicEventListener.ts';

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
            renderExpenseEditModal(expenseState, modalState);
        }
    },
    closeModal: () => {
        modalState.openedModal = null;
        console.log('test');

        // добавление d-none к оверлей и modal-js
        modalContainer?.classList.add('d-none');
        overlay?.classList.add('d-none');
    },
};

// ивенты на закрытие любой модалки
function init() {
    if (!overlay || !modalContainer) return;

    overlay.addEventListener('click', () => modalState.closeModal());

    // универсальное закрытие по классу, чтоб не дублировать код закрытия в каждом компоненте модалки
    addDynamicEventListener(modalContainer, 'click', '.close-modal-js', () => modalState.closeModal());
}

init();

export default modalState;
