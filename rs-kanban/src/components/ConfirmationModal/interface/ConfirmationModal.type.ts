export interface ConfirmationModalProps {
  open: boolean;
  setOpenModal: (value: boolean) => void;
  deleteFn: () => void;
  thingToBeRemoved: string;
}
