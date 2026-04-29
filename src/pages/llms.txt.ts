import type { APIRoute } from 'astro';
import dedent from 'dedent';
import { jobs } from '~/data/jobs';
import { site } from '~/data/site';
import { introLines, skillsSection, sortedProjects } from '~/utils/markdown-sections';

export const GET: APIRoute = async () => {
  const projects = await sortedProjects();
  const out: string[] = [];

  out.push(...introLines());
  out.push(
    ...dedent`
      This is the canonical reading list for agents. Every HTML page has a companion markdown target listed below. For the full aggregated content, fetch llms-full.txt.

      ## About
      - [Home](${site.siteUrl}/): Portrait, summary, terminal, resume download.
      - [Resume (Markdown)](${site.siteUrl}/resume.md): Clean plain-text resume.
      - [Resume (PDF)](${site.siteUrl}/chad-lefort-resume.pdf): Printable PDF resume.
      - [llms-full.txt](${site.siteUrl}/llms-full.txt): Full site content in one file.
    `.split('\n')
  );
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

  out.push(
    ...dedent`
      ## Contact
      - Email: ${site.email}
      - [GitHub](${site.social.github})
      - [LinkedIn](${site.social.linkedin})

      ## Optional
      - [Sitemap](${site.siteUrl}/sitemap-index.xml)
      - [Projects index](${site.siteUrl}/projects)
    `.split('\n')
  );
  out.push('');

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
