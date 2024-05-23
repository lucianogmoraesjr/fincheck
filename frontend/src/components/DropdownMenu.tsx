import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { ReactNode } from 'react';

import { cn } from '../utils/cn';

function DropdownMenuRoot({ children }: { children: ReactNode }) {
  return <RadixDropdownMenu.Root>{children}</RadixDropdownMenu.Root>;
}

function DropdownMenuTrigger({ children }: { children: ReactNode }) {
  return (
    <RadixDropdownMenu.Trigger className="outline-none" asChild>
      {children}
    </RadixDropdownMenu.Trigger>
  );
}

interface DropdownMenuContentProps {
  children: ReactNode;
  className?: string;
}

function DropdownMenuContent({
  children,
  className,
}: DropdownMenuContentProps) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        className={cn(
          'z-[99] space-y-2 rounded-2xl bg-white p-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]',
          'data-[side=bottom]:animate-slide-up-and-fade',
          'data-[side=top]:animate-slide-down-and-fade',
          className,
        )}
      >
        {children}
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Portal>
  );
}

interface DropdownMenuItemProps {
  children: ReactNode;
  className?: string;
  onSelect?: () => void;
}

function DropdownMenuItem({
  children,
  className,
  onSelect,
}: DropdownMenuItemProps) {
  return (
    <RadixDropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        'flex min-h-10 cursor-pointer items-center rounded-2xl px-4 py-2 text-sm text-gray-800 outline-none transition-colors data-[highlighted]:bg-gray-50',
        className,
      )}
    >
      {children}
    </RadixDropdownMenu.Item>
  );
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
};
