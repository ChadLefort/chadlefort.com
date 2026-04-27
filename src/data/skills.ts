type Skill = {
  name: string;
  icon: string;
  color?: string;
};

export const skills: Skill[] = [
  { name: 'TypeScript', icon: 'devicon:typescript' },
  { name: 'JavaScript', icon: 'devicon:javascript' },
  { name: 'React', icon: 'devicon:react' },
  { name: 'React Aria', icon: 'react-aria', color: '#7f57ff' },
  { name: 'Zustand', icon: 'devicon:zustand' },
  { name: 'TanStack Query', icon: 'simple-icons:reactquery', color: '#FF4154' },
  { name: 'TanStack Router', icon: 'simple-icons:tanstack', color: '#FF4154' },
  { name: 'Vue', icon: 'devicon:vuejs' },
  { name: 'Nuxt', icon: 'devicon:nuxtjs' },
  { name: 'Pinia', icon: 'simple-icons:pinia', color: '#FFD859' },
  { name: 'Tailwind', icon: 'devicon:tailwindcss' },
  { name: 'Vite', icon: 'devicon:vitejs' },
  { name: 'Vitest', icon: 'devicon:vitest' },
  { name: 'Testing Library', icon: 'simple-icons:testinglibrary', color: '#E33332' },
  { name: 'MSW', icon: 'simple-icons:mockserviceworker', color: '#FF6A33' },
  { name: 'Playwright', icon: 'devicon:playwright' },
  { name: 'Storybook', icon: 'devicon:storybook' },
  { name: 'Node.js', icon: 'devicon:nodejs' },
  { name: 'Nx', icon: 'simple-icons:nx', color: '#143055' },
  { name: 'GitHub Actions', icon: 'devicon:githubactions' },
  { name: 'Git', icon: 'devicon:git' },
  { name: 'Docker', icon: 'devicon:docker' },
  { name: 'Zod', icon: 'simple-icons:zod', color: '#3068B7' },
  { name: 'NestJS', icon: 'devicon:nestjs' }
];
