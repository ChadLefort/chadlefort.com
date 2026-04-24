import type { APIRoute } from 'astro';
import {
  contactBullets,
  educationSection,
  experienceSection,
  introLines,
  projectDetailLines,
  skillsSection,
  sortedProjects
} from '~/utils/markdown-sections';

export const GET: APIRoute = async () => {
  const projects = await sortedProjects();
  const out: string[] = [];

  out.push(...introLines());

  out.push('## Contact');
  out.push(...contactBullets());
  out.push('');

  out.push(...experienceSection());
  out.push(...skillsSection());

  out.push('## Projects');
  for (const project of projects) {
    out.push(...projectDetailLines(project));
  }

  out.push(...educationSection());

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
