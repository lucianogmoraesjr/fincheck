import { ExitIcon } from '@radix-ui/react-icons';

import { useAuth } from '../hooks/useAuth';

import { DropdownMenu } from './DropdownMenu';

export function UserMenu() {
  const { signOut, user } = useAuth();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50"
        >
          <span className="text-sm font-medium tracking-[-0.5px] text-teal-900">
            {user?.name.slice(0, 2).toUpperCase()}
          </span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="mr-4 mt-2 w-32">
        <DropdownMenu.Item
          className="flex items-center justify-between"
          onSelect={signOut}
        >
          <span>Sair</span>
          <ExitIcon className="size-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
