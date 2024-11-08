export type ModalStateType = {
  openedModal: string | null;
  openModal: (modalName: string, data: any) => void;
  closeModal: () => void;
};
