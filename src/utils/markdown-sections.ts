import { getCollection } from 'astro:content';
import { jobs } from '~/data/jobs';
import { skills } from '~/data/skills';
import { site, yearsOfExperience } from '~/data/site';

export const sortedProjects = async () =>
  (await getCollection('projects')).sort(
    (a: { data: { order?: number } }, b: { data: { order?: number } }) => (a.data.order ?? 99) - (b.data.order ?? 99)
  );

export const introLines = (): string[] => [
  `# ${site.name}`,
  '',
  `> ${site.jobTitle} from Mandeville, Louisiana with ${yearsOfExperience()}+ years shipping accessible, maintainable, performant web apps.`,
  ''
];

export const contactBullets = (): string[] => [
  `- Email: ${site.email}`,
  `- Web: ${site.siteUrl}`,
  `- GitHub: ${site.social.github}`,
  `- LinkedIn: ${site.social.linkedin}`
];

export const experienceSection = (): string[] => {
  const out: string[] = ['## Experience'];

  for (const job of jobs) {
    out.push(`### ${job.company} — ${job.role}`);
    out.push(`_${job.start} – ${job.end}_`);
    out.push('');
    for (const bullet of job.bullets) {
      out.push(`- ${bullet}`);
    }
    out.push('');
  }

  return out;
};

export const skillsSection = (): string[] => ['## Skills', skills.map((s) => s.name).join(', ') + '.', ''];

type ProjectEntry = Awaited<ReturnType<typeof sortedProjects>>[number];

const projectLinks = (project: ProjectEntry): string[] => {
  const links: string[] = [];

  if (project.data.externalUrl) links.push(`Live: ${project.data.externalUrl}`);
  if (project.data.repoUrl) links.push(`Repo: ${project.data.repoUrl}`);
  links.push(`Page: ${site.siteUrl}/projects/${project.id}`);

  return links;
};

const projectTechLines = (project: ProjectEntry): string[] => {
  const tech = project.data.tech?.join(', ') ?? '';

  return tech ? [`**Tech:** ${tech}`, ''] : [];
};

const projectBodyLines = (project: ProjectEntry): string[] => {
  const body = project.body?.trim();

  return body ? [body, ''] : [];
};

export const projectDetailLines = (project: ProjectEntry): string[] => [
  `### ${project.data.title}`,
  `_${project.data.subtitle ?? ''}_`,
  '',
  project.data.summary,
  '',
  ...projectTechLines(project),
  projectLinks(project)
    .map((l) => `- ${l}`)
    .join('\n'),
  '',
  ...projectBodyLines(project)
];

export const educationSection = (): string[] => [
  '## Education',
  '### Nicholls State University — Bachelor of Science (B.S.)',
  '_August 2009 – December 2013_',
  '',
  '- Majored in Computer Information Systems',
  '- GPA: 3.6',
  "- President's List every semester since Fall 2010 (3.5+ GPA required)",
  '- Member of Beta Gamma Sigma (highest business-student honor at AACSB programs)',
  '- Member of Upsilon Pi Epsilon (first international honor society in computing)',
  ''
];
