import { Footer } from './_components/footer';
import { Header } from './_components/header';

export default function MarketingLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='min-h-screen bg-background antialiased'>
      <Header />
      <main className='flex flex-col text-center min-h-screen items-center justify-center'>
        {children}
      </main>
      <Footer />
    </div>
  );
}