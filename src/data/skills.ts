import type { VariantProps } from 'tailwind-variants';
import type { skillIcon } from '~/utils/skillIcon';

type SkillIconTone = NonNullable<VariantProps<typeof skillIcon>['tone']>;

export type Skill = {
  name: string;
  icon: string;
  iconTone?: SkillIconTone;
};

export const sharedSkills: Skill[] = [
  { name: 'TypeScript', icon: 'devicon:typescript' },
  { name: 'React', icon: 'simple-icons:react', iconTone: 'react' },
  { name: 'React Aria', icon: 'react-aria', iconTone: 'reactAria' },
  { name: 'Zustand', icon: 'devicon:zustand' },
  { name: 'TanStack Query', icon: 'simple-icons:reactquery', iconTone: 'tanstack' },
  { name: 'TanStack Router', icon: 'simple-icons:tanstack', iconTone: 'tanstack' },
  { name: 'Vue', icon: 'devicon:vuejs' },
  { name: 'Nuxt', icon: 'devicon:nuxtjs' },
  { name: 'Pinia', icon: 'simple-icons:pinia', iconTone: 'pinia' }
];

export const skills: Skill[] = [
  sharedSkills[0],
  { name: 'JavaScript', icon: 'devicon:javascript' },
  ...sharedSkills.slice(1),
  { name: 'Tailwind', icon: 'devicon:tailwindcss' },
  { name: 'Vite', icon: 'devicon:vitejs' },
  { name: 'Vitest', icon: 'devicon:vitest' },
  { name: 'Testing Library', icon: 'simple-icons:testinglibrary', iconTone: 'testingLibrary' },
  { name: 'MSW', icon: 'simple-icons:mockserviceworker', iconTone: 'msw' },
  { name: 'Playwright', icon: 'devicon:playwright' },
  { name: 'Storybook', icon: 'devicon:storybook' },
  { name: 'Node.js', icon: 'devicon:nodejs' },
  { name: 'Nx', icon: 'simple-icons:nx', iconTone: 'nx' },
  { name: 'GitHub Actions', icon: 'devicon:githubactions' },
  { name: 'Git', icon: 'devicon:git' },
  { name: 'Docker', icon: 'devicon:docker' },
  { name: 'Zod', icon: 'simple-icons:zod', iconTone: 'zod' },
  { name: 'NestJS', icon: 'devicon:nestjs' }
];
