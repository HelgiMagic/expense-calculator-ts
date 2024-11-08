import '#styles/components/expense/expense-adding.css';
import addDynamicEventListener from '#utils/DynamicEventListener.ts';
import { ExpenseStateType } from '#types/expense.ts';
import { validateForm, FormErrors } from '#utils/validateForm.ts';

let expenseStateEvents: ExpenseStateType;

const initFormData = {
    title: '',
    sum: 0,
    category: '',
};

let formData = initFormData;

let formErrors: FormErrors = {
    title: null,
    sum: null,
};

function setFormErrors(errors: FormErrors) {
    formErrors = errors;
    renderAddExpenseForm(expenseStateEvents);
}

export default function renderAddExpenseForm(expenseState: ExpenseStateType) {
    if (!expenseStateEvents) {
        expenseStateEvents = expenseState;
    }

    const container = document.querySelector('.add-expense-form-js');
    if (!container) return;

    container.innerHTML = '';

    const sumValue = formData.sum === 0 ? '' : formData.sum;

    const form = `
        <form id="add-expense-form" class="adding-row" novalidate>
            <div class="input-wrapper">
                <input name="title" type="text" placeholder="Название расхода" value="${formData.title}" />
                <div class="error-message">${formErrors.title || ''}</div>
            </div>

            <div class="separator"></div>

            <div class="input-wrapper">
                <input name="sum" type="number" placeholder="Сумма расхода" value="${sumValue}" />
                <div class="error-message">${formErrors.sum || ''}</div>
            </div>

            <div class="separator"></div>

            <input name="category" type="text" placeholder="Категория" value="${formData.category}" />

            <button type="submit" title="Добавить расход">
                <svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 45.402 45.402" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-whiteidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"></path> </g> </g></svg>
            </button>
        </form>
    `;

    container.insertAdjacentHTML('beforeend', form);
}

function init() {
    const container = document.querySelector<HTMLDivElement>('.add-expense-form-js');
    if (!container) return;

    const validationRules = {
        title: (value: string) => (value.trim() ? null : 'Название обязательно.'),
        sum: (value: number) => (value > 0 ? null : 'Сумма должна быть больше нуля.'),
    };

    addDynamicEventListener(container, 'submit', '#add-expense-form', (event) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;

        formData = {
            title: form.querySelector<HTMLInputElement>('[name="title"]')?.value.trim() || '',
            sum: Number(form.querySelector<HTMLInputElement>('[name="sum"]')?.value) || 0,
            category: form.querySelector<HTMLInputElement>('[name="category"]')?.value.trim() || '',
        };

        const { isValid, errors } = validateForm(formData, validationRules);
        setFormErrors(errors);

        if (!isValid) {
            return;
        }

        expenseStateEvents.addExpense({
            id: crypto.randomUUID(),
            ...formData,
        });

        // reset
        formData = initFormData;
        renderAddExpenseForm(expenseStateEvents);
    });
}

init();
