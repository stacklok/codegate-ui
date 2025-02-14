import { Link } from 'react-router-dom'

import { DropdownMenu } from '../../../components/HoverPopover'
import { Separator, ButtonDarkMode } from '@stacklok/ui-kit'
import { HeaderActiveWorkspaceSelector } from '@/features/header/components/header-active-workspace-selector'
import { HELP_MENU_ITEMS } from '../constants/help-menu-items'
import { HeaderStatusMenu } from './header-status-menu'
import { SETTINGS_MENU_ITEMS } from '../constants/settings-menu-items'

function HomeLink() {
  return (
    <Link to="/">
      <h1 className="flex w-max font-title text-2xl font-semibold text-primary">
        CodeGate
      </h1>
    </Link>
  )
}

export function Header() {
  return (
    <header
      aria-label="App header"
      className="sticky top-0 z-10 flex h-16 w-screen shrink-0 items-center border-b
        border-b-gray-200 bg-gray-25 px-6"
    >
      <div className="flex flex-1 items-center gap-2">
        <nav className="ml-2 flex">
          <HomeLink />
        </nav>
        <Separator orientation="vertical" className="ml-4 h-8" />
        <HeaderActiveWorkspaceSelector />
      </div>
      <div className="mr-2 flex items-center gap-1">
        <HeaderStatusMenu />
        <DropdownMenu title="Settings" items={SETTINGS_MENU_ITEMS} />
        <DropdownMenu title="Help" items={HELP_MENU_ITEMS} />

        <ButtonDarkMode />
      </div>
    </header>
  )
}
