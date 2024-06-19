import Link from 'next/link';
import { Logo } from './logo';

export function Footer() {
  return (
    <footer className='fixed bottom-0 left-0 h-auto w-full overflow-hidden border-t border-t-transparent/10'>
      <div className='container mx-auto flex h-full w-full items-center justify-between px-5 py-3'>
        <Logo />
        <p className='text-pretty text-center text-xs leading-loose text-muted-foreground md:text-sm'>
          Developed by{' '}
          <Link
            className='font-medium underline underline-offset-4'
            href='https://github.com/gonzalojparra'
            rel='noopener noreferrer'
            target='_blank'
          >
            Gonzalo Parra
          </Link>
          . Copyright © 2024.
        </p>
      </div>
    </footer>
  );
}