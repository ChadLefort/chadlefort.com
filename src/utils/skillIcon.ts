import { tv } from 'tailwind-variants';

export const skillIcon = tv({
  variants: {
    tone: {
      default: '',
      react: 'text-[#57C4DC] dark:text-[#61DAFB] print:!text-[#61DAFB]',
      reactAria: 'text-[#7f57ff]',
      tanstack: 'text-[#FF4154]',
      pinia: 'text-[#FFD859]',
      testingLibrary: 'text-[#E33332]',
      msw: 'text-[#FF6A33]',
      unocss: 'text-[#858585]',
      bootstrap: 'text-[#7952B3]',
      graphql: 'text-[#E10098]',
      nx: 'text-[#143055] dark:text-[#FFFFFF]',
      lerna: 'text-[#9333EA]',
      zod: 'text-[#3068B7]',
      primereact: 'text-[#06C4E8]'
    }
  },
  defaultVariants: {
    tone: 'default'
  }
});
