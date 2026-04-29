import type { APIRoute } from 'astro';
import dedent from 'dedent';
import { locationLong, site, yearsOfExperience } from '~/data/site';
import { contactBullets, educationSection, experienceSection, skillsSection } from '~/utils/markdown-sections';

export const GET: APIRoute = async () => {
  const out: string[] = [];

  out.push(
    ...dedent`
      # ${site.name}
      ${site.jobTitle} · ${locationLong}
    `.split('\n')
  );
  out.push(...contactBullets());
  out.push('');

  out.push(
    ...dedent`
      ## Summary
      Frontend engineer from ${site.location.stateLong} with ${yearsOfExperience()}+ years shipping maintainable, accessible, and fast web apps for teams of every size.
    `.split('\n')
  );
  out.push('');

  out.push(...experienceSection());
  out.push(...skillsSection());
  out.push(...educationSection());

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
  });
};
