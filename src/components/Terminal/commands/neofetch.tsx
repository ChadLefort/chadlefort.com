import { locationShort, site, yearsOfExperience } from '~/data/site';
import type { Command } from './types';

const ART = ` ██████╗ ██╗
██╔════╝ ██║
██║      ██║
██║      ██║
╚██████╗ ███████╗
 ╚═════╝ ╚══════╝`;

const PaletteRow = () => (
  <div className="mt-3 flex gap-1">
    <span className="bg-term-tab-active inline-block h-4 w-8" />
    <span className="bg-term-add inline-block h-4 w-8" />
    <span className="bg-term-branch inline-block h-4 w-8" />
    <span className="bg-term-info inline-block h-4 w-8" />
    <span className="bg-term-del inline-block h-4 w-8" />
    <span className="bg-term-prompt inline-block h-4 w-8" />
    <span className="bg-term-fg inline-block h-4 w-8" />
    <span className="bg-term-comment inline-block h-4 w-8" />
  </div>
);

type InfoRow = { label?: string; value: string; rule?: boolean };

const HEADER = 'chad@chadlefort.com';

const formatInfoRows = (info: InfoRow[]) =>
  info
    .map((row) => {
      if (row.rule) return '-'.repeat(HEADER.length);
      if (row.label) return `${row.label}: ${row.value}`;

      return row.value;
    })
    .join('\n');

export const neofetch: Command = (_args, ctx) => {
  const years = yearsOfExperience();
  const info: InfoRow[] = [
    { value: HEADER },
    { rule: true, value: '' },
    { label: 'Title', value: site.jobTitle },
    { label: 'Location', value: locationShort },
    { label: 'Timezone', value: `${site.location.timezone} (${site.location.timezoneShort})` },
    { label: 'Uptime', value: `${years}+ years coding` },
    { label: 'GitHub', value: site.social.github.replace('https://', '') },
    { label: 'LinkedIn', value: site.social.linkedin.replace('https://www.', '') }
  ];

  ctx.append([
    {
      kind: 'node',
      node: (
        <div className="flex flex-col items-start gap-6 py-4 sm:flex-row sm:gap-12">
          <pre className="text-accent pt-6 font-mono text-3xl leading-none font-black whitespace-pre sm:pt-10 sm:text-4xl">
            {ART}
          </pre>
          <div>
            <pre className="text-term-fg font-mono whitespace-pre">{formatInfoRows(info)}</pre>
            <PaletteRow />
          </div>
        </div>
      )
    }
  ]);
};
