import { ModalStateType } from '#types/state/modal.ts';
import { GlobalStateType } from '#types/state/global.ts';
import '#styles/components/UI/modal.css';
import renderExpenseEditModal from '#components/Expenses/ExpenseEditModal.ts';
import addDynamicEventListener from '#utils/DynamicEventListener.ts';

const modalContainer = document.querySelector<HTMLDivElement>('.modal-js');
const overlay = document.querySelector<HTMLDivElement>('.modal-overlay');

function createModalState(globalState: GlobalStateType) {
    const modalState: ModalStateType = {
        openedModal: null,
        openModal: (modalName) => {
            modalState.openedModal = modalName;
            modalContainer?.classList.remove('d-none');
            overlay?.classList.remove('d-none');

            if (modalName === 'edit-expense-modal') {
                renderExpenseEditModal(globalState);
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

    return modalState;
}

function initModalState(globalState: GlobalStateType) {
    if (!overlay || !modalContainer) return;

    overlay.addEventListener('click', () => globalState.modalState.closeModal());

    // универсальное закрытие по классу, чтоб не дублировать код закрытия в каждом компоненте модалки
    addDynamicEventListener(modalContainer, 'click', '.close-modal-js', () => globalState.modalState.closeModal());
}

export { createModalState, initModalState };
