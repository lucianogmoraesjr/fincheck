import { Button } from './Button';
import { TrashIcon } from './icons/TrashIcon';
import { Modal } from './Modal';

interface ConfirmDeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  isLoading?: boolean;
}

export function ConfirmDeleteModal({
  onClose,
  onConfirm,
  title,
  description,
  isLoading,
}: ConfirmDeleteModalProps) {
  return (
    <Modal title="Excluir" open onClose={onClose}>
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex size-12 items-center justify-center rounded-full bg-red-50">
          <TrashIcon className="size-6 text-red-900" />
        </div>

        <strong className="max-w-48 text-center font-bold">{title}</strong>

        {description && (
          <p className="text-center tracking-[-0.5px]">{description}</p>
        )}
      </div>

      <div className="mt-10 space-y-4">
        <Button
          type="button"
          className="w-full bg-red-900 hover:bg-red-800"
          onClick={onConfirm}
          isLoading={isLoading}
        >
          Sim, desejo excluir
        </Button>

        <Button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="w-full border border-gray-800 bg-transparent text-gray-800 hover:border-none hover:bg-red-900 hover:text-white"
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
