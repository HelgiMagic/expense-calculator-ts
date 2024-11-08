import '#styles/components/expense/expense-edit-modal.css';
import addDynamicEventListener from '#utils/DynamicEventListener.ts';
import { ExpenseStateType } from '#types/expense.ts';
import { ModalStateType } from '#types/modal.ts';
import { validateForm, FormErrors } from '#utils/validateForm.ts';

let expenseState: ExpenseStateType;
let modalState: ModalStateType;

// local state
// локальный стейт формы нужен для корректного отображения ошибок
let formData = {
    title: '',
    sum: 0,
    category: '',
};

let elementId: string | null = null;

let formErrors: FormErrors = {
    title: null,
    sum: null,
};

function setFormErrors(errors: FormErrors) {
    formErrors = errors;
    renderExpenseEditModal(expenseState, modalState);
}

export default function renderExpenseEditModal(expenseStateParam: ExpenseStateType, modalStateParam: ModalStateType) {
    // срабатывает 1 раз
    if (!expenseState) {
        expenseState = expenseStateParam;
        modalState = modalStateParam;
    }

    const editingElement = expenseState.expenses.find((expense) => expense.id === expenseState.currentEditingExpenseId);
    if (!editingElement) return;

    // инициализация локального стейта формы при первой загрузке или при переключении элементов
    if (elementId !== expenseState.currentEditingExpenseId) {
        formData = {
            title: editingElement.title,
            sum: editingElement.sum,
            category: editingElement.category,
        };

        elementId = expenseState.currentEditingExpenseId;
    }

    const container = document.querySelector<HTMLDivElement>('.modal-js');
    if (!container || container.classList.contains('d-none')) return;
    container.innerHTML = '';

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

function init() {
    const container = document.querySelector<HTMLDivElement>('.modal-js');
    if (!container) return;

    const validationRules = {
        title: (value: string) => (value.trim() ? null : 'Название обязательно.'),
        sum: (value: number) => (value > 0 ? null : 'Сумма должна быть больше нуля.'),
    };

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

init();
