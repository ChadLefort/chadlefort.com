import type { APIRoute } from 'astro';
import { site, yearsOfExperience } from '~/data/site';
import { contactBullets, educationSection, experienceSection, skillsSection } from '~/utils/markdown-sections';

export const GET: APIRoute = async () => {
  const out: string[] = [];

  out.push(`# ${site.name}`);
  out.push(`${site.jobTitle} · Mandeville, Louisiana`);
  out.push('');
  out.push(...contactBullets());
  out.push('');

  out.push('## Summary');
  out.push(
    `Frontend engineer from Louisiana with ${yearsOfExperience()}+ years shipping maintainable, accessible, and fast web apps for teams of every size.`
  );
  out.push('');

  out.push(...experienceSection());
  out.push(...skillsSection());
  out.push(...educationSection());

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
  });
};
