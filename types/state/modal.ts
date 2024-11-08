export type ModalStateType = {
    openedModal: string | null;
    openModal: (modalName: string) => void;
    closeModal: () => void;
};
