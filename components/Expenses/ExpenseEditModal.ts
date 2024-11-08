import '#styles/components/expense/expense-edit-modal.css';
import addDynamicEventListener from '#utils/dynamicEventListener.ts';
import { validateForm, FormErrors } from '#utils/validateForm.ts';
import { GlobalStateType } from '#types/state/global.ts';

// локальный стейт формы нужен для корректного отображения ошибок
let formData = {
    title: '',
    sum: 0,
    category: '',
};

let elementId: string | null = null;

const initFormErrors: FormErrors = {
    title: null,
    sum: null,
};

let formErrors: FormErrors = initFormErrors;

export default function renderExpenseEditModal(globalState: GlobalStateType) {
    const container = document.querySelector<HTMLDivElement>('.modal-js');
    if (!container || container.classList.contains('d-none')) return;
    container.innerHTML = '';
    init(globalState);

    const expenseState = globalState.expenseState;

    const editingElement = expenseState.expenses.find((expense) => expense.id === expenseState.currentEditingExpenseId);
    if (!editingElement) return;

    // инициализация локального стейта формы при первой загрузке или при переключении элементов
    if (elementId !== expenseState.currentEditingExpenseId) {
        formData = {
            title: editingElement.title,
            sum: editingElement.sum,
            category: editingElement.category,
        };
        formErrors = initFormErrors;

        elementId = expenseState.currentEditingExpenseId;
    }

    const modal = `
        <form class="edit-expense-form" novalidate>
            <div class="error-message">${formErrors.title || ''}</div>
            <input name="title" type="text" value="${formData.title}">
            <div class="error-message">${formErrors.sum || ''}</div>
            <input name="sum" type="number" value="${formData.sum}">
            <input name="category" type="text" value="${formData.category}">

            <div class="buttons">
                <button class="submit-expense-form" type="submit">Сохранить</button>
                <button class="close-modal-js" type="button">Отмена</button>
            </div>
        </form>
    `;

    container.insertAdjacentHTML('beforeend', modal);
}

let isInitialized = false;

function init(globalState: GlobalStateType) {
    if (isInitialized) return;
    isInitialized = true;
    const container = document.querySelector<HTMLDivElement>('.modal-js');
    if (!container) return;

    const expenseState = globalState.expenseState;
    const modalState = globalState.modalState;

    const validationRules = {
        title: (value: string) => (value.trim() ? null : 'Название обязательно.'),
        sum: (value: number) => (value > 0 ? null : 'Сумма должна быть больше нуля.'),
    };

    function setFormErrors(errors: FormErrors) {
        formErrors = errors;
        renderExpenseEditModal(globalState);
    }

    addDynamicEventListener(container, 'submit', '.edit-expense-form', (event) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        formData = {
            title: form.querySelector<HTMLInputElement>('[name="title"]')?.value.trim() || '',
            sum: Number(form.querySelector<HTMLInputElement>('[name="sum"]')?.value) || 0,
            category: form.querySelector<HTMLInputElement>('[name="category"]')?.value.trim() || '',
        };

        const { isValid, errors } = validateForm(formData, validationRules);

        if (!isValid) {
            setFormErrors(errors);
            return;
        }

        expenseState.editExpense(formData);
        modalState.closeModal();
    });
}
