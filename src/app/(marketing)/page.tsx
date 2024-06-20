'use client'

import { motion } from 'framer-motion';
import { Highlight } from '@/components/ui/highlight';
import { BorderBeam } from '@/components/ui/border-beam';

export default function MarketingPage() {
  return (
    <div className='max-w-5xl space-y-4 px-2'>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className='text-3xl sm:text-5xl md:text-6xl font-bold'
      >
        Your notes & documents.<br />
        <Highlight className='text-black dark:text-white'>
          Unified.
        </Highlight>
        {' '}Welcome to <span className='underline'>Jotter</span>
      </motion.h1>
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className='space-y-4 pt-4 dark:hidden'
      >
        <BorderBeam image='/marketing.png' delay={0} />
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className='space-y-4 pt-4 dark:block hidden'
      >
        <BorderBeam image='/marketing-dark.png' delay={0} />
      </motion.div>
      <motion.h3
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className='text-base sm:text-lg md:text-xl text-pretty dark:text-pretty-dark font-light'
      >
        Jotter is a note-taking app that allows you to create, edit, and organize your notes and documents in one place.
      </motion.h3>
    </div>
  )
}