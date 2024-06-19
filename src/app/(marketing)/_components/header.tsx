import { Logo } from './logo';
import { UserOptions } from './user-options';

export function Header() {
  return (
    <header className='fixed left-0 top-0 h-auto w-full overflow-hidden border-b border-b-transparent/10'>
      <nav className='container mx-auto flex h-full w-full items-center justify-between px-5 py-3'>
        <Logo />
        <UserOptions />
      </nav>
    </header >
  )
}