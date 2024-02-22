import Image from 'next/image';

export default function Hero() {
  return (
    <div className='flex flex-col items-center justify-center max-w-5xl'>
      <div className='flex items-center'>
        <div className='relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]'>
          <Image
            src='/documents.png'
            alt='Documents'
            className='dark:hidden object-contain'
            fill
          />
          <Image
            src='/documents-dark.png'
            alt='Documents'
            className='hidden dark:block object-contain'
            fill
          />
        </div>
        <div className='relative h-[400px] w-[400px] hidden md:block'>
          <Image
            src='/reading.png'
            alt='Reading'
            className='dark:hidden object-contain'
            fill
          />
          <Image
            src='/reading-dark.png'
            alt='Reading'
            className='hidden dark:block object-contain'
            fill
          />
        </div>
      </div>
    </div>
  )
}