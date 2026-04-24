import type { APIRoute } from 'astro';
import { site, yearsOfExperience } from '~/data/site';
import { jobs } from '~/data/jobs';
import { skills } from '~/data/skills';

export const GET: APIRoute = async () => {
  const out: string[] = [];

  out.push(`# ${site.name}`);
  out.push(`${site.jobTitle} · Mandeville, Louisiana`);
  out.push('');
  out.push(`- Email: ${site.email}`);
  out.push(`- Web: ${site.siteUrl}`);
  out.push(`- GitHub: ${site.social.github}`);
  out.push(`- LinkedIn: ${site.social.linkedin}`);
  out.push('');

  out.push('## Summary');
  out.push(
    `Frontend engineer from Louisiana with ${yearsOfExperience()}+ years shipping maintainable, accessible, and fast web apps for teams of every size.`
  );
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
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
  });
};
