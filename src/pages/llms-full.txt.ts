import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site, yearsOfExperience } from '~/data/site';
import { jobs } from '~/data/jobs';
import { skills } from '~/data/skills';

export const GET: APIRoute = async () => {
  const projects = (await getCollection('projects')).sort(
    (a: { data: { order?: number } }, b: { data: { order?: number } }) => (a.data.order ?? 99) - (b.data.order ?? 99)
  );

  const out: string[] = [];

  out.push(`# ${site.name}`);
  out.push('');
  out.push(
    `> ${site.jobTitle} from Mandeville, Louisiana with ${yearsOfExperience()}+ years shipping accessible, maintainable, performant web apps.`
  );
  out.push('');

  out.push('## Contact');
  out.push(`- Email: ${site.email}`);
  out.push(`- Web: ${site.siteUrl}`);
  out.push(`- GitHub: ${site.social.github}`);
  out.push(`- LinkedIn: ${site.social.linkedin}`);
  out.push('');

  out.push('## Experience');
  for (const job of jobs) {
    out.push(`### ${job.company} — ${job.role}`);
    out.push(`_${job.start} – ${job.end}_`);
    out.push('');
    for (const bullet of job.bullets) {
      out.push(`- ${bullet}`);
    }
    out.push('');
  }

  out.push('## Skills');
  out.push(skills.map((s) => s.name).join(', ') + '.');
  out.push('');

  out.push('## Projects');
  for (const project of projects) {
    const tech = project.data.tech?.join(', ') ?? '';
    const links: string[] = [];

    if (project.data.externalUrl) links.push(`Live: ${project.data.externalUrl}`);
    if (project.data.repoUrl) links.push(`Repo: ${project.data.repoUrl}`);
    links.push(`Page: ${site.siteUrl}/projects/${project.id}`);

    out.push(`### ${project.data.title}`);
    out.push(`_${project.data.subtitle ?? ''}_`);
    out.push('');
    out.push(project.data.summary);
    out.push('');

    if (tech) {
      out.push(`**Tech:** ${tech}`);
      out.push('');
    }

    out.push(links.map((l) => `- ${l}`).join('\n'));
    out.push('');

    if (project.body?.trim()) {
      out.push(project.body.trim());
      out.push('');
    }
  }

  out.push('## Education');
  out.push('### Nicholls State University — Bachelor of Science (B.S.)');
  out.push('_August 2009 – December 2013_');
  out.push('');
  out.push('- Majored in Computer Information Systems');
  out.push('- GPA: 3.6');
  out.push("- President's List every semester since Fall 2010 (3.5+ GPA required)");
  out.push('- Member of Beta Gamma Sigma (highest business-student honor at AACSB programs)');
  out.push('- Member of Upsilon Pi Epsilon (first international honor society in computing)');
  out.push('');

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
