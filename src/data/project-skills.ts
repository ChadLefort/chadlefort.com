import { type Skill, sharedSkills } from '~/data/skills';

const projectSkills: Skill[] = [
  ...sharedSkills,
  { name: 'Tailwind Variants', icon: 'devicon:tailwindcss' },
  { name: 'UnoCSS', icon: 'simple-icons:unocss', iconTone: 'unocss' },
  { name: 'Vitest', icon: 'devicon:vitest' },
  { name: 'Testing Library', icon: 'simple-icons:testinglibrary', iconTone: 'testingLibrary' },
  { name: 'MSW', icon: 'simple-icons:mockserviceworker', iconTone: 'msw' },
  { name: 'Storybook', icon: 'devicon:storybook' },
  { name: 'Bootstrap', icon: 'simple-icons:bootstrap', iconTone: 'bootstrap' },
  { name: 'Sass', icon: 'devicon:sass' },
  { name: 'GraphQL', icon: 'simple-icons:graphql', iconTone: 'graphql' },
  { name: 'TypeORM', icon: 'devicon:typeorm' },
  { name: 'Cypress', icon: 'devicon:cypressio' },
  { name: 'Laravel', icon: 'devicon:laravel' },
  { name: 'Docker', icon: 'devicon:docker' },
  { name: 'Webpack', icon: 'devicon:webpack' },
  { name: 'Nx', icon: 'simple-icons:nx', iconTone: 'nx' },
  { name: 'Lerna', icon: 'simple-icons:lerna', iconTone: 'lerna' },
  { name: 'Jenkins', icon: 'devicon:jenkins' },
  { name: 'NPM', icon: 'devicon:npm' },
  { name: 'Redux', icon: 'devicon:redux' },
  { name: 'Material UI', icon: 'devicon:materialui' },
  { name: 'MobX', icon: 'devicon:mobx' },
  { name: 'Zod', icon: 'simple-icons:zod', iconTone: 'zod' },
  { name: 'Chakra UI', icon: 'devicon:chakraui' },
  { name: 'PrimeReact', icon: 'simple-icons:primereact', iconTone: 'primereact' }
];

const skillAliases = new Map([
  ['React Aria Components', 'React Aria'],
  ['React Router', 'React']
]);
const skillByName = new Map(projectSkills.map((skill) => [skill.name, skill]));

export const getProjectSkills = (tech: string[]): Skill[] =>
  tech.map((name: string) => skillByName.get(skillAliases.get(name) ?? name) ?? { name, icon: 'lucide:code-2' });
