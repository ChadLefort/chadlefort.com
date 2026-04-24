import type { APIRoute } from 'astro';
import { jobs } from '~/data/jobs';
import { site } from '~/data/site';
import { introLines, skillsSection, sortedProjects } from '~/utils/markdown-sections';

export const GET: APIRoute = async () => {
  const projects = await sortedProjects();
  const out: string[] = [];

  out.push(...introLines());
  out.push(
    'This is the canonical reading list for agents. Every HTML page has a companion markdown target listed below. For the full aggregated content, fetch llms-full.txt.'
  );
  out.push('');

  out.push('## About');
  out.push(`- [Home](${site.siteUrl}/): Portrait, summary, terminal, resume download.`);
  out.push(`- [Resume (Markdown)](${site.siteUrl}/resume.md): Clean plain-text resume.`);
  out.push(`- [Resume (PDF)](${site.siteUrl}/chad-lefort-resume.pdf): Printable PDF resume.`);
  out.push(`- [llms-full.txt](${site.siteUrl}/llms-full.txt): Full site content in one file.`);
  out.push('');

  out.push('## Experience');
  for (const job of jobs) {
    out.push(`- **${job.company}** — ${job.role} (${job.start} – ${job.end})`);
  }
  out.push('');

  out.push('## Projects');
  for (const project of projects) {
    out.push(`- [${project.data.title}](${site.siteUrl}/projects/${project.id}): ${project.data.summary}`);
  }
  out.push('');

  out.push(...skillsSection());

  out.push('## Contact');
  out.push(`- Email: ${site.email}`);
  out.push(`- [GitHub](${site.social.github})`);
  out.push(`- [LinkedIn](${site.social.linkedin})`);
  out.push('');

  out.push('## Optional');
  out.push(`- [Sitemap](${site.siteUrl}/sitemap-index.xml)`);
  out.push(`- [Projects index](${site.siteUrl}/projects)`);
  out.push('');

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
