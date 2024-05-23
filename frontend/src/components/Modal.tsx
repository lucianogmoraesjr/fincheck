import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ReactNode } from 'react';

import { cn } from '../utils/cn';

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  rightAction?: ReactNode;
  onClose: () => void;
}

export function Modal({
  open,
  children,
  title,
  rightAction,
  onClose,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm',
            'data-[state=open]:animate-overlay-show',
          )}
        />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-[51] w-full max-w-[25rem] -translate-x-1/2 -translate-y-1/2 space-y-10 rounded-2xl bg-white p-6 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] outline-none',
            'data-[state=open]:animate-content-show',
          )}
        >
          <header className="relative flex items-center justify-between text-gray-800">
            <button type="button" aria-label="Fechar" onClick={onClose}>
              <Cross2Icon className="size-6" />
            </button>

            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
              {title}
            </span>

            <div className="flex items-center justify-center">
              {rightAction}
            </div>
          </header>

          <div className="text-gray-800">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
