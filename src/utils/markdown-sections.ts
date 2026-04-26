import { getCollection } from 'astro:content';
import { education } from '~/data/education';
import { jobs } from '~/data/jobs';
import { skills } from '~/data/skills';
import { locationLong, site, yearsOfExperience } from '~/data/site';

export const sortedProjects = async () =>
  (await getCollection('projects')).sort(
    (a: { data: { order?: number } }, b: { data: { order?: number } }) => (a.data.order ?? 99) - (b.data.order ?? 99)
  );

export const introLines = (): string[] => [
  `# ${site.name}`,
  '',
  `> ${site.jobTitle} from ${locationLong} with ${yearsOfExperience()}+ years shipping accessible, maintainable, performant web apps.`,
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
  `### ${education.institution} — ${education.degree}`,
  `_${education.start} – ${education.end}_`,
  '',
  `- Majored in ${education.major}`,
  `- GPA: ${education.gpa}`,
  ...education.awards.map((a) => `- ${a}`),
  ...education.organizations.map((o) => `- ${o}`),
  ''
];
