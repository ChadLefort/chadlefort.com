export type Job = {
  company: string;
  role: string;
  start: string;
  end: string;
  bullets: string[];
};

export const jobs: Job[] = [
  {
    company: 'Riverside Insights',
    role: 'Senior Frontend Engineer',
    start: 'April 2024',
    end: 'Present',
    bullets: [
      'Develop a K-12 student assessment platform focused on social and emotional learning using React, TypeScript, Zustand, and TanStack Query.',
      'Architected a custom component library on Tailwind and React Aria Components, replacing 3 disparate libraries with one accessible system that raised the a11y bar across the team.',
      'Unified 3 frontend apps by migrating from legacy routers (Router 5, older React Router) to TanStack Router, shipped incrementally with zero customer downtime.',
      'Moved every frontend client into an Nx monorepo and set up GitHub Actions pipelines for builds, tests, and deployments. Migrated state from MobX to Zustand to simplify stores and improve testability.',
      'Drove a 20% lift in teacher engagement by shipping major dashboard and assessment features for teachers and site leaders.',
      'Authored project documentation and converted it into reusable AI agent skills and hooks shared across the team for consistent, on-spec AI output.',
      'Maintained <1% customer-reported defects and 95%+ code quality metrics throughout 2025 while completing code reviews inside the 2-day SLA.'
    ]
  },
  {
    company: 'CDIT',
    role: 'Senior Frontend Engineer',
    start: 'December 2020',
    end: 'April 2024',
    bullets: [
      'Built and architected a new mobile first dashboard, membership cart, and a live instructor-guided online education SaaS platform for dentists and their practices using Vue 3, TypeScript, Nuxt, and GraphQL. Extensive testing was done with Vitest, Vue Testing Library, and Cypress with meaningful code coverage averaging around 80%.',
      'In less than 2 years, launched 3 major high-impact projects that set speed and quality standards for the development team and brought measurable success for a client.',
      'Revitalized a registration cart by enhancing user experience, reducing friction points, and introducing promotional code functionality which exceeded new membership signup goals by 25%.',
      'Helped build a new platform in React for a VOIP SaaS and migrated modules from NPM packages to Webpack Module Federation to allow for a better microfrontend architecture. This improvement helped with application updates, deployments, and reduced the number of pull requests needed from 5 to 1.'
    ]
  },
  {
    company: 'Veriforce',
    role: 'Senior Frontend Engineer',
    start: 'July 2017',
    end: 'December 2020',
    bullets: [
      'Architected several projects in React, Redux, TypeScript, and Material-UI and wrote unit tests with Jest and React Testing Library for a contractor management SaaS platform.',
      'Saved hours of manual deployment time by creating a monorepo with Lerna for 17 React projects and 6 NPM packages leading to cost efficiency and improved productivity for a team of 7 frontend developers.',
      'Oversaw and mentored a team of 5 frontend developers to complete 3 major revenue-growing projects ahead of schedule by having pair programming sessions and code reviews regularly.',
      'Advocated for UI and code consistency by creating design patterns and managing dependency upgrades, enhancing app stability and user experience.',
      'Collaborated with backend engineers on API design so REST endpoints were scalable to support multiple microservices and frontend applications.',
      'Migrated existing React projects to TypeScript which laid out the structure and configuration for future React projects.'
    ]
  },
  {
    company: 'Netchex',
    role: 'Full Stack Software Developer',
    start: 'November 2014',
    end: 'July 2017',
    bullets: [
      'Developed applications using domain driven design with C# for REST APIs and created single page applications using AngularJS, TypeScript, and Bootstrap for a payroll, benefits, and human resources SaaS platform.',
      "In 3 months led a project to build a mobile first onboarding dashboard released and presented at the company's annual client facing conference.",
      'Developed a custom reporting single page application using AngularJS for 6,000+ clients, enhancing their accounting and business insights.'
    ]
  }
];
