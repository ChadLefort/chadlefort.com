import { type Skill, sharedSkills } from '~/data/skills';

const projectSkills: Skill[] = [
  ...sharedSkills,
  { name: 'Tailwind Variants', icon: 'devicon:tailwindcss' },
  { name: 'UnoCSS', icon: 'simple-icons:unocss', color: '#858585' },
  { name: 'Vitest', icon: 'devicon:vitest' },
  { name: 'Testing Library', icon: 'simple-icons:testinglibrary', color: '#E33332' },
  { name: 'MSW', icon: 'simple-icons:mockserviceworker', color: '#FF6A33' },
  { name: 'Storybook', icon: 'devicon:storybook' },
  { name: 'Bootstrap', icon: 'simple-icons:bootstrap', color: '#7952B3' },
  { name: 'Sass', icon: 'devicon:sass' },
  { name: 'GraphQL', icon: 'simple-icons:graphql', color: '#E10098' },
  { name: 'TypeORM', icon: 'devicon:typeorm' },
  { name: 'Cypress', icon: 'devicon:cypressio' },
  { name: 'Laravel', icon: 'devicon:laravel' },
  { name: 'Docker', icon: 'devicon:docker' },
  { name: 'Webpack', icon: 'devicon:webpack' },
  { name: 'Nx', icon: 'simple-icons:nx', color: '#143055' },
  { name: 'Lerna', icon: 'simple-icons:lerna', color: '#9333EA' },
  { name: 'Jenkins', icon: 'devicon:jenkins' },
  { name: 'NPM', icon: 'devicon:npm' },
  { name: 'Redux', icon: 'devicon:redux' },
  { name: 'Material UI', icon: 'devicon:materialui' },
  { name: 'MobX', icon: 'devicon:mobx' },
  { name: 'Zod', icon: 'simple-icons:zod', color: '#3068B7' },
  { name: 'Chakra UI', icon: 'devicon:chakraui' },
  { name: 'PrimeReact', icon: 'simple-icons:primereact', color: '#06C4E8' }
];

const skillAliases = new Map([
  ['React Aria Components', 'React Aria'],
  ['React Router', 'React']
]);
const skillByName = new Map(projectSkills.map((skill) => [skill.name, skill]));

export const getProjectSkills = (tech: string[]): Skill[] =>
  tech.map((name: string) => skillByName.get(skillAliases.get(name) ?? name) ?? { name, icon: 'lucide:code-2' });
